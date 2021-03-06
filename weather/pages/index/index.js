//index.js
//获取应用实例
var app = getApp();
Page({
  data: {
    imgUrls: [
      '../../images/bg11.jpg'
    ],
    duration: 1000,
    basic:{},
    daily:{},
    now:{},
    aqi:{},
    lat:"",
    lon:"",
    city:"",
    day:["今天","明天","后天"],
    suggestion:{},

    },

    getCity:function(){
      var that=this;
      // 获取当前经纬度
      wx.getLocation({
        type: 'wgs84',
        success: function(res) {
          var lat=res.latitude;
          var lon=res.longitude;

          //将当前经纬度转换成城市
          wx.request({
            url:"https://api.map.baidu.com/geocoder/v2/?location="+lat+","+lon+"&output=json&pois=1&ak=9Gk4hNirYGI6kfYDnXiusbNIG87iG9iz",
            success:function(res){
              that.data.city=res.data.result.addressComponent.city.slice(0,-1);
              that.getWeather(that.data.city);
          }})
          
      }})
    },

    getWeather:function(city){
      var that=this;
      // 获取天气数据
      wx.request({
        url: 'https://free-api.heweather.com/v5/weather?city='+city+'&key=0d3f140d576d4f989b49bfb99904851c',
        header: {
            'content-type': 'application/json'
        },
        success: function(res) {
          var obj=res.data["HeWeather5"][0];
          that.setData({
            basic:obj.basic,
            daily:obj["daily_forecast"],
            now:obj["now"],
            aqi:obj["aqi"]["city"],
            suggestion:obj["suggestion"],
            city:obj.basic.city
          })
        }
      });
    },

    

    // 页面加载
    onLoad:function(){
      var city=wx.getStorageSync("cacheCity")||this.data.city;
      if(city){
        this.getWeather(city);
      }else{
        this.getCity();
        // 将当前城市加入缓存
        this.setData(
          {
            cacheCity:wx.setStorage({
              key:"cacheCity",
              data:city
            })
          }
        );
      }//else结束
    }//页面加载结束
});




