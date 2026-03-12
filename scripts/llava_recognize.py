#!/usr/bin/env python3
# LLaVA 图片识别脚本
# 调用 Windows 本地 Ollama (LLaVA) 进行图片识别

import requests
import base64
import json
import sys
import os

OLLAMA_URL = "http://192.168.31.74:11434"
MODEL = "llava"

def recognize_image(image_path, prompt=None):
    """识别图片中的文字和内容"""
    
    if not os.path.exists(image_path):
        return {"error": f"File not found: {image_path}"}
    
    # 读取图片并转为 base64
    with open(image_path, "rb") as f:
        img_data = base64.b64encode(f.read()).decode()
    
    # 默认提示词
    if prompt is None:
        prompt = """请详细描述这张图片中的所有内容，包括：
1. 所有文字（英文和中文）
2. 图表或表格的结构
3. 排版格式
4. 任何重要的视觉元素"""
    
    # 调用 Ollama API
    try:
        response = requests.post(
            f"{OLLAMA_URL}/api/generate",
            json={
                "model": MODEL,
                "prompt": prompt,
                "images": [img_data],
                "stream": False
            },
            timeout=120
        )
        
        if response.status_code == 200:
            result = response.json()
            return {
                "success": True,
                "response": result.get("response", ""),
                "done": result.get("done", True)
            }
        else:
            return {
                "error": f"API Error: {response.status_code}",
                "details": response.text
            }
    
    except requests.exceptions.Timeout:
        return {"error": "Timeout - 模型响应过长"}
    except Exception as e:
        return {"error": str(e)}

def main():
    if len(sys.argv) < 2:
        print("Usage: python3 llava_recognize.py <image_path> [prompt]")
        sys.exit(1)
    
    image_path = sys.argv[1]
    prompt = sys.argv[2] if len(sys.argv) > 2 else None
    
    result = recognize_image(image_path, prompt)
    
    if "error" in result:
        print(f"Error: {result['error']}")
        if "details" in result:
            print(result["details"])
        sys.exit(1)
    else:
        print(result["response"])

if __name__ == "__main__":
    main()
