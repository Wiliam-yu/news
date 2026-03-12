# SKILL.md - Browser Use

## What
browser-use - 让 AI 控制浏览器自动化

## Why
解决无法直接控制浏览器的问题，实现网页自动化操作

## Setup

### 已安装
```bash
pip install browser-use
playwright install chromium
```

### API Key
需要一个 LLM API Key (OpenAI/Anthropic) 来驱动浏览器:
- 设置环境变量: `OPENAI_API_KEY` 或 `ANTHROPIC_API_KEY`

## Usage

### Python 示例
```python
from browser_use import Agent
from langchain_openai import ChatOpenAI

llm = ChatOpenAI(model="gpt-4")
agent = Agent(llm=llm, browser=browser)

# 执行任务
await agent.run("帮我搜索 OpenClaw 的最新版本")
```

### 命令行
```bash
# 使用 uvx 直接运行
uvx browser-use "搜索天气"
```

---

## 能力

| 能力 | 说明 |
|------|------|
| 网页浏览 | 自动打开、滚动、点击 |
| 表单填写 | 自动填写输入框 |
| 数据提取 | 提取网页内容 |
| 截图 | 页面截图 |
| 多标签 | 管理多个标签页 |

---

## 边界

- 需要 API Key (OpenAI/Anthropic)
- 需要 Chromium 浏览器
- 复杂交互可能失败
- 反爬网站有限制
- 速度比直接 API 慢

---

## 成本

- Playwright: 免费
- Chromium: 免费
- LLM API: 按调用付费

---

## 集成

如需在 OpenClaw 中使用，需要:
1. 配置 API Key
2. 通过 Python 子进程调用
3. 或者等待官方浏览器控制插件支持

---

## Notes

- 当前环境: ✅ 已安装
- Chromium: ✅ 已安装
- API Key: ⚠️ 需要配置
