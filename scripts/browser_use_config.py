#!/usr/bin/env python3
"""
Browser Use 配置 - 使用本地 Ollama (LLaVA)
"""

import os

# 配置环境变量
os.environ["OLLAMA_BASE_URL"] = "http://192.168.31.74:11434"

# 测试连接
from langchain_community.chat_models import ChatOllama

try:
    llm = ChatOllama(
        model="llava",
        base_url="http://192.168.31.74:11434"
    )
    print("✅ LLaVA 连接成功!")
    
    # 测试生成
    response = llm.invoke("Hello")
    print(f"响应: {response}")
    
except Exception as e:
    print(f"❌ 连接失败: {e}")
    print("\n请确保:")
    print("1. Windows 上 Ollama 正在运行: ollama serve")
    print("2. 模型已下载: ollama pull llava")
