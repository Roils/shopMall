// pages/index/index.js
/* promi处理异步 */
import { request } from '../../request/index'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    swiperList:[],/* 轮播图 */
    cateList:[],/* 导航数组 */
    commoList:[],/* 分类数据 */
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    /* 发送异步请求 获取轮播图数据 */
    this.getSwiperList()
    this.getCateList()
    this.getCommoList()
  },

  /* 异步获取轮播图数据 */
  getSwiperList(){
    var that = this
    request({url:"/home/swiperdata"})
    .then(function(res){
      that.setData({
          swiperList:res.data.message
        })
    })
  },
  /* 获取导航数据 */
  getCateList(){
    var that = this
    request({url:"/home/catitems"})
    .then(function(res){
      that.setData({
          cateList:res.data.message
        })
    })
  },
  /* 获取分类图片数据 */
  getCommoList(){
    var that = this
    request({url:"/home/floordata"})
    .then(function(res){
      that.setData({
          commoList:res.data.message
        })
    })
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

  }
})