// pages/cart/cart.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    address: [],
    value1: 1,
  },
  /**
   * 生命周期函数--监听页面加载
   */
  handleChange1({ detail }) {
    this.setData({
      value1: detail.value
    })
  },
  onLoad: function (options) {

  },
  getAddress() {
    /* 获取用户设置 */
    wx.getSetting({
      success: (result) => {
        const scopeAdd = result.authSetting['scope.address']
        if (scopeAdd === true || scopeAdd === undefined) {
          wx.chooseAddress({
            success: (result1) => {
            },
          });
        } else {
          wx.openSetting({
            success: (result2) => {
              wx.chooseAddress({
                success: (result3) => {
                },
              });
            },
          });

        }
      },
    });
    /* 获取收货地址 */
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
    var that = this
    const address = wx.getStorageSync("address");
    that.setData({
      address: address
    })

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