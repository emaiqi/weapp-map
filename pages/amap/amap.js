import amapFile from '../../libs/amap-wx.js'

var markersData = [];
Page({
  data: {
    markers: [],
    latitude: '',
    longitude: '',
    placeData: {},

    AMap:{}
  },
  makertap: function (e) {
    var id = e.markerId;
    var that = this;
    that.showMarkerInfo(markersData, id);
    that.changeMarkerColor(markersData, id);
  },
  onLoad: function () {
    var that = this;
    this.setData({AMap:new amapFile.AMapWX({
       key: 'ea889682997a181fd6678d9aaf23693a'
     })})

    wx.getLocation({
      type: 'wgs84',
      success: function (res) {
        var latitude = res.latitude
        var longitude = res.longitude
        that.setData({ latitude: latitude, longitude: longitude })
      }
    })
  },
  weather: function () {
    wx.navigateTo({
      url: '../amapweather/amapweather'
    })
  },
  onSearch: function () {
    var that = this;
    this.data.AMap.getPoiAround({
      iconPathSelected: '../../image/marker_red.png', //如：..­/..­/img/marker_checked.png
      iconPath: '../../image/marker_yellow.png', //如：..­/..­/img/marker.png
      success: function (data) {
        markersData = data.markers;
        that.setData({
          markers: markersData
        });
        that.setData({
          latitude: markersData[0].latitude
        });
        that.setData({
          longitude: markersData[0].longitude
        });
        that.showMarkerInfo(markersData, 0);
      },
      fail: function (info) {
        wx.showModal({ title: info.errMsg })
      }
    })
  },
  onRegeo:function(){
    var that =this 
    this.data.AMap.getRegeo({
      iconPath: "../../image/marker_red.png",
      iconWidth: 22,
      iconHeight: 22,
      success: function(data){
        that.setData({
          markers: data
        });
        that.setData({
          latitude: data[0].latitude
        });
        that.setData({
          longitude: data[0].longitude
        });
        that.setData({
          placeData: {
            title: data[0].name,
            address: data[0].desc
          }
        })
      },
      fail: function(info){
        wx.showModal({title:info.errMsg})
      }
    })
  },
  showMarkerInfo: function (data, i) {
    var that = this;
    console.log("高德",data)
    that.setData({
      placeData: {
        title: data[i].name,
        address: data[i].address
      }
    });
  },
  changeMarkerColor: function (data, i) {
    var that = this;
    var markers = [];
    for (var j = 0; j < data.length; j++) {
      if (j == i) {
        data[j].iconPath = "../../image/marker_red.png"; //如：..­/..­/img/marker_checked.png
      } else {
        data[j].iconPath = "../../image/marker_yellow.png"; //如：..­/..­/img/marker.png
      }
      markers.push(data[j]);
    }
    that.setData({
      markers: markers
    });
  }

})
