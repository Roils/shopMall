/* 同时发布异步的次数 */
let ajaxnum = 0
export const request = function (params) {
    ajaxnum++;
    wx.showLoading({
        title: "加载中",
        mast: true
    })
    const baseurl = "https://api.zbztb.cn/api/public/v1"
    return new Promise((resolve, reject) => {
        wx.request({
            ...params,
            url: baseurl + params.url,
            success: function (res) {
                resolve(res)
            },
            fail: function (err) {
                reject(err)
            },
            complete: function () {
                ajaxnum--;
                if(ajaxnum===0){
                    wx.hideLoading()
                }
            }
        });

    })
}