# 🖥️ Windows 本地 OCR/视觉模型部署指南

**目标**: 在你电脑 (RTX 4060) 上运行视觉模型，实现图片识别

---

## 🎯 推荐方案

### 方案 A: Ollama (推荐)

**1. 安装 Ollama (Windows)**
```
下载: https://ollama.com/download/windows
安装并运行
```

**2. 下载视觉模型**
```powershell
# 推荐模型 (按准确率排序):
ollama pull llava        # 通用视觉 (~7GB)
ollama pull llama3.2-vision  #Llama 视觉 (~30GB)
ollama pull qwen2-vl     # 阿里视觉 (~8GB)
```

**3. 测试**
```powershell
ollama run llava
# 上传图片，让模型描述
```

---

### 方案 B: LM Studio

**1. 下载**
```
https://lmstudio.ai/
```

**2. 搜索模型**
- llava-1.6
- qwen2-vl
- llama3.2-vision

**3. GUI 操作，更简单**

---

## 📸 使用流程

### 方式 1: 命令行
```bash
# 启动 llava
ollama run llava

# 发送图片
[粘贴图片路径或描述]
```

### 方式 2: API
```bash
# 启动 API 服务
ollama serve

# 调用
curl http://localhost:11434/api/generate -d '{
  "model": "llava",
  "prompt": "描述这张图片",
  "images": ["base64编码的图片"]
}'
```

---

## 🎯 推荐配置

| 模型 | 大小 | 显存需求 | 推荐度 |
|------|------|----------|--------|
| **llava:7b** | 7GB | ~8GB | ⭐⭐⭐⭐⭐ |
| **qwen2-vl:7b** | 8GB | ~10GB | ⭐⭐⭐⭐ |
| **llama3.2-vision:11b** | 13GB | ~16GB | ⭐⭐⭐⭐⭐ |

---

## 🔧 集成到 OpenClaw

安装后，我可以配置通过 API 调用你电脑的模型：

```bash
# 在你电脑上运行
ollama serve

# 我通过 API 调用
curl http://localhost:11434/api/generate ...
```

---

## 📝 下一步

1. **安装 Ollama**: https://ollama.com/download/windows
2. **运行命令**: `ollama pull llava`
3. **告诉我**，我来配置连接

**要我给你更详细的步骤吗？**
