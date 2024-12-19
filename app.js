import updateManager from './common/updateManager';
// 初始化实例
import Request from './utils/Request';

const apiClient = new Request('https://example.com/api', {
  'Content-Type': 'application/json',
});

App({
  globalData: {
    apiClient, // 挂载到全局
  },
  onLaunch: function () {},
  onShow: function () {
    updateManager();
  },
});
