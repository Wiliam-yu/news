#!/bin/bash
# OpenClaw Restore Script
# 从 D 盘恢复

BACKUP_DIR="/mnt/d/openclaw-backup"
SOURCE_DIR="$HOME/.openclaw"

echo "🔄 OpenClaw Restore"
echo "📁 Source: $BACKUP_DIR/latest/"
echo "📁 Target: $SOURCE_DIR"

if [ ! -d "$BACKUP_DIR/latest" ]; then
    echo "❌ Backup not found at $BACKUP_DIR/latest"
    exit 1
fi

# 列出可用备份
echo "📋 Available backups:"
ls -1 "$BACKUP_DIR"/backup_* 2>/dev/null | head -5

# 恢复
echo "⚠️  This will overwrite current data. Continue? (y/n)"
read -r confirm
if [ "$confirm" != "y" ]; then
    echo "❌ Cancelled"
    exit 1
fi

# 备份当前配置（以防万一）
cp "$SOURCE_DIR/openclaw.json" "$SOURCE_DIR/openclaw.json.pre-restore" 2>/dev/null

# 恢复
rsync -av --exclude='logs' --exclude='.npm-global' \
    "$BACKUP_DIR/latest/" "$SOURCE_DIR/"

echo "✅ Restore complete!"
echo "🔁 Please restart gateway: openclaw gateway restart"
