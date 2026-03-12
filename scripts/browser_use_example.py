#!/usr/bin/env python3
"""
Browser Use 示例 - 使用本地 LLaVA
"""

import asyncio
from browser_use import Agent
from langchain_community.chat_models import ChatOllama

async def main():
    # 配置 LLaMA (本地 Ollama)
    llm = ChatOllama(
        model="llava",
        base_url="http://192.168.31.74:11434"
    )
    
    # 创建 Agent
    agent = Agent(
        llm=llm,
        task="打开百度搜索 'OpenClaw'"
    )
    
    # 运行
    await agent.run()
    
    print("✅ 任务完成!")

if __name__ == "__main__":
    asyncio.run(main())
