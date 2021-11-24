//app.js
App({
onLaunch: function() { 
  var that = this;
    // Do something initial when launch.
    //调用登录接口
    // // "pages/index/index",
  
   //  return ;
     let menuButtonObject = wx.getMenuButtonBoundingClientRect();
    //this.getSystemInfo();
     //  return ;
      wx.login({
        success: function () {
          wx.getUserInfo({
            success: function (res) {
              that.globalData.userInfo = res.userInfo;
            //  that.checkUserInfo();
               that.show_page('/pages/index/index');
            }
          });
        }
      });
  },


  //获取用户信息
  getUserInfo:function(){
    var that = this;
    var user_info = wx.getStorageSync('user_info');
    if(!user_info){
      that.show_page('/pages/login/login');
    } else
    that.globalData.userInfo = user_info;
  //  return user_info;
  },
    //获取设备信息
  getSystemInfo : function(){
    let menuButtonObject = wx.getMenuButtonBoundingClientRect();
    if(this.globalData.systemInfo){
      return this.globalData.systemInfo;
    }else{
        wx.getSystemInfo({
          success : (res) => {
            this.globalData.systemInfo = res;
            let statusBarHeight = res.statusBarHeight,
              navTop = menuButtonObject.top,//胶囊按钮与顶部的距离
              navHeight = statusBarHeight + menuButtonObject.height + (menuButtonObject.top - statusBarHeight) * 2;//导航高度
            this.globalData.navHeight = navHeight;
            this.globalData.navTop = navTop;
            this.globalData.windowHeight = res.windowHeight;
            return this.globalData.systemInfo;
            // typeof cb == "function" && cb(_this.globalData.systemInfo);
          }
        })
      }
  },


 set_address: function(paddress) { 
    this.globalData.indexProvince=paddress.indexProvince;
    this.globalData.indexCity=paddress.indexCity;
    this.globalData.indexDistrict=paddress.indexDistrict;
    this.globalData.province=paddress.province;
    this.globalData.dity=paddress.dity;
    this.globalData.district=paddress.district;
    this.globalData.detailedInfo=paddress.detailedInfo;
   },

  globalData: {
    userInfo: null,
    indexProvince: 0,
    indexCity: 0,
    indexDistrict: 0,
    province: '',
    dity: '',
    district: '',
    detailedInfo: '',
    userOpenId:'undefined',
    addressList:[],
    userId: 0,
    showp: 0,
    login: 141,//登录的用户的id
    loginr1: 0,
    loginr2: 0,
    otherAddressInfo:null,
   // url: "http://fortestyii.xyz?r=WxShop/",
   // imgUrl: 'http://fortestyii.xyz/uploads/image/',

    url:"http://127.0.0.1/mmyii/index.php?r=Goods_Info/",
    
    imgUrl: '',
    okayapiHost: "http://test_phalapi.com", // TODO: 配置成你所在的接口域名
    okayApiAppKey: "appkey", // TODO：改为你的APP_KEY 在http://open.yesapi.cn/?r=App/Mine寻找
    okayApiAppSecrect: "appsecret" // TODO：改为你的APP_SECRECT
  },

 show_msg: function(msg) { 
       wx.showToast({
          title: msg,
          duration: 2000,
        });
  },
  show_error: function() { 
      $this.show_msg('网络异常！');
  },
  show_page: function(myurl){
     wx.navigateTo({
            url: myurl,
            success: function (res) { },
            fail: function (res) {
            if (res.errMsg && (res.errMsg == 'navigateTo:fail can not navigateTo a tabbar page' || res.errMsg == 'navigateTo:fail can not navigate to a tabbar page') ) 
            {
              wx.switchTab({
                url: myurl,
              })
            }
          },
          complete: function (res) {
          // console.log('res', res)
          },
        })
  },

checkUserInfo:function(){
    var that = this;
    var s1="";
    s1=s1+'&nickName='+this.globalData.userInfo.nickName;
    s1=s1+'&avatarUrl='+this.globalData.userInfo.avatarUrl;
    wx.request({
      url: this.globalData.url + 'CheckUser'+s1,
      method: 'POST',
      data: { formData: 0 }, //,formId:formId,openId:app.globalData.openId
      header: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        var responseData = res.data.code;
        if (responseData) { //意见备案，
            that.globalData.userId =  res.data.userId;
            that.show_page('/pages/index/index');
        }
        else{
          that.show_page('/pages/ulogin/login');
        }
      },
       fail: function (res) {
          that.show_page('/pages/ulogin/login');
        },
    });
   },

})