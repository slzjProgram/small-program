// pages/address/address.js
var city = require('../../utils/city.js')
var detailedInfo;
var consigneeName;
var phoneNum;
var address = {};
var addressList = [
];
var app=getApp();
Page({
  data: {
    provinceList: [],
    cityList: [],
    districtList: [],
    indexProvince: 0,
    indexCity: 0,
    indexDistrict: 0,
    province: '',
    dity: '',
    district: '',
    detailedInfo: '',
    isChecked: false,
  },
  //改变省
  provinceChange: function (e) {
    this.setData({
      indexProvince: e.detail.value,
      indexCity: 0,
      indexDistrict: 0,
    });
    //改变市和区
    this.setData({
      cityList: city.getCity(this.data.provinceList[this.data.indexProvince])
    });
    this.setData({
      districtList: city.getArea(this.data.provinceList[this.data.indexProvince], this.data.cityList[this.data.indexCity])
    });
  },
  //改变市
  cityChange: function (e) {
    this.setData({
      indexCity: e.detail.value,
      indexDistrict: 0,
    });
    //改变区
    this.setData({
      districtList: city.getArea(this.data.provinceList[this.data.indexProvince], this.data.cityList[this.data.indexCity])
    });
  },
  //改变区区/县
  districtChange: function (e) {
    this.setData({
      indexDistrict: e.detail.value,
    });
  },
  /**
   * 获取详细地址
   */
  getAddressInfo: function (e) {
    detailedInfo = e.detail.value;
    console.log("detailedInfo:" + detailedInfo);
  },
  /**
   * 获取联系人名称
   */
  getConsigneeName: function (e) {
    consigneeName = e.detail.value;
    console.log("consigneeName:" + consigneeName);
  },
  /**
 * 获取联系人电话
 */
  getPhoneNum: function (e) {
    phoneNum = e.detail.value;
    console.log("phoneNum:" + phoneNum);
  },

  //选择默认地址
  checkboxChange: function (e) {
    this.setData({
      isChecked: !this.data.isChecked
    });
    for (var key in addressList) {
      addressList[key].isDefult = false;
    }
  },

  /**
   * 点击添加地址
   */
  addNewAdress: function (e) {
    address.province = this.data.provinceList[this.data.indexProvince];
    address.city = this.data.cityList[this.data.indexCity];
    address.district = this.data.districtList[this.data.indexDistrict];
    address.detailedInfo = detailedInfo;
    address.consigneeName = consigneeName;
    address.phoneNum = phoneNum;
    address.isDefult = this.data.isChecked;
    addressList.push(address);
    this.saveAddress(address);
    wx.setStorageSync('address', addressList)
    wx.navigateBack({
      delta: 1, // 回退前 delta(默认为1) 页面
    })
  },

 saveAddress: function (address) {
    var that=this;
    // var formId=e.detail.formId;
    address.wxname=app.globalData.userInfo.nickName;
    address.wxurl=app.globalData.userInfo.avatarUrl;
    address.userId=app.globalData.userId;
    address.indexProvince=this.data.indexProvince;
    address.indexCity=this.data.indexCity;
    address.indexDistrict=this.data.indexDistrict;
      wx.request({
        url: app.globalData.url + 'ChangeAddress',
        method: 'POST',
        data: { Data: address }, //,formId:formId,openId:app.globalData.openId
        header: {
          'Content-Type': 'application/json'
        },
        success: function (res) {
          console.log(res);
          var responseData = res.data.success;
          console.log(responseData);
          if (responseData) {
            wx.navigateBack({
              userName: formData.userName,
            });
            app.show_msg('注册成功');
          }
          else {
            app.show_msg('注册失败');
            var title = responseData == -1 ? '该账号已被注册' : '注册失败'
          }
        }
      })
    
  },

  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    this.setData({
      provinceList: city.getProvince()
    });
    this.setData({
      cityList: city.getCity(this.data.provinceList[this.data.indexProvince])
    });
    this.setData({
      districtList: city.getArea(this.data.provinceList[this.data.indexProvince], this.data.cityList[this.data.indexCity])
    });
    addressList = wx.getStorageSync('address').length > 0 ? wx.getStorageSync('address') : [];
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