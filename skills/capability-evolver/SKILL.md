# SKILL.md - Capability Evolver

## What
让 Agent 具备自我进化能力，能够根据任务经验自动改进和扩展技能。

## Why
实现真正的自主学习，让 Agent 越用越强。

## How - 进化机制

### 1. 任务复盘 (Task Review)
每次完成重要任务后:
- 分析完成方式
- 识别可优化点
- 提取可复用模式

### 2. 技能进化 (Skill Evolution)
当遇到重复任务模式时:
- 自动生成更高效的子任务流程
- 创建新的工具组合
- 优化提示词模板

### 3. 知识沉淀 (Knowledge Deposition)
- 将关键决策记录到记忆
- 建立任务类型 → 解决方案映射
- 维护最佳实践库

### 4. 自我评估 (Self-Assessment)
定期检查:
- 成功率 / 失败率
- 执行效率
- 技能覆盖范围

---

## Tools

### memory_search - 搜索历史经验
```bash
# 搜索类似任务的经验
memory_search query="之前如何完成X任务"
```

### memory_timeline - 查看任务上下文
```bash
# 查看某个任务的完整上下文
memory_timeline chunkId="xxx"
```

### write - 记录经验
```bash
# 写入新的经验到技能文档
write path="skills/xxx/SKILL.md" content="..."
```

---

## 进化流程

```
1. 接收任务
     ↓
2. 搜索类似经验 (memory_search)
     ↓
3. 规划执行
     ↓
4. 执行任务
     ↓
5. 复盘总结
     ↓
6. 更新记忆/技能 (如果学到了新东西)
     ↓
7. 报告结果
```

---

## 使用示例

### 任务复盘
```
完成这个任务后，我学到了:
- 新的工具组合方式
- 更高效的工作流程
- 需要避免的坑

更新到记忆中...
```

### 技能更新
```
检测到这是第3次执行类似任务。
自动分析模式:
- 任务类型: 信息搜集
- 最佳工具: web_fetch + memory_search
- 优化建议: 可合并为单一工作流

是否创建新的子技能?
```

---

## 注意事项

- 进化需要时间，不要每次都复盘
- 保留人类确认关键决策
- 记录失败经验同样重要

---

## 关联

- 依赖: MemOS (记忆系统)
- 关联技能: skill-creator, multi-agent-commander
