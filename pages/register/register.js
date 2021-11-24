// pages/register/register.js
var app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    placeholder0:'',
    placeholder1: '',
    placeholder2: '',
    placeholder3: '',
    placeholder4: '',
    placeholder5: '',
    placeholder6: '',
    GetCount:true,
    smsFlag:true,
    snsMsgWait: 60,
        
    counts:60
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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

    Clicktap:function(){
      var that = this;
      if(tel == ''){
    //判断是否填写手机号码
    }else{
    //倒计时主要部分，利用定时器
              that.setData({
                GetCount:false
              })
              var SetCount = setInterval(function(){
                var times = that.data.counts-1;
                that.setData({
                  counts:times
                });
                if (that.data.counts < 1){
                  clearInterval(SetCount);
                  that.setData({
                    GetCount: true,
                    counts:60
                  })
                }
              },1000);

    }

    },
    /**
   * 用户点击右上角分享
   */
  open_checkcode: function () {
      //app.show_msg('检查CODE');
      this.sendCode();

  },

  registerSubmit: function (e) {
    var that=this;
    // var formId=e.detail.formId;
    var formData = e.detail.value;

    if (formData.userName == '' || formData.password == '' || formData.password2 == '' || formData.name == '' || formData.school == '') {
      if (formData.userName == '' )
        that.setData({ placeholder0: 'color:red;'});
      if (formData.password == '')
        that.setData({ placeholder1: 'color:red;' });
      if (formData.password2 == '')
        that.setData({ placeholder2: 'color:red;' });
      if (formData.name == '')
        that.setData({ placeholder3: 'color:red;' });
      if (formData.school == '')
        that.setData({ placeholder4: 'color:red;' });
      if (formData.grade == '')
        that.setData({ placeholder5: 'color:red;' });
      if (formData.class == '')
        that.setData({ placeholder6: 'color:red;' });
        return;
    }
    if (formData.password!=formData.password2){
        app.show_msg('两次密码不一致');
        return;
    }
      wx.request({
        url: app.globalData.url + 'register',
        method: 'POST',
        data: { formData: formData }, //,formId:formId,openId:app.globalData.openId
        header: {
          'Content-Type': 'application/json'
        },
        success: function (res) {
          console.log(res);
          var responseData = res.data.status;
          console.log(responseData);
          if (responseData) {
            wx.navigateBack({
              userName: formData.userName,
            })
            app.show_msg('注册成功');
          }
          else {
            app.show_msg('注册失败');
            var title = responseData == -1 ? '该账号已被注册' : '注册失败'
          }
        }
      })
    
  },



  inputTel: function(e) {
    this.setData({
      tel: e.detail.value
    })
  },
  inputCode: function(e) {
    this.setData({
      code: e.detail.value
    })
  },
  inputNewpassword: function(e) {
    this.setData({
      newPassword: e.detail.value
    })
  },

  // 获取验证码
  sendCode: function() {
    var that = this;

    if (this.data.tel == "") {
      this.toast('请输入手机号');
      return;
    }

    if (!(/^1[3|4|5|8][0-9]\d{8}$/.test(this.data.tel))) {
      this.toast('手机号输入错误');
      return;
    }

    // 60秒后重新获取验证码
    var inter = setInterval(function() {
      this.setData({
        smsFlag: true,
        sendColor: '#cccccc',
        sendTime: this.data.snsMsgWait + 's后重发',
        snsMsgWait: this.data.snsMsgWait - 1
      });
      if (this.data.snsMsgWait < 0) {
        clearInterval(inter)
        this.setData({
          sendColor: '#363636',
          sendTime: '发送验证码',
          snsMsgWait: 60,
          smsFlag: false
        });
      }
    }.bind(this), 1000);

    // 写自己的服务器和接口- - 
    wx.request({
      url: ptserviceUrl + 'sendCode',
      data: {
        mobiles: this.data.tel,
      },
      method: "POST",
      header: {
        'content-type': "application/x-www-form-urlencoded"
      },
      success(res) {
        console.log(res);
        if (res.data.success) {
          that.toast('短信验证码发送成功，请注意查收');
        }
      }
    })
  },

  // 提交信息
  saveClick: function() {
    var that = this;
    if (that.data.tel == "") {
      that.toast("手机号不可为空");
      return;
    }
    if (that.data.code == "") {
      that.toast("验证码不可为空");
      return;
    }
    if (that.data.newPassword == "") {
      that.toast("新密码不可为空");
      return;
    }

    var md5psd = md5Utils.hexMD5(that.data.newPassword);
    
    // 写自己的服务器和接口- - 
    wx.request({
      url: ptserviceUrl + 'forget',
      data: {
        mobile: this.data.tel,
        phcode: this.data.code,
        npwd: md5psd,
      },
      method: "POST",
      header: {
        'content-type': "application/x-www-form-urlencoded"
      },
      success(res) {
        console.log(res);
        if (res.data.success) {
          wx.navigateBack({
            delta: 1,
          })
        } else {
          that.toast(res.data.msg);
        }
      }
    })
  }

})