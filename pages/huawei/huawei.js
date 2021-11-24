// pages/huawei/huawei.js
Page({
  data: {
    title: "",
    shopList: [
      {
        shopID:"1",
        imgUrl: "../../img/huawei_zhuanqu_1.jpg",
        shopName: "【年货节|买赠99元大礼包】Huawei/华为 畅享6全网通4G智能手机",
        price: "￥1299",
        sales: "3401人付款"
      },
      {
         shopID:"2",
        imgUrl: "../../img/huawei_zhuanqu_2.jpg",
        shopName: "【年货节】Huawei/华为 M3 平板电脑 8.4英寸哈曼卡顿联合设计",
        price: "￥2288",
        sales: "5386人付款"
      },

    ],
  },

itemClick: function(e){
    wx.navigateTo({
      url: '../../pages/shopinfo/shopinfo?id=' +e.currentTarget.dataset.id,
    })
},

  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    this.setData({
      title: options.itemType
    });
    wx.setNavigationBarTitle({ title: this.data.title })

  },
  onReady: function () {
    // 页面渲染完成
    
  },
  onShow: function () {
    // 页面显示
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  }
})