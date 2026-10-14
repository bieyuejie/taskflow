import { defineStore } from 'pinia';
import { getTaskList, createTask, updateTask, deleteTask } from '../api/task';

export const useTaskStore = defineStore('task', {
  state: () => ({
    taskList: [],
    total: 0,
    loading: false,
    query: { keyword: '', status: '', page: 1, pageSize: 10 },
  }),
  actions: {
    async fetchTasks() {
      this.loading = true;
      try {
        const res = await getTaskList(this.query);
        this.taskList = res.list;
        this.total = res.total;
      } finally {
        this.loading = false;
      }
    },
    async addTask(data) {
      await createTask(data);
      await this.fetchTasks();
    },
    async editTask(id, data) {
      await updateTask(id, data);
      await this.fetchTasks();
    },
    async removeTask(id) {
      await deleteTask(id);
      await this.fetchTasks();
    },
    setKeyword(keyword) {
      this.query.keyword = keyword;
      this.query.page = 1;
      this.fetchTasks();
    },
    setStatus(status) {
      this.query.status = status;
      this.query.page = 1;
      this.fetchTasks();
    },
    setPage(page) {
      this.query.page = page;
      this.fetchTasks();
    },
    async fetchAllForKanban() {
      this.loading = true;
      try {
        const res = await getTaskList({ page: 1, pageSize: 1000 });
        this.taskList = res.list;
        this.total = res.total;
      } finally {
        this.loading = false;
      }
    },
    async updateStatus(id, status) {
      await updateTask(id, { status });
    },
  },
});
