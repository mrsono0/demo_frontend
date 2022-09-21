/*global kakao */
import React, { useEffect } from "react";
import coordinates from "../resoureces/bessel.json";

import DBeauty from "../resoureces/DBeauty.json";
import PetHotel from "../resoureces/PetHotel.json";
import PetCafe from "../resoureces/PetCafe.json";
import AniHos from "../resoureces/AniHos.json";
// import PetTaxi from '../resoureces/PetTaxi.json';
import park from "../resoureces/park.json";
// import Hos24 from '../resoureces/Hos24.json';
import point from "../resoureces/seoulcount.json";

const Location = () => {
  useEffect(() => {
    var container = document.getElementById("map"); //지도를 표시할 div
    var options = {
      center: new kakao.maps.LatLng(37.566835464099945, 126.97864659608003), //지도의 중심좌표
      level: 8, //지도의 확대 레벨
    };
    //지도 생성
    var map = new kakao.maps.Map(container, options),
      // customOverlay = new kakao.maps.CustomOverlay({}),
      infowindow = new kakao.maps.InfoWindow({ removable: true });
    function setZoomable(zoomable) {
      // 마우스 휠로 지도 확대,축소 가능여부를 설정합니다
      map.setZoomable(zoomable);
    }
    setZoomable(false);

    // 지도 확대 축소를 제어할 수 있는  줌 컨트롤을 생성합니다
    var zoomControl = new kakao.maps.ZoomControl();
    map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);

    // 줌 레벨 변동 시 오브젝트 표시 유무 함수
    function zoomchangepolygon(value) {
      // 지도가 확대 또는 축소되면 마지막 파라미터로 넘어온 함수를 호출하도록 이벤트를 등록합니다
      kakao.maps.event.addListener(map, "tilesloaded", function () {
        // 지도의 현재 레벨을 얻어옵니다
        var level = map.getLevel();

        if (level < 9) {
          value.setMap(map);
        } else {
          value.setMap(null);
          infowindow.close();
        }
      });
    }

    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    //// 폴리곤 변수

    // 동 데이터 변수 모음
    var json_data = coordinates.features;
    var result1 = [];
    var result1_name = [];
    var result2 = [];
    var result2_name = [];
    var Opacity1 = [];
    var Opacity2 = [];
    var Airportsite = [
      "고척동",
      "신월동",
      "신정동",
      "화곡동",
      "공항동",
      "외발산동",
      "내발산동",
    ];
    var point_data = point;

    // console.log(point_data["24시간 병원 유무"])

    // 동 데이터 분배
    for (var coordi = 0; coordi < json_data.length; coordi++) {
      if (json_data[coordi]["geometry"]["coordinates"].length === 1) {
        result1.push(json_data[coordi]["geometry"]["coordinates"]);
        result1_name.push(json_data[coordi]["properties"]["EMD_NM"]);
        // Opacity1.push(json_data[coordi]['properties']['EMD_NM'])
        // if (i == )
        if (coordi === 374) {
          Opacity1["신정1동"] = 0.1;
        }
        Opacity1[json_data[coordi]["properties"]["EMD_NM"]] = 0.1;
      } else {
        result2.push(json_data[coordi]["geometry"]["coordinates"]);
        result2_name.push(json_data[coordi]["properties"]["EMD_NM"]);
        // Opacity2.push(json_data[coordi]['properties']['EMD_NM'])
        Opacity2[json_data[coordi]["properties"]["EMD_NM"]] = 0.1;
      }
    }

    // console.log(Object.values(Opacity1))
    // console.log(Object.values(Opacity2))
    // console.log(result1_name])
    // console.log(result2_name)
    // console.log(json_data[374]['properties']['EMD_NM'])
    // console.log(result1_name.length)
    // console.log(result2_name.length)
    // console.log(Object.keys(Opacity1))

    // console.log(point_data.법정동[num])
    // console.log(point_data["24시간 병원 유무"][num]+ '//24시간 병원 유무')
    // console.log(point_data.펫호텔[num]+ '//펫호텔')
    // console.log(point_data.애견카페[num] + '//애견카페')
    // console.log(point_data.애견미용[num] + '//애견미용')
    // console.log(point_data.동물병원[num] + '//동물병원')
    // console.log(point_data[766][num] + '//766')
    // console.log(point_data[1183][num] + '//1183')
    // console.log(point_data[2400][num] + '//2400')
    // console.log(point_data[9000000][num] + '//9000000')

    // console.log(count)

    // console.log(point_data.애견미용[1])
    // console.log(Object.keys(Opacity1).indexOf(point_data.법정동[1]))
    // console.log(Object.keys(Opacity2))
    // console.log(point_data.법정동[0])
    // console.log(Object.values(point_data.법정동).length)

    // console.log(Opacity2)
    // console.log(Object.keys(Opacity2))
    // console.log(Object.keys(Opacity2)[1])
    // console.log(Object.values(point_data.법정동).indexOf(Object.keys(Opacity2)[1]))
    // console.log(Object.keys(Opacity2).indexOf('1'))
    // console.log(Object.keys(Opacity1))
    // console.log(Opacity1.indexOf('가락동'))

    // console.log(Object.keys(point_data))
    // console.log(Object.values(point_data.법정동).length)

    function pointcounting(array, num) {
      if (Object.keys(array).indexOf(point_data.법정동[num]) !== -1) {
        var count = 0;
        var idx = Object.keys(array).indexOf(point_data.법정동[num]);
        var name = Object.keys(array)[idx];
        if (point_data.애견미용[num] > 0) {
          count += 1;
        }
        if (point_data.동물병원[num] > 0) {
          count += 1;
        }
        if (point_data.펫호텔[num] > 0) {
          count += 1;
        }
        if (point_data.애견카페[num] > 0) {
          count += 1;
        }
        if (point_data["24시간 병원 유무"][num] > 0) {
          count += 1;
        }
        if (point_data[9000000][num] > 0) {
          count += 4;
        } else if (point_data[2400][num] > 0) {
          count += 3;
        } else if (point_data[1183][num] > 0) {
          count += 2;
        } else if (point_data[766][num] > 0) {
          count += 1;
        }
        array[name] = count;
      }
    }

    function Airportsite_minus(array, Airportsite) {
      for (var a = 0; a < Object.keys(array).length; a++) {
        if (Airportsite.indexOf(Object.keys(array)[a]) !== -1) {
          array[Object.keys(array)[a]] -= 1;
        }
      }
    }

    for (var k = 0; k < Object.values(point_data.법정동).length; k++) {
      pointcounting(Opacity1, k);
      pointcounting(Opacity2, k);
    }

    Airportsite_minus(Opacity1, Airportsite);
    Airportsite_minus(Opacity2, Airportsite);

    // console.log(Opacity1)
    // console.log(Opacity2)

    // Opacity의 max 값을 구하는 코드
    var Opacity1_max = 0;
    var Opacity2_max = 0;

    for (var n = 0; n < Object.values(Opacity1).length; n++) {
      if (Opacity1_max < Object.values(Opacity1)[n]) {
        Opacity1_max = Object.values(Opacity1)[n];
      }
    }
    for (var m = 0; m < Object.values(Opacity2).length; m++) {
      if (Opacity2_max < Object.values(Opacity2)[m]) {
        Opacity2_max = Object.values(Opacity2)[m];
      }
    }

    var Maxresult = Math.max(Opacity1_max, Opacity2_max);

    // console.log(Maxresult)

    // 점수를 0~1 사이의 값으로 만들어주는 코드

    function Pointchange(array, max) {
      for (var l = 0; l < Object.values(array).length; l++) {
        array[Object.keys(array)[l]] =
          Math.round((Object.values(array)[l] / max) * 100) / 100;
        if (array[Object.keys(array)[l]] === 1) {
          array[Object.keys(array)[l]] -= 0.1;
        }
        if (array[Object.keys(array)[l]] < 0.1) {
          array[Object.keys(array)[l]] = 0.1;
        }
      }
    }

    Pointchange(Opacity1, Maxresult);
    Pointchange(Opacity2, Maxresult);

    // console.log(Object.values(Opacity1))
    // console.log(Object.values(Opacity2))

    //// 폴리곤 함수

    // 폴리곤 생성
    function Displayarea(polygonPath, name, result) {
      var color = "";
      // 각각의 폴리곤의 색깔 바꿔주는 코드
      if (result > 0.8) {
        // 빨강
        color = "#FF0000";
      } else if (result > 0.6) {
        // 파랑
        color = "#0048FF";
      } else if (result > 0.3) {
        // 노랑
        color = "#F2FF00";
      } else if (result > 0.1) {
        // 초록
        color = "#22FF00";
      } else {
        // 주황
        color = "#FF9900";
      }
      var polygon = new kakao.maps.Polygon({
        path: polygonPath,
        strokeWeight: 2,
        strokeColor: "#004c80",
        strokeOpacity: 0.8,
        fillColor: color,
        fillOpacity: 0.5,
      });

      // 다각형에 click 이벤트를 등록하고 이벤트가 발생하면 다각형의 이름과 면적을 인포윈도우에 표시합니다
      kakao.maps.event.addListener(polygon, "click", function (mouseEvent) {
        infowindow.setContent(name);
        infowindow.setPosition(mouseEvent.latLng);
        infowindow.setMap(map);
      });
      // 다각형에 mouseover 이벤트를 등록하고 이벤트가 발생하면 폴리곤의 채움색을 변경합니다
      kakao.maps.event.addListener(polygon, "mouseover", function () {
        polygon.setOptions({ fillColor: "#fff" });
      });

      // 다각형에 mouseout 이벤트를 등록하고 이벤트가 발생하면 폴리곤의 채움색을 원래색으로 변경합니다
      kakao.maps.event.addListener(polygon, "mouseout", function () {
        polygon.setOptions({ fillColor: color });
      });

      zoomchangepolygon(polygon);
    }

    // 3차원 오브젝트
    function Dong_Polygon(result1) {
      for (var i = 0; i < result1.length; i++) {
        var polygonPath = [];
        for (var t = 0; t < result1[i][0].length; t++) {
          polygonPath.push(
            new kakao.maps.LatLng(result1[i][0][t][1], result1[i][0][t][0])
          );
        }
        Displayarea(polygonPath, result1_name[i], Object.values(Opacity1)[i]);
      }
    }

    // 4차원 오브젝트
    function Dong_MultiPolygon(result2) {
      for (var r = 0; r < result2.length; r++) {
        for (var e = 0; e < result2[r].length; e++) {
          var polygonPath = [];
          for (var b = 0; b < result2[r][e].length; b++) {
            if (result2[r][e][b].length === 2) {
              polygonPath.push(
                new kakao.maps.LatLng(result2[r][e][b][1], result2[r][e][b][0])
              );
            } else {
              for (var w = 0; w < result2[r][e][b].length; w++) {
                polygonPath.push(
                  new kakao.maps.LatLng(
                    result2[r][e][b][w][1],
                    result2[r][e][b][w][0]
                  )
                );
              }
            }
          }
          Displayarea(polygonPath, result2_name[r], Object.values(Opacity2)[r]);
        }
      }
    }

    // 콘솔

    Dong_Polygon(result1);
    Dong_MultiPolygon(result2);

    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    // 마커 변수

    var DBeauty_data = DBeauty;
    var PetHotel_data = PetHotel;
    var PetCafe_data = PetCafe;
    var AniHos_data = AniHos;
    // var PetTaxi_data = PetTaxi
    var park_data = park;
    // var Hos24_data = Hos24

    var markerPosition = [
      DBeauty_data,
      PetHotel_data,
      PetCafe_data,
      AniHos_data, // PetTaxi_data,
      park_data,
      //Hos24_data
    ];

    // console.log(markerPosition.length);
    // console.log(markerPosition[0].lat[0]);
    // console.log(PetCafe_data.lat[0]);
    // console.log(Object.keys(DBeauty_data.lat).length);
    // console.log(Object.keys(PetHotel_data.lat).length);
    // console.log(Object.keys(PetCafe_data.lat).length);
    // console.log(Object.values(PetCafe_data.lat)[1]);
    // console.log(Object.values(PetCafe_data.lat));
    // console.log(Object.keys(AniHos_data.lat).length);
    // console.log(Object.keys(PetTaxi_data.lat).length);
    // console.log(park_data.lat[0])
    // console.log(Hos24_data.lat)
    // console.log(DBeauty_data.title[0])
    // console.log(PetHotel_data.title[0])
    // console.log(PetCafe_data.title[0])
    // console.log(PetTaxi_data.title[0])
    // console.log(AniHos_data.title[0])
    // console.log(park_data.title[0])

    // console.log('>>>>' + DBeauty_data.Industry_name[0])
    // console.log(PetHotel_data.Industry_name[0])
    // console.log(PetCafe_data.Industry_name[0])
    // console.log(PetTaxi_data.Industry_name[0])
    // console.log(AniHos_data.Industry_name[0])
    // console.log(park_data.Industry_name[0])
    // console.log(park_data.size[0])

    // 마커 이미지 개별적으로 주기
    // var check_point = 0

    // for (var t = 0; t < markerPosition.length; t++) {
    //   for (
    //     var value = 0;
    //     value < Object.keys(markerPosition[t].lat).length;
    //     value++
    //   ) {
    //     var result = new kakao.maps.LatLng(
    //       markerPosition[t].lat[value],
    //       markerPosition[t].lng[value]
    //     );
    //     addmarkers(
    //       result,
    //       markerPosition[t].title[value],
    //       markerPosition[t].Industry_name[value]
    //     );
    //     // if (markerPosition[t] === park_data) {
    //     //   if (markerPosition[t].size[value] >= 9000000) {
    //     //     pointcount = 4
    //     //   } else if (markerPosition[t].size[value] >= 2400) {
    //     //     pointcount = 3
    //     //   } else if (markerPosition[t].size[value] >= 1183) {
    //     //     pointcount = 2
    //     //   } else if (markerPosition[t].size[value] >= 766) {
    //     //     pointcount = 1
    //     //   }
    //     // }
    //   }
    // }

    //// 마커 함수

    // 마커 생성
    // function addmarkers(value, title, Industry_name) {
    //   var marker = new kakao.maps.Marker({
    //     position: value,
    //   });

    //   var content =
    //     '<div class="wrap">' +
    //     '    <div class="info">' +
    //     '        <div class="title">' +
    //     title +
    //     "           </div>" +
    //     '        <div class="Industry name">' +
    //     Industry_name +
    //     "           </div>" +
    //     "    </div>" +
    //     "</div>";

    //   kakao.maps.event.addListener(marker, "click", function () {
    //     infowindow.setContent(content);
    //     infowindow.open(map, marker);
    //   });

    //   zoomchangemarker(marker);
    // }

    // 줌 레벨 변동 시 오브젝트 표시 유무 함수
    function zoomchangemarker(value) {
      // 지도가 확대 또는 축소되면 마지막 파라미터로 넘어온 함수를 호출하도록 이벤트를 등록합니다
      kakao.maps.event.addListener(map, "zoom_changed", function () {
        // 지도의 현재 레벨을 얻어옵니다
        var level = map.getLevel();

        if (level < 9) {
          value.setMap(map);
        } else {
          value.setMap(null);
          infowindow.close();
        }
      });

      kakao.maps.event.addListener(map, "rightclick", function () {
        value.setMap(null);
      });
    }

    // // 지도 이동
    // // 이동할 위도 경도 위치를 생성합니다
    // var moveLatLon = new kakao.maps.LatLng(37.566835464099945, 126.97864659608003);
    // function setCenter() {
    //   // 지도 중심을 이동 시킵니다
    //   map.setCenter(moveLatLon);
    // }

    //// 콘솔

    // console.log(markerPosition[0])
    // console.log(markerPosition.length)
    // console.log(count)
  }, []);

  return <div id="map"></div>;
};

export default Location;
