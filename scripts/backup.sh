#!/bin/bash
# OpenClaw Tiered Backup System
# 支持：每小时/每天/每周/每月 不同级别的备份

BACKUP_ROOT="/mnt/d/openclaw-backup"
SOURCE_DIR="$HOME/.openclaw"
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
LOG_FILE="$HOME/.openclaw/logs/backup.log"

# 日志函数
log() {
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] $1" | tee -a "$LOG_FILE"
}

# 备份级别配置
# hourly: 每小时，只备份核心配置 (最小)
# daily:  每天，核心+记忆+工作区
# weekly: 每周，全量备份
# monthly: 每月，归档备份

backup_core() {
    # 核心配置 (~1MB)
    rsync -av --exclude='logs' --exclude='.npm-global' --exclude='node_modules' \
        --exclude='extensions' --exclude='canvas' --exclude='*.bak' \
        "$SOURCE_DIR/openclaw.json" "$BACKUP_ROOT/hourly/" 2>/dev/null
    rsync -av --exclude='logs' --exclude='.npm-global' \
        "$SOURCE_DIR/agents/" "$BACKUP_ROOT/hourly/" 2>/dev/null
    rsync -av --exclude='logs' --exclude='.npm-global' \
        "$SOURCE_DIR/credentials/" "$BACKUP_ROOT/hourly/" 2>/dev/null
    rsync -av --exclude='logs' --exclude='.npm-global' \
        "$SOURCE_DIR/identity/" "$BACKUP_ROOT/hourly/" 2>/dev/null
    rsync -av --exclude='logs' --exclude='.npm-global' \
        "$SOURCE_DIR/devices/" "$BACKUP_ROOT/hourly/" 2>/dev/null
    log "✅ Hourly backup (core): $(du -sh $BACKUP_ROOT/hourly/ 2>/dev/null | cut -f1)"
}

backup_daily() {
    # 核心 + 记忆 + 工作区 (~10MB)
    rsync -av --exclude='logs' --exclude='.npm-global' \
        --exclude='extensions' --exclude='canvas' \
        "$SOURCE_DIR/" "$BACKUP_ROOT/daily/" 2>/dev/null
    log "✅ Daily backup: $(du -sh $BACKUP_ROOT/daily/ 2>/dev/null | cut -f1)"
}

backup_weekly() {
    # 全量备份 (~10MB，插件可重新安装)
    rsync -av --exclude='logs' --exclude='.npm-global' \
        --exclude='extensions' --exclude='canvas' --exclude='*.bak' \
        "$SOURCE_DIR/" "$BACKUP_ROOT/weekly/backup_$TIMESTAMP/" 2>/dev/null
    
    # 保留最近 4 个周备份
    cd "$BACKUP_ROOT/weekly" && ls -dt backup_* | tail -n +5 | xargs -r rm -rf
    
    log "✅ Weekly backup: $(du -sh $BACKUP_ROOT/weekly/backup_$TIMESTAMP/ 2>/dev/null | cut -f1)"
}

backup_monthly() {
    # 归档备份 (~10MB，插件可重新安装)
    rsync -av --exclude='logs' --exclude='.npm-global' \
        --exclude='extensions' --exclude='canvas' --exclude='*.bak' \
        "$SOURCE_DIR/" "$BACKUP_ROOT/monthly/backup_$(date +%Y-%m)/" 2>/dev/null
    
    # 保留最近 12 个月备份
    cd "$BACKUP_ROOT/monthly" && ls -d backup_* | head -n -12 | xargs -r rm -rf 2>/dev/null
    
    log "✅ Monthly backup: $(du -sh $BACKUP_ROOT/monthly/backup_$(date +%Y-%m)/ 2>/dev/null | cut -f1)"
}

# GitHub 云端备份
backup_github() {
    log "☁️ Syncing to GitHub..."
    
    WORKSPACE="$SOURCE_DIR/workspace"
    cd "$WORKSPACE"
    
    # 添加所有更改
    git add -A
    
    # 检查是否有更改
    if git diff --staged --quiet; then
        log "ℹ️ No changes to commit"
    else
        git commit -m "Backup: $TIMESTAMP"
        git push origin master
        log "✅ GitHub backup pushed"
    fi
}

# 主逻辑
mkdir -p "$BACKUP_ROOT"/{hourly,daily,weekly,monthly}

HOUR=$(date +%H)
DAY=$(date +%u)  # 1-7 (Monday-Sunday)
MONTH=$(date +%d)  # 01-31

case "$1" in
    hourly)
        backup_core
        ;;
    daily)
        backup_daily
        ;;
    weekly)
        backup_weekly
        ;;
    monthly)
        backup_monthly
        ;;
    github)
        backup_github
        ;;
    full)
        backup_core
        backup_daily
        backup_weekly
        backup_monthly
        backup_github
        ;;
    *)
        # 自动判断执行哪个级别的备份
        log "🔄 Starting tiered backup..."
        
        # 每小时 - 始终执行
        backup_core
        
        # 每天 03:00
        if [ "$HOUR" = "03" ]; then
            backup_daily
        fi
        
        # 每周日 03:00
        if [ "$HOUR" = "03" ] && [ "$DAY" = "7" ]; then
            backup_weekly
        fi
        
        # 每月 1 号 03:00
        if [ "$HOUR" = "03" ] && [ "$MONTH" = "01" ]; then
            backup_monthly
        fi
        
        # GitHub 同步（每天）
        if [ "$HOUR" = "04" ]; then
            backup_github
        fi
        
        log "🎉 Tiered backup complete!"
        ;;
esac
