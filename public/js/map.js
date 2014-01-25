var map = false
  , marker = false;

function initialize() {
  var latlong = new google.maps.LatLng(40.3140, -74.5089)
  var mapOptions = {
    center: latlong,
    zoom: 6
  };
  
  map = new google.maps.Map(document.getElementById("map-canvas"),
      mapOptions);
}

function addMac() {
  var macnum = $("#macs").children().length + 1;

  var formgroup = document.createElement("div");
  $(formgroup).addClass("form-group")

  var label = document.createElement("label");
  $(label).attr("for","mac" + macnum).text("Mac Address")
  $(formgroup).append(label);

  var input = document.createElement("input");
  $(input).addClass("form-control").attr("type","text").attr("id","mac" + macnum)
  $(formgroup).append(input);

  $("#macs").append(formgroup);

  return false;
}

function getMacs() {
  var returnmacs = [];
  var children = $("#macs").children()
  for (var i = 0; i < children.length; i++) {
    var macregex = /^([0-9a-fA-F]{2}[\:]){5}[0-9a-fA-F]{2}$/

    var val = $.trim($("#mac" + (i + 1)).val());

    if (val !== "") {
      if (macregex.test(val)) {
        $(children[i]).removeClass('has-error')
        returnmacs.push({"macAddress" : val})
      }
      else {
        $(children[i]).addClass('has-error')
      }
    }
  }
  return returnmacs;
}

function updateDetails(d) {
  $("#latdetail").text(d.location.lat);
  $("#longdetail").text(d.location.lng);
  $("#accuracydetail").text(d.accuracy);
}

function updateMap(d) {
  var latlong = new google.maps.LatLng(d.location.lat, d.location.lng)
  map.panTo(latlong);

  if (marker)
    marker.setPosition(latlong);
  else {
      marker = new google.maps.Marker({
      position: latlong,
      map: map,
    });
  }

  if (d.accuracy < 1000)
    map.setZoom(16);
  else if (d.accuracy < 10000)
    map.setZoom(13);
  else
    map.setZoom(10);
}

function locate() {
  macs = getMacs()
  if (macs.length < 2) {
    $('.form-group').addClass('has-error')
    return false;
  }

  $.ajax({
    url: "/locate",
    type: "POST",
    data: JSON.stringify(macs),
    contentType: "application/json",
    success: function (data) {
      data = JSON.parse(data)
      if (data && data.location) {
        updateDetails(data);
        updateMap(data)
      }
      else {
        console.log('error getting location',data)
      }
    }
  })
  return false;
}

$(function () {
  initialize();
  $("#addbtn").on("click", addMac)
  //$("#locatebtn").on("click", locate)
  $("#locateform").on('submit', locate)
})