import MockAdapter from 'axios-mock-adapter';
import request from '../api/request';

const mock = new MockAdapter(request);

mock.onPost('/api/login').reply(200, {
  code: 200,
  data: {
    token: 'fake-xxx',
    username: 'admin',
  },
  msg: 'ok',
});
