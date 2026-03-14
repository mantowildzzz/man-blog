# Claude Code 权限配置

## 允许的工具权限

允许以下操作自动执行，无需每次确认：

### 文件操作
- Read, Write, Edit, Glob, Grep - 所有文件操作

### 开发操作
- Bash: npm install, npm run dev, npm run build, git add, git commit
- 所有代码编写和修改

### 限制
- 不允许：git push, git reset --hard, rm -rf 等破坏性操作
- 需要确认的操作会先询问

## 自动执行任务

我可以使用以下技能自动执行实现计划：
- superpowers:subagent-driven-development
- superpowers:executing-plans
