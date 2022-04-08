module.exports = {
  header: "# 更新历史 | changelog \n\n",
  types: [
    { type: "feat", section: "✨ Features | 新功能" },
    { type: "fix", section: "🐛 Bug Fixes | Bug 修复" },
    {
      type: "perf",
      section: "⚡ Performance Improvements | 性能优化",
      hidden: true,
    },
    {
      type: "revert",
      section: "⏪ Reverts | 回退",
      hidden: true,
    },
    {
      type: "chore",
      section: "📦 Chores | 其他更新",
      hidden: true,
    },
    {
      type: "docs",
      section: "📝 Documentation | 文档",
      hidden: true,
    },
    {
      type: "style",
      section: "💄 Styles | 风格",
      hidden: true,
    },
    {
      type: "refactor",
      section: "♻ Code Refactoring | 代码重构",
    },
    {
      type: "test",
      section: "✅ Tests | 测试",
      hidden: true,
    },
    {
      type: "build",
      section: "👷‍ Build System | 构建",
      hidden: true,
    },
    {
      type: "ci",
      section: "🔧 Continuous Integration | CI 配置",
      hidden: true,
    },
  ],
  skip: {
    // "bump": true, //缓存变化，并重置git状态至最近的tag节点
    commit: true, //提交变动
    tag: true //在git中增加tag标识
  },
};
