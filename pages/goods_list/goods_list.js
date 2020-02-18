// pages/goods_list/goods_list.js
import { request } from '../../request/index'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs: [
      {
        id: 0,
        value: "综合",
        isActive: true
      },
      {
        id: 1,
        value: "销量",
        isActive: false
      },
      {
        id: 2,
        value: "价格",
        isActive: false
      }
    ],
    goodslist: [],
    totalpage: 1
  },
  queryParams: {
    query: '',
    cid: '',
    pagenum: 1,
    pagesize: 10
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.queryParams.cid = options.cid
    /* console.log(this.queryParams) */
    this.getGoodsList()
    
  },
  getGoodsList() {
    var query = this.queryParams
    var that = this
    request({ url: "/goods/search", data: query })
      .then(function (res) {
        var total = res.data.message.total
        that.totalpage = Math.ceil(total / query.pagesize)
        that.setData({
          goodslist: [...that.data.goodslist, ...res.data.message.goods]
        })
        wx.stopPullDownRefresh()
      })
  },
  handchtab(e) {
    const { index } = e.detail
    let { tabs } = this.data
    tabs.forEach(function (v, i) {
      i === index ? v.isActive = true : v.isActive = false
    })
    this.setData({
      tabs
    })
  },
  onReachBottom() {
    /* 下拉加载下一页*/
    var que = this.queryParams.pagenum
    var that = this
    if (que >= that.totalpage) {
      wx.showToast({
        title: '数据加载完毕',
        icon: 'none',
        image: '',
        duration: 1500,
        mask: false,
        success: (result)=>{
          
        },
        fail: ()=>{},
        complete: ()=>{}
      });
    } else {
      que++
      this.getGoodsList()
    }
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
    this.setData({
      goodslist:[]
    })
    this.queryParams.pagenum = 1
    this.getGoodsList()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})