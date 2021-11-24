// pages/addresslist/addresslist.js
var app=getApp();
Page({
  data: {
    addressList: [],
  },

  //添加收货地址
  addAdress: function () {
   app.show_page('../../pages/address/address');
  },
  //选择收货地址
  selectOtherAddress: function (e) {
    var selectIndex = e.currentTarget.dataset.index;
    getApp().globalData.otherAddressInfo = this.data.addressList[selectIndex];
    wx.navigateBack({
      delta: 1, // 回退前 delta(默认为1) 页面
    })
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数

  },
  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {
    // 页面显示
    var that = this;
 //console.log('30 addresslist');
    var s1=1;
    this.setData({
      addressList: wx.getStorageSync('address'),
    });
    if(app.globalData.userId=='undefined') {s1=0;}
    else if(app.globalData.userId==0){
      s1=0;
     }
    if(s1==0){
        s1='&nickName='+app.globalData.userInfo.nickName;
        s1=s1+'&avatarUrl='+app.globalData.userInfo.avatarUrl;
        wx.request({
          url: app.globalData.url + 'CheckUser'+s1,
          method: 'POST',
          data: { formData: 0 }, //,formId:formId,openId:app.globalData.openId
          header: {
            'Content-Type': 'application/json'
          },
          success: function (res) {
            var responseData = res.data.code;
            if (responseData) { //意见备案，
                app.globalData.userId =  res.data.userId;
            }
          },
           fail: function (res) {
            },
        });
    }
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  }
})