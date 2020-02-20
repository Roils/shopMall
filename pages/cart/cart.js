// pages/cart/cart.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    address: {},
    cart: [],
    allchecked: [],
    allprice: 0,
    allnum: 0
  },
  /**
   * 生命周期函数--监听页面加载
   */
  handleChange1({ detail }) {
    this.setData({
      num: detail.value
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
    const cart = wx.getStorageSync("cart") || [];
    const num = cart.num
    let allchecked = true
    let allprice = 0
    let allnum = 0
    cart.forEach(function (v) {
      if (v.checked) {
        allnum += v.num
        allprice += v.num * v.goods_price
      } else {
        allchecked = false
      }
    })
    allchecked = cart.length != 0 ? allchecked : false
    that.setData({
      address: address,
      cart: cart,
      allchecked,
      allnum,
      allprice
    })

  },
  itemchange(e) {
    const goods_id = e.currentTarget.dataset.id
    let { cart } = this.data
    let index = cart.findIndex(function (v) {
      return v.goods_id === goods_id
    })
    cart[index].checked = !cart[index].checked
    wx.setStorageSync("cart", cart);
    let allchecked = true
    let allprice = 0
    let allnum = 0
    cart.forEach(function (v) {
      if (v.checked) {
        allnum += v.num
        allprice += v.num * v.goods_price
      } else {
        allchecked = false
      }
    })
    allchecked = cart.length != 0 ? allchecked : false
    this.setData({
      cart,
      allprice,
      allnum,
      allchecked
    })
  },
  setcart(cart) {

    let allchecked = true
    let allprice = 0
    let allnum = 0
    cart.forEach(function (v) {
      if (v.checked) {
        allnum += v.num
        allprice += v.num * v.goods_price
      } else {
        allchecked = false
      }
    })
    allchecked = cart.length != 0 ? allchecked : false
    this.setData({
      cart,
      allprice,
      allnum,
      allchecked
    })
    wx.setStorageSync("cart", cart);
  },
  /**
   * 生命周期函数--监听页面隐藏
   */

  itemallchecked() {
    let { cart, allchecked } = this.data
    allchecked = !allchecked
    cart.forEach(function (v) {
      v.checked = allchecked
    })
    allchecked = true
    let allprice = 0
    let allnum = 0
    cart.forEach(function (v) {
      if (v.checked) {
        allnum += v.num
        allprice += v.num * v.goods_price
      } else {
        allchecked = false
      }
    })
    allchecked = cart.length != 0 ? allchecked : false
    this.setData({
      cart,
      allprice,
      allnum,
      allchecked
    })
    wx.setStorageSync("cart", cart);
  },

  itemedit(e) {
    const { id, goodedit } = e.currentTarget.dataset
    let { cart } = this.data
    const index = cart.findIndex(v => v.goods_id === id)
    if (cart[index].num === 1 && goodedit === -1) {
      wx.showModal({
        title: '消息提示',
        content: '是否删除该商品',
        showCancel: true,
        cancelText: '取消',
        cancelColor: '#000000',
        confirmText: '确定',
        confirmColor: '#3CC51F',
        success: (result) => {
          if (result.confirm) {
            cart.splice(index, 1)
            let allchecked = true
            let allprice = 0
            let allnum = 0
            cart.forEach(function (v) {
              if (v.checked) {
                allnum += v.num
                allprice += v.num * v.goods_price
              } else {
                allchecked = false
              }
            })
            allchecked = cart.length != 0 ? allchecked : false
            this.setData({
              cart,
              allprice,
              allnum,
              allchecked
            })
            wx.setStorageSync("cart", cart);
          } else if (result.cancel) {

          }
        },
        fail: () => { },
        complete: () => { }
      });
    } else {
      cart[index].num += goodedit
      let allchecked = true
      let allprice = 0
      let allnum = 0
      cart.forEach(function (v) {
        if (v.checked) {
          allnum += v.num
          allprice += v.num * v.goods_price
        } else {
          allchecked = false
        }
      })
      allchecked = cart.length != 0 ? allchecked : false
      this.setData({
        cart,
        allprice,
        allnum,
        allchecked
      })
      wx.setStorageSync("cart", cart);
    }

  },

  goodspay(){
    const {allnum} = this.data
    if(allnum===0){
      wx.showToast({
        title: '您还没有选购商品',
        icon: 'none',
        image: '',
        duration: 1500,
        mask: false,
        success: (result) => {
          
        },
        fail: () => {},
        complete: () => {}
      });
       return 
    }
    wx.navigateTo({
      url: '/pages/pay/pay',
    });
      
  },
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