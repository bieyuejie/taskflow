# TaskFlow 轻量任务管理看板

基于 Vue 3 的任务管理 SPA，包含 Mock 登录、任务 CRUD、看板拖拽和数据统计，用于练习前端开发基础与展示项目经验。

## 启动与检查

```sh
npm ci
npm run dev
npx eslint . --ext .vue,.js --max-warnings 0
npx prettier --check src index.html
npm run build
npm run preview
```

`npm run lint` 会自动修复文件。执行只读检查时使用上面的 ESLint 命令。

## 功能

- 登录：非空账号和密码可进入演示环境，Token 使用 `taskflow_token` 保存；登录后默认进入 `/task-list`。
- 任务列表：新增、编辑、删除、标题搜索（300ms 防抖）、状态筛选与分页。
- 看板：待办、进行中、已完成三列，跨列拖拽后调用接口同步状态，失败后恢复数据。
- 统计：任务状态饼图与优先级柱状图，全量分页读取任务，并随容器尺寸变化调整图表。
- 导航与退出：页面间切换，退出清理登录态和任务状态。
- 响应式：768px 以下看板和统计单列，表格横向滚动，弹窗适应屏幕宽度。

注册尚未实现。任务 Mock 数据存于内存，刷新页面会重置；所有演示账号共享任务数据。
Mock Token 为固定演示值，不是生产身份验证服务。

## 技术版本

| 依赖 | 当前版本 |
| --- | --- |
| Vue / Vite | 3.4.38 / 5.4.11 |
| Vue Router / Pinia | 4.4.3 / 2.1.7 |
| Element Plus | 2.7.8 默认主题 |
| Axios / axios-mock-adapter | 1.7.9 / 1.22.0 |
| vuedraggable / ECharts | 4.1.0（Vue 3）/ 5.5.1 |
| ESLint / Prettier | 8.57.1 / 3.9.8（已安装版本）|

以 `package-lock.json` 为准安装，不自动升级业务依赖。

## 目录

```text
src/
  assets/       全局样式
  components/   TaskDialog、TaskCard
  views/        Login、TaskList、Kanban、Stats
  router/       页面路由与登录守卫
  stores/       user、task 状态与 actions/getters
  api/          Axios 封装和接口
  mock/         演示接口及字段校验
  utils/        防抖、图表接入
  App.vue
  main.js
```

所有接口前缀为 `/api`，返回 `{ code, data, msg }`，业务码为 `200`、`400`、`401`。
组件使用 `<script setup>`，通过 actions 修改 Pinia 状态，图表派生数据放在 getters 中。

## 验收与后续工作

本轮 ESLint、格式检查、生产构建和数据层验证结果见同目录 `PROGRESS_REVIEW.md`。
浏览器需检查登录拦截、CRUD 表单、跨列拖拽、统计图显示、空数据、退出，以及 375px/768px/桌面宽度。

尚需补齐注册、完成浏览器验收、确认 ESLint/Prettier 最新稳定版要求并评估配置迁移、优化构建包体积。
第六阶段还需完成规范 Git 提交和 Vercel 部署；仓库目前配置在 Gitee，尚未验证 GitHub 或线上作品链接。
部署静态 SPA 时需为 `/login`、`/task-list`、`/kanban`、`/stats` 配置入口回退到 `index.html`。
没有完成线上验收前，不应在简历中声称已经部署。
