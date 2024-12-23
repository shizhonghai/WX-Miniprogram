//index.js
//获取应用实例
const app = getApp();
Page({
  data: {

  },
  onLoad: function () {

  },
  onShow(options) {

  },
  handleError(e) {
    console.log('e.detaile.detaile.detail', e.detail);
    if (e.detail) {
      const { msg } = e.detail;
      // do something
    }
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () { },
  error(e) {
    console.log('live-player', e);
    console.error('live-player error:', e.detail.errMsg)
    if (e.detail.errCode == 10001) {
      wx.showToast({
        title: '视频直播对讲需要你手机授权微信录音或麦克风权限',
        icon: 'none',
        duration: 3000
      });
    }
  },
});