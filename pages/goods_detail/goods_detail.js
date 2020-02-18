// pages/goods_detail/goods_detail.js
import { request } from '../../request/index'
/* 轮播预览：图片点击调用小程序previewImage */
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsObj:{},
    goodsinfo:{}
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const {goods_id} = options
    this.getGoodsDetail(goods_id)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */

   getGoodsDetail(goods_id){
    var that = this
    request({url:"/goods/detail",data:{goods_id}})
    .then(function(res){
      that.goodsinfo = res.data.message
      that.setData({
        goodsObj:{
          goods_name:res.data.message.goods_name,
          goods_price:res.data.message.goods_price,
          goods_introduce:res.data.message.goods_introduce.replace(/\.webp/g,'.jpg'),
          pics:res.data.message.pics
        }
      })
    })
    
   },
   /* 轮播预览 */
  viewimg:function(e){
    /* 构造预览图片数组 */
    var that = this
    const urls = that.goodsinfo.pics.map(function(v){
      return v.pics_mid
    })
    const current = e.currentTarget.dataset.url
    wx.previewImage({
      current: current,
      urls: urls,
      success: (result) => {
        
      },
      fail: () => {},
      complete: () => {}
    });
      
  },
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