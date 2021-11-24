// pages/login/login.js
var app=getApp();
// var request = require("../../utils/util.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   //this.onShow();
   
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    app.globalData.loginr1=app.globalData.loginr1+1;
    var that = this;
    var s1="";
        s1=s1+'&nickName='+app.globalData.userInfo.nickName;
        s1=s1+'&avatarUrl='+app.globalData.userInfo.avatarUrl;
    if(app.globalData.login>0){
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
                app.set_address(res.data.address);
                if(app.globalData.login>0)
                app.show_page('/pages/index/index');
            }
          },
           fail: function (res) {
            },
        });
      }
  },


  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  register:function(){
     app.show_page('/pages/register/register');
  },

  loginSubmit: function (e) {
    // var formId=e.detail.formId;
    var formData = e.detail.value;
 //    console.log(app.globalData);
     formData.nickName=app.globalData.userInfo.nickName;//: "山中石"
     formData.avatarUrl=app.globalData.userInfo.avatarUrl;
   
    var s1="&userName="+formData.userName+"&password="+formData.password; 
    s1=s1+'&nickName='+app.globalData.userInfo.nickName;
    s1=s1+'&avatarUrl='+app.globalData.userInfo.avatarUrl;
     console.log(app.globalData.url + 'Login'+s1);
    wx.request({
      url: app.globalData.url + 'Login'+s1,
      method: 'POST',
      data: { formData: formData }, //,formId:formId,openId:app.globalData.openId
      header: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        var responseData = res.data.userId;
        var showp=app.globalData.showp;
        app.globalData.showp=0;
        if (responseData > 0) {
           app.globalData.userId =  res.data.userId;
           app.globalData.login =  1;
           app.set_address(res.data.address);
           app.show_msg('登录成功！！');
           s1= '/pages/index/index';
           if(showp==3) s1='/pages/shopcart/shopcart';
           app.show_page(s1);
        }
        else {
           app.show_msg('账号或密码错误！！');
        }
      }
    })
  },
})