Page({
  data:{
    showNav: false,
    showHome: false,
    showBrand: true,
    userInfo: true,
  },

  openlocation: function () {
    wx.openLocation({
      longitude: Number('116.714479'),
      latitude: Number('23.402643'),
      name: "潮峰茶行",
      address: '浮动村东兴一巷三号'
    })
  },
  openregister: function () {
    wx.navigateTo({
       url: '../../pages/test/register',
    })
  },
  bopenregister: function () {
    wx.navigateTo({
       url: '../../pages/register/register',
    })
  },
  openUpGoods: function(){
    wx.navigateTo({
       url: '../../pages/upload/upload',
    })
  },
    /**
   * 前往授权页面
   */
  _goLogin: function(e) {
    wx.navigateTo({
        url: '../ulogin/login',
    })
  },
})