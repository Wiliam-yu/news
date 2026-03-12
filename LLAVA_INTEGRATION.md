# 🌋 LLaVA 集成配置

## ✅ 已完成

1. **Ollama 连接** - ✅ 已配置
   - Windows IP: 192.168.31.74
   - 端口: 11434
   - 模型: llava:latest

2. **识别脚本** - ✅ 已创建
   - 位置: `~/.openclaw/workspace/scripts/llava_recognize.py`

---

## ⚠️ 响应慢的问题

首次识别较慢 (~30秒)，因为：
1. 图片需要编码传输
2. LLaVA 在 Windows 运行 (网络延迟)
3. RTX 4060 计算也需要时间

---

## 📝 使用方法

### 命令行
```bash
python3 ~/.openclaw/workspace/scripts/llava_recognize.py <图片路径> [提示词]
```

### 示例
```bash
# 识别图片
python3 ~/.openclaw/workspace/scripts/llava_recognize.py /path/to/image.jpg

# 指定提示词
python3 ~/.openclaw/workspace/scripts/llava_recognize.py /path/to/image.jpg "提取所有英文文字"
```

---

## 🔧 优化

如果慢，可以：
1. 用更小的图片
2. 减少 prompt 长度
3. 保持 Ollama 持续运行

---

## 📌 注意

- 保持 Windows Ollama 运行
- IP 地址: 192.168.31.74
- 端口: 11434
