Component({
  data: {
    selected: 0,
    color: "#7A7E83",
    selectedColor: "#3cc51f",
    list: [{
      "pagePath": "pages/index/index",
      "iconPath": "/assets/images/icon_component.png",
      "selectedIconPath": "/assets/images/icon_component_HL.png",
      "text": "首页"
    }, {
      "pagePath": "pages/logs/logs",
      "iconPath": "/assets/images/icon_API.png",
      "selectedIconPath": "/assets/images/icon_API_HL.png",
      "text": "个人中心"
    }]
  },
  attached() {
  },
  methods: {
    switchTab(e) {
      const data = e.currentTarget.dataset
      const url = data.path
      console.log(e)
      wx.switchTab({ url })
      this.setData({
        selected: data.index
      })
    }
  }
})