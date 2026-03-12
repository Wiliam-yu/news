# OpenClaw 安全红线/黄线规则
# 基于慢雾安全实践指南

## 🔴 红线 (Red Line) - 必须确认

以下命令/操作必须暂停并要求人类确认：

### 1. 破坏性操作
- `rm -rf /` - 根目录删除
- `rm -rf ~` - 主目录删除
- `dd if=/dev/zero of=/dev/sda` - 磁盘清空
- `mkfs` - 格式化
- `> /dev/sda` - 直接写入设备

### 2. 权限篡改
- `chmod -R 777` - 全局读写
- `chown -R` -  ownership 修改系统关键文件
- 修改 `/etc/passwd`, `/etc/shadow`
- `chattr +i` 对关键配置文件

### 3. 网络外发 (敏感数据)
- 发送包含 TOKEN、KEY、密码的请求到未知地址
- `curl/wget` 携带 `$(cat ~/.ssh/id_rsa)` 类参数
- Base64 解码后执行恶意命令

### 4. 权限持久化
- 添加 cron 任务 (crontab -e)
- 修改 systemd 服务
- 添加 SSH 密钥到 authorized_keys
- 创建后门用户

### 5. 供应链投毒
- `npm install -g` 全局安装未知包
- `pip install` 未知来源
- 从非官方源安装

---

## 🟡 黄线 (Yellow Line) - 警告日志

以下操作可以执行但需要记录日志：

### 1. 系统信息收集
- `uname -a`
- `whoami`
- `env`
- `ss -tun`

### 2. 文件读取 (非敏感)
- `cat /etc/hostname`
- `ls /tmp`

### 3. 网络测试
- `ping -c 1`
- `curl https://example.com`

---

## ⚙️ 执行策略

### Exec 白名单 (安全)
```
/usr/bin/ls
/usr/bin/cat
/usr/bin/find
/usr/bin/git
/usr/bin/node
/usr/bin/npm
/usr/bin/python3
/usr/bin/curl
```

### Exec 黑名单 (需确认)
```
.*rm\s+-rf.*
.*dd\s+.*
mkfs\.
chown\s+-R\s+root
chattr\s+\+i
crontab\s+-e
```

---

## 📋 验证与攻防测试

按照 Validation-Guide-zh.md 定期测试:

1. **认知层测试**: 提示词注入、角色扮演越狱
2. **主机层测试**: 破坏性指令、权限越权
3. **业务层测试**: 敏感数据外发、私钥泄露
4. **审计层测试**: 巡检脚本防篡改

---

更新于: 2026-03-12
