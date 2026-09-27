import axios from 'axios';
import { ElMessage } from 'element-plus';

const request = axios.create({
  baseURL: '/api',
  timeout: 10000,
});

request.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('taskflow_token');
    if (token) {
      config.headers.Authorization = token;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

request.interceptors.response.use(
  (response) => {
    const res = response.data;

    if (res.code === 401) {
      localStorage.removeItem('taskflow_token');
      window.location.href = '/login';
      return Promise.reject(new Error(res.msg || '未授权，请重新登录'));
    }

    if (res.code !== 200) {
      ElMessage.error(res.msg || '请求失败');
      return Promise.reject(new Error(res.msg || 'Error'));
    }

    return res.data;
  },
  (error) => {
    ElMessage.error(error.message || '网络异常，请稍后重试');
    return Promise.reject(error);
  }
);

export default request;
