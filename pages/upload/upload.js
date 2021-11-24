// pages/upload/upload.js
import config from '../../config.js'
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    url1:config.upImg,
    url2:config.UpGoodsInfo,
    uploaderList: [],
    uploaderNum:0,
    showUpload:true,
    uploadInfo:false,

    goodsId:'',
    goodsInfoList: [
      {
        //shopImg: "",
        title: "",
        info: "",
        price: "",
        count: 0,
      },
    ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {

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
  clearImg:function(e){
        var nowList = [];//新数据
        var uploaderList = this.data.uploaderList;//原数据
        
        for (let i = 0; i < uploaderList.length;i++){
            if (i == e.currentTarget.dataset.index){
                continue;
            }else{
                nowList.push(uploaderList[i])
            }
        }
        this.setData({
            uploaderNum: this.data.uploaderNum - 1,
            uploaderList: nowList,
            showUpload: true
        })
  },
    //展示图片
  showImg:function(e){
        var that=this;
        wx.previewImage({
            urls: that.data.uploaderList,
            current: that.data.uploaderList[e.currentTarget.dataset.index]
        })
  },
    //上传图片
  upload: function(e) {
        var that = this;
        wx.chooseImage({
            count: 9 - that.data.uploaderNum, // 默认9
            sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
            sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
            success: function(res) {
                //console.log(res)
                // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
                let tempFilePaths = res.tempFilePaths;
                let uploaderList = that.data.uploaderList.concat(tempFilePaths);
                if (uploaderList.length==9){
                    that.setData({
                        showUpload:false
                    })
                }
                that.setData({
                    uploaderList: uploaderList,
                    uploaderNum: uploaderList.length,
                })
            }
        })
  },
  //上传图片到后台
  upImg:function(){
    var that = this;
    if(!that.data.uploadInfo){
      wx.showModal({
        title: '提示',
        content: '请先上传商品信息',
        showCancel: false
      })
      return
    }
    
    var flag = true;
    for(var i=0;i<that.data.uploaderList.length;i++){
      wx.uploadFile({
        url: that.data.url1,
        filePath: that.data.uploaderList[i],
        name: 'file',
        formData: {
          'user': 'Imgtest',
          //图片命名：用户id-商品id-1~9
          'newName':app.globalData.login+'-'+that.data.goodsId+'-'+i
        },
        success (res){
          
        },
        fail(res){
          flag = false;
          wx.showModal({
            title: '提示',
            content: '第'+i+'张上传失败',
            showCancel: false
          })
        }
      })
    };
    if (flag) {
      wx.showModal({
        title: '提示',
        content: '上传成功',
        showCancel: false
      })
      that.setData({
        uploaderList: [],
        uploaderNum: 0,
      })
    }
  },
  goodsInfoChange:function(e){
    let val = e.currentTarget.dataset.val
    let valList={}
    valList[val]=e.detail.value
    this.setData({
      [val]:e.detail.value
    })
  },
  //上传信息到后台
  upGoodsInfo:function(){
   let that = this;
    wx.request({
      url: config.upGoodsInfo,
      method: 'GET',
      data:{
        goodsInfo:that.data.goodsInfoList,
        goodsId:that.data.goodsId
      },
      
      success(res) {
        console.log(res);
        that.setData({
          goodsId:res.data.data,
          uploadInfo:true
        });
        wx.showModal({
            title: '提示',
            content: '提交成功',
            showCancel: false
          })
        console.log(that.data);
      }
    })
  },
})