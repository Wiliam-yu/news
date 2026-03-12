#!/bin/bash
# OpenClaw 夜间安全巡检脚本
# 基于慢雾安全实践指南

LOG_FILE="$HOME/.openclaw/logs/nightly-audit.log"
ALERT_FILE="$HOME/.openclaw/logs/alerts.json"

log() {
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] $1" | tee -a "$LOG_FILE"
}

alert() {
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] 🚨 ALERT: $1" | tee -a "$LOG_FILE"
}

log "========== 开始夜间安全巡检 =========="

# 1. 检查凭证目录权限
log "1. 检查凭证目录权限..."
CRED_PERMS=$(stat -c %a ~/.openclaw/credentials 2>/dev/null)
if [ "$CRED_PERMS" != "700" ]; then
    alert "凭证目录权限异常: $CRED_PERMS (期望: 700)"
else
    log "✅ 凭证目录权限正常"
fi

# 2. 检查 Gateway 状态
log "2. 检查 Gateway 状态..."
if pgrep -f "openclaw.*gateway" > /dev/null; then
    log "✅ Gateway 运行中"
else
    alert "Gateway 未运行!"
fi

# 3. 检查插件安全
log "3. 检查插件状态..."
PLUGIN_COUNT=$(openclaw plugins list 2>/dev/null | grep -c "loaded" || echo 0)
log "已加载插件: $PLUGIN_COUNT"

# 4. 检查最近登录
log "4. 检查最近消息..."
LAST_MSG_TIME=$(ls -t ~/.openclaw/memory/*.sqlite 2>/dev/null | head -1 | xargs stat -c %Y 2>/dev/null)
if [ -n "$LAST_MSG_TIME" ]; then
    HOURS_AGO=$(( ($(date +%s) - $LAST_MSG_TIME) / 3600 ))
    log "最后消息: ${HOURS_AGO}小时前"
fi

# 5. 检查备份状态
log "5. 检查备份..."
if [ -d "/mnt/d/openclaw-backup" ]; then
    LATEST_BACKUP=$(ls -td /mnt/d/openclaw-backup/daily/* 2>/dev/null | head -1)
    if [ -n "$LATEST_BACKUP" ]; then
        DAYS_OLD=$(( ($(date +%s) - $(stat -c %Y "$LATEST_BACKUP")) / 86400 ))
        log "最近备份: ${DAYS_OLD}天前 (daily)"
    fi
fi

# 6. 检查 GitHub 同步
log "6. 检查 GitHub 同步..."
cd ~/.openclaw/workspace
LAST_PUSH=$(git log -1 --format=%ci 2>/dev/null)
if [ -n "$LAST_PUSH" ]; then
    log "最后推送: $LAST_PUSH"
fi

# 7. 检查异常进程
log "7. 检查异常进程..."
SUSPICIOUS=$(ps aux 2>/dev/null | grep -E "nc|netcat|python.*socket|bash.*-i.*&" | grep -v grep | wc -l)
if [ "$SUSPICIOUS" -gt 0 ]; then
    alert "发现可疑进程: $SUSPICIOUS 个"
else
    log "✅ 无可疑进程"
fi

# 8. 检查网络连接
log "8. 检查网络连接..."
NET_CONNECTIONS=$(ss -tun 2>/dev/null | grep ESTAB | wc -l)
log "活跃连接数: $NET_CONNECTIONS"

# 9. 检查 cron 任务
log "9. 检查 cron 任务..."
CRON_COUNT=$(crontab -l 2>/dev/null | grep -v "^#" | grep -v "^$" | wc -l)
log "Cron 任务数: $CRON_COUNT"

# 10. 检查日志异常
log "10. 检查日志..."
ERROR_COUNT=$(grep -i "error\|failed\|denied" ~/.openclaw/logs/*.log 2>/dev/null | tail -20 | wc -l)
if [ "$ERROR_COUNT" -gt 10 ]; then
    alert "日志错误过多: $ERROR_COUNT"
fi

# 11. 检查磁盘空间
log "11. 检查磁盘空间..."
DISK_USAGE=$(df -h ~/.openclaw | tail -1 | awk '{print $5}' | sed 's/%//')
if [ "$DISK_USAGE" -gt 90 ]; then
    alert "磁盘空间不足: ${DISK_USAGE}%"
fi

# 12. 检查内存使用
log "12. 检查内存使用..."
MEM_USAGE=$(free | grep Mem | awk '{printf "%.0f", $3/$2 * 100}')
log "内存使用: ${MEM_USAGE}%"

# 13. Git 备份 (如果配置了)
log "13. 执行 Git 备份..."
cd ~/.openclaw/workspace
git add -A > /dev/null 2>&1
if ! git diff --staged --quiet 2>/dev/null; then
    git commit -m "Nightly backup: $(date +%Y-%m-%d)" > /dev/null 2>&1
    git push origin master > /dev/null 2>&1
    log "✅ GitHub 备份完成"
fi

log "========== 巡检完成 =========="
