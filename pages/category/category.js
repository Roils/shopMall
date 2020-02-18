// pages/category/category.js
import { request } from '../../request/index'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cateLeft: [],
    cates: [],
    cateRight: [],
    /* 菜单选中状态哦 */
    currenIndex: 0,
    scrolltop:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getCates()
    /* 获取本地存储的数据 */
    const cates= wx.getStorageSync("Cates");
    /* if(!cates){
      this.getCates()
    } */
      
  },

  /* 获取分类数据 */
  getCates() {
    var that = this
    request({ url: "/categories" })
      .then(function (res) {
        that.cates = res.data.message
        /* 存入本地 */
       /*  wx.setStorageSync("Cates", {time:Date.now(),data:that.cates}); */
          
        let cl = res.data.message.map(function (v) {
          return v.cat_name
        })
        let cr = that.cates[0].children
        that.setData({
          cates: res.data.message,
          cateLeft: cl,
          cateRight: cr
        })
      })
  },
  handitemTab(e) {
    /* 切换获取对于数据 */
    let that = this
    let { index } = e.currentTarget.dataset
    let cr = that.cates[index].children
    that.setData({
      currenIndex: index,
      cateRight: cr,
      scrolltop:0
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