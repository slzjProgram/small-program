//index.js
import config from '../../config.js'
//获取应用实例
var app = getApp();
var swiperIndex =  0;
var Urlsid= [1, 2, 3];
Page({
  data: {
    indicatorDots: "true",//是否显示面板指示点
    autoplay: "true",//是否自动切换
    interval: "5000",//自动切换时间间隔
    duration: "1000",//滑动动画时长
    isHideLoadMore:true,
    imgUrl: [
      "../../img/turn_img1.jpg",
      "../../img/turn_img2.jpg",
      "../../img/turn_img3.jpg",

    ],
    
  
    goodsItems: [
      {
        goodsId: "1",
        PicUrl: "../../img/list_img1.jpg",
        Name: "航空研学大课堂，我是中国小机长！",
        endTime:"6天04:56:01"
      },
      {
        goodsId: "2",
        PicUrl: "../../img/list_img2.jpg",
        Name: "贵州肇兴少数民族亲自游乐",
        endTime:"5天23:56:01"

      },
      {
        goodsId: "3",
        PicUrl: "../../img/list_img3.jpg",
        Name: "秋天大丰收快乐童年，到美丽稻田快乐亲子",
        endTime:"1天01:16:55"

      },
     
    ],


  },

//点击轮播图
  swiperClick : function(){
     wx.navigateTo({
       url: '../../pages/shopinfo/shopinfo?id=' +Urlsid[swiperIndex],
    })
  },

 

//轮播图轮播事件
  swiperChange: function (e) {   
      swiperIndex =  e.detail.current
  },
/**
 * 首页导航点击事件
 */
 navClick: function (e) {
    wx.navigateTo({
      url: '../huawei/huawei?itemType=' + e.currentTarget.dataset.type,

    })
  },

/**
 * 最热
 */
volumeClick : function(){
   wx.navigateTo({
       url: '../../pages/shopinfo/shopinfo?id=' + swiperIndex,
    })
},
/**
 * 最新
 */
newClick : function(){
   wx.navigateTo({
       url: '../../pages/shopinfo/shopinfo?id=' + swiperIndex,
    })
},
/**
 * 最火
 */
hotClick : function(){
   wx.navigateTo({
       url: '../../pages/shopinfo/shopinfo?id=' + swiperIndex,
    })
},

onItemClick: function(e){
  console.log(e.currentTarget.dataset.id)
  wx.navigateTo({
    url: '../../pages/goodsDetail/detail?&id=' + e.currentTarget.dataset.id ,
  })
},
  onPullDownRefresh: function () {
    wx.showNavigationBarLoading(); //在标题栏中显示加载
    this.onLoad();
    setTimeout(function () {
      wx.hideNavigationBarLoading(); //完成停止加载
      wx.stopPullDownRefresh(); //停止下拉刷新
    }, 1300);
  },

 onLoad: function () {
 

  },

  goodsDetails: function(){
    wx.navigateTo({
      url: '../goodsDetail/detail',
    })
  }

})
 