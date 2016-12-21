
Page({
  onReady: function() {
    setTimeout(function(){
        wx.redirectTo({
            url: '../index/index'
        })
    },2000);
  }
})