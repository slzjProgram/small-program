//index.js
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

    imgUrls: [
      "../../img/turn_img1.jpg",
      "../../img/trun_img2.jpg",
    ],
    
    navs: [
      {
        icon: "../../img/trun_img2.jpg",
        text: "华为专区"
      },
    ],
    cartShopList: [
      {
        shopID: "1",
        shopImg: "../../img/list_img1.jpg",
        shopTitle: "新疆阿克苏冰糖心苹果10斤新鲜水果当季整箱丑萍果5红富士苹果大",
        shopSelectInfo: "店铺预售,付款后3天内发货",
        shopPrice: "25.80",
        shopCount: 1,
        index:"",
      },
    ],
    newShopList: [
      {
        shopID: "1",
        shopImg: "../../img/list_img2.jpg",
        shopTitle: "景湖有机土鸡纯粮散养皖南土鸡新鲜冷冻老母鸡礼盒顺丰",
        shopSelectInfo: "满158元 ,送任意1件赠品（赠完即止",
        shopPrice: "102.00",
        shopCount: 10,
        index:"",
      },
    ], 
    hotShopList: [
      {
        shopID: "1",
        shopImg: "../../img/list_img3.jpg",
        shopTitle: "满158元 ,送任意1件赠品（赠完即止",
        shopSelectInfo: "满12.9元减3元；满20元减5元",
        shopPrice: "89.00",
        shopCount: 2,
        index:"",
      },
    ]

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
       url: '../../pages/goodsDetail/detail?id=' + swiperIndex,
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
    wx.navigateTo({
      url: '../../pages/shopinfo/shopinfo?id=' + e.currentTarget.dataset.id ,
    })
},

 onLoad: function (e) {
    this.data.gamevsid=e.id;
  },

onShow: function (){
    this.getData();  
},

getData: function () {
    //  let that = this;
    // wx.request({
    //   url: app.globalData.url+'getPlayerAB&id='+that.data.gamevsid,
    //   method: 'GET',
    //   header: { },
    //   success(res) {
    //  //   console.log(res);
    //     that.setData({
    //       navs: res.data.data,
    //       imgUrls: res.data.adsdata,
    //       cartShopList: res.data.Best,
    //     //  hotShopList: res.data.Hot,
    //      // newUrls: res.data.New,
    //     });
    //   }
    // })
  },
})
 