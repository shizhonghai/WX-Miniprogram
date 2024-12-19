class Request {
  constructor(baseURL, defaultHeaders = {}) {
    this.baseURL = baseURL; // 设置基础 URL
    this.defaultHeaders = defaultHeaders; // 默认请求头
    this.timeout = 10000; // 全局超时时间（毫秒）
  }

  // 请求拦截器（可扩展）
  requestInterceptor(options) {
    console.log('请求拦截器触发：', options);
    // 示例：给请求添加 token
    const token = wx.getStorageSync('token') || '';
    options.header = {
      ...this.defaultHeaders,
      Authorization: token,
      ...options.header,
    };
    return options;
  }

  // 响应拦截器（可扩展）
  responseInterceptor(response) {
    console.log('响应拦截器触发：', response);
    if (response.statusCode === 200 && response.data.code === 0) {
      return response.data.data; // 成功返回数据
    } else {
      wx.showToast({
        title: response.data.message || '请求失败',
        icon: 'none',
      });
      throw new Error(response.data.message || '请求失败');
    }
  }

  // 基础请求方法
  request(options) {
    return new Promise((resolve, reject) => {
      const interceptedOptions = this.requestInterceptor({
        ...options,
        url: `${this.baseURL}${options.url}`,
        timeout: this.timeout, // 设置超时时间
      });

      wx.request({
        ...interceptedOptions,
        success: (response) => {
          try {
            const result = this.responseInterceptor(response);
            resolve(result);
          } catch (error) {
            reject(error);
          }
        },
        fail: (error) => {
          wx.showToast({
            title: '网络错误，请检查网络连接',
            icon: 'none',
          });
          reject(error);
        },
      });
    });
  }

  // 在 Request 类中已经定义了 GET 请求方法：
  get(url, params = {}, headers = {}) {
    // 将 params 对象序列化为查询字符串
    const queryString = Object.keys(params)
      .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
      .join('&');
    const fullUrl = queryString ? `${url}?${queryString}` : url;

    return this.request({
      url: fullUrl,
      method: 'GET',
      header: headers,
    });
  }

  // POST 请求
  post(url, data = {}, headers = {}) {
    return this.request({
      url,
      method: 'POST',
      data,
      header: headers,
    });
  }
}

export default Request;
