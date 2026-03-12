# SKILL.md - Multi-Agent Commander

## What
指挥8个各有特长的智能体系统，作为指挥官(Harry)的副官(William)协调各个专业智能体完成任务。

## Why
实现分工协作，每个智能体专注特定领域，提高效率和质量。

## Architecture

```
Harry (指挥官)
    ↓ 指令
William (副官/调度中心)
    ↓ 分发任务
8个专业智能体 → 执行 → 汇总结果 → 报告
```

## Available Tools

### 1. 任务分发 (Task Distribution)

**sessions_spawn** - 创建子agent独立session
```
用法: spawn subagent with task="研究X公司"
- mode: "run" (一次性) 或 "session" (持续对话)
- runtime: "subagent" 或 "acp"
- cwd: 工作目录
```

**sessions_send** - 发送消息到其他session
```
用法: send message to another agent session
- sessionKey: 目标session
- message: 任务描述
```

### 2. 任务管理 (Task Management)

**cron** - 定时任务
```
- 定时触发智能体执行任务
- 周期性报告生成
```

**subagents** - 管理子agent
```
- list: 查看运行的子agent
- kill: 终止子agent
- steer: 引导子agent方向
```

### 3. 信息收集 (Information)

**memory_search** - 搜索记忆
```
- 查询历史任务/经验
```

**exec** - 执行命令
```
- 在目标环境执行任务
```

### 4. 安全控制 (Security)

**Guardian** - 使用 openclaw-shield
```
- 安全扫描
- 风险评估
```

**approvals** - 命令审批
```
- 高风险操作需确认
```

---

## 8智能体角色配置

| ID | 角色 | 核心Tools | Spawn方式 |
|----|------|-----------|-----------|
| 1 | Researcher | web_fetch, brave-search | sessions_spawn |
| 2 | Coder | exec, write, read | sessions_spawn |
| 3 | Analyst | memory_search, read | sessions_spawn |
| 4 | Planner | (纯思考) | 内置 |
| 5 | Guardian | openclaw-shield, security audit | sessions_spawn |
| 6 | Archiver | memory_store, write | sessions_spawn |
| 7 | Operator | exec, cron, system | sessions_spawn |
| 8 | Communicator | message, compose | sessions_spawn |

---

## 使用流程

### 1. 接收指令
```
Harry: "研究最新的AI Agent框架"
```

### 2. 分析拆解
```
William分析:
- 需要Researcher搜集信息
- 需要Coder验证代码
- 需要Communicator整理报告
```

### 3. 分发任务
```
spawn Researcher: "搜索2024年AI Agent框架最新发展"
spawn Coder: "验证这些框架的安装方法"
```

### 4. 汇总结果
```
收集所有子agent结果
整合成完整报告
呈现给Harry
```

---

## 安全策略

1. **任务隔离**: 每个子agent独立session
2. **工具限制**: 按角色分配tool policy
3. **敏感确认**: 高风险操作需Harry确认
4. **记忆分层**: 敏感信息仅William可见

---

## 示例命令

```bash
# 创建研究员子agent
spawn --agent researcher --task "搜索AI Agent框架"

# 发送任务到现有agent
send --sessionKey researcher_001 --message "补充搜索Claude Agent"

# 列出所有子agent
subagents list

# 终止子agent
subagents kill --target researcher_001
```

---

## Notes

- 使用subagent的timeoutSeconds管理任务超时
- 子agent异常时使用fallback策略
- 定期汇总进度给Harry
