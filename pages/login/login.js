let app = getApp();
import CONFIG from '../../config.js';
import * as utils from '../../utils/util.js';
let okayapi = require('../../utils/okayapi.js');

Page({
  data: {
    openid: '',
  },
  onLoad: function() {
    var that = this;
    var code = '',
      openid = '';
    var wid='wxc90a4ec9591d82c3';
    var wsec='624a0c326e55595c1fad52293fe1e760';
    var url1 ='https://api.weixin.qq.com/sns/jscode2session?appid='+wid;
    url1 =url1+'&secret='+wsec;
    // 查看是否授权
    wx.getSetting({
      success: function(res) {
        if (res.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: function(res) {
              //传入用户信息
              app.globalData.userInfo = res.userInfo;
              wx.login({
                //获取code
                success: function(res) {
                  code = res.code; //返回code
                  console.log(url1+'&js_code=' + code + '&grant_type=authorization_code');
                  wx.request({
                    url: url1+'&js_code=' + code + '&grant_type=authorization_code',
                    data: {},
                    header: {
                      'content-type': 'application/json'
                    },
                    success: function(res) {
                         console.log(res);
               
                     openid = res.data.openid; //返回openid
                      app.globalData.openid = openid;
                      that.setData({
                        openid: openid,
                      });
                    },
                    fail: function(err) {
                      console.log('error', err);
                    }
                  })
                }
              })
              //用户已经授权过
              app.show_page('/pages/index/index');
            }
          });
        }
      }
    })
  },

  bindGetUserInfo: function(e) {

    if (e.detail.userInfo) {
      //用户按了允许授权按钮
      var that = this;
      var code = '',openid='';
      wx.login({
        //获取code
        success: function(res) {
          code = res.code //返回code
          wx.request({
            url: 'https://api.weixin.qq.com/sns/jscode2session?appid=wx9dd79889b1348c3a&secret=c0ff19403b5a206bf0bf537370dc5752&js_code=' + code + '&grant_type=authorization_code',
            header: {
              'content-type': 'application/json'
            },
            success: function(res) {
              openid = res.data.openid; //返回openid
              app.globalData.openid = openid;   
              that.setData({
                openid: openid,
              });
             
              //插入登录的用户的相关信息到数据库
            },
            fail: function(err) {
              app.show_msg('error');
            }
          })
        }
      })
           
      //授权成功后，跳转进入小程序首页
      app.show_page('/pages/register/register');
    } else {
      //用户按了拒绝按钮
      wx.showModal({
        title: '警告',
        content: '您点击了拒绝授权，将无法进入小程序，请授权之后再进入!!!',
        showCancel: false,
        confirmText: '返回授权',
        success: function(res) {
          if (res.confirm) {
             //  app.show_msg('登录成功！！');
        
           // console.log('用户点击了“返回授权”')
          }
        }
      })
    }
  },


})