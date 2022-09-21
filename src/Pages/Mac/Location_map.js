/*global kakao */

import React, { useCallback, useEffect, useState } from "react";
import coordinates from "../../Components/resoureces/bessel.json";
import { Button } from "react-bootstrap";
import point from "../../Components/resoureces/seoulcount.json";

const Location_map = () => {
  const [, updateState] = useState();
  const forceUpdate = useCallback(() => updateState({}), []);
  const [checked, setChecked] = useState(true);

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

    // 일반 지도와 스카이뷰로 지도 타입을 전환할 수 있는 지도타입 컨트롤을 생성합니다
    var mapTypeControl = new kakao.maps.MapTypeControl();

    // 지도에 컨트롤을 추가해야 지도위에 표시됩니다
    // kakao.maps.ControlPosition은 컨트롤이 표시될 위치를 정의하는데 TOPRIGHT는 오른쪽 위를 의미합니다
    map.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPRIGHT);

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
    // 동 : 점수
    var Opacity1 = [];
    var Opacity2 = [];
    // 공항 소음 대책 지역
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

    // 동 데이터 분배
    for (var coordi = 0; coordi < json_data.length; coordi++) {
      // 3차원 배열 == result1, 4차원 배열 == reuslt2 분배 할 기준 == (["geometry"]["coordinates"].length === 1)
      if (json_data[coordi]["geometry"]["coordinates"].length === 1) {
        result1.push(json_data[coordi]["geometry"]["coordinates"]);
        result1_name.push(json_data[coordi]["properties"]["EMD_NM"]);
        // 신정1동 == 신정동 중복으로 인해 점수가 안들어감
        if (coordi === 374) {
          Opacity1["신정1동"] = 0.1;
        }
        Opacity1[json_data[coordi]["properties"]["EMD_NM"]] = 0.1;
      } else {
        result2.push(json_data[coordi]["geometry"]["coordinates"]);
        result2_name.push(json_data[coordi]["properties"]["EMD_NM"]);
        Opacity2[json_data[coordi]["properties"]["EMD_NM"]] = 0.1;
      }
    }

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

    // 공항 소음 대책 지역 점수 함수
    function Airportsite_minus(array, Airportsite) {
      for (var a = 0; a < Object.keys(array).length; a++) {
        if (Airportsite.indexOf(Object.keys(array)[a]) !== -1) {
          array[Object.keys(array)[a]] -= 1;
        }
      }
    }

    // 점수 Opacity1,2 에 넣어주는 코드 (동 : 점수)
    for (var k = 0; k < Object.values(point_data.법정동).length; k++) {
      pointcounting(Opacity1, k);
      pointcounting(Opacity2, k);
    }

    // 공항 함수 실행 코드
    Airportsite_minus(Opacity1, Airportsite);
    Airportsite_minus(Opacity2, Airportsite);

    var Opacity1_max = 0;
    var Opacity2_max = 0;

    // Opacity의 max 값을 구하는 코드
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

    // 0~1 변환 함수 실행
    Pointchange(Opacity1, Maxresult);
    Pointchange(Opacity2, Maxresult);

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

    // 3차원 배열
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

    // 4차원 배열
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

    // 함수 실행
    Dong_Polygon(result1);
    Dong_MultiPolygon(result2);

    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    // 마커 변수
    // 마커 데이터 백엔드 동기화
    fetch("http://172.27.0.1:8000/infra/hospital/")
      .then(function (response) {
        return response.json();
      })
      .then(function (AniHos) {
        SetmarkersInfra(AniHos);
      });

    fetch("http://172.27.0.1:8000/infra/beauty/")
      .then(function (response) {
        return response.json();
      })
      .then(function (beauty) {
        SetmarkersInfra(beauty);
      });
    fetch("http://172.27.0.1:8000/infra/cafe/")
      .then(function (response) {
        return response.json();
      })
      .then(function (cafe) {
        SetmarkersInfra(cafe);
      });
    fetch("http://172.27.0.1:8000/infra/hotel/")
      .then(function (response) {
        return response.json();
      })
      .then(function (hotel) {
        SetmarkersInfra(hotel);
      });
    // PARK DATA SETTING

    fetch("http://172.27.0.1:8000/park/")
      .then(function (response) {
        return response.json();
      })
      .then(function (park) {
        SetmarkersPark(park);
      });

    // EMHOSPITAL DATA SETTING
    fetch("http://172.27.0.1:8000/emhospital/")
      .then(function (response) {
        return response.json();
      })
      .then(function (emhospital) {
        SetmarkersEMHOS(emhospital);
      });

    // 마커이미지의 주소와, 크기, 옵션으로 마커 이미지를 생성하여 리턴하는 함수입니다
    function createMarkerImage(src, size, options) {
      var markerImage = new kakao.maps.MarkerImage(src, size, options);
      return markerImage;
    }

    var imageSize = new kakao.maps.Size(40, 40);

    var imageOptions = { offset: new kakao.maps.Point(27, 69) };

    // 마커이미지와 마커를 생성합니다
    var ImageAniHos = "https://cdn-icons-png.flaticon.com/512/3448/3448442.png";
    var Imagebeauty = "https://cdn-icons-png.flaticon.com/512/7979/7979049.png";
    var Imagehotel = "https://cdn-icons-png.flaticon.com/512/4564/4564846.png";
    var Imagepark = "https://cdn-icons-png.flaticon.com/512/6546/6546842.png";
    var Imageemhospital =
      "https://cdn-icons-png.flaticon.com/512/3448/3448422.png";
    var Imagecafe = "https://cdn-icons-png.flaticon.com/512/7906/7906626.png";

    // 마커 생성 실행
    function SetmarkersEMHOS(array) {
      for (var num = 0; num < array.length; num++) {
        var value = new kakao.maps.LatLng(
          array[num]["Latitude"],
          array[num]["Longitude"]
        );
        addmarkers(
          value,
          array[num]["HosName"],
          "24시간 동물병원",
          createMarkerImage(Imageemhospital, imageSize, imageOptions)
        );
      }
    }
    function SetmarkersInfra(array) {
      for (var num = 0; num < array.length; num++) {
        var value = new kakao.maps.LatLng(
          array[num]["Latitude"],
          array[num]["Longitude"]
        );
        if (array[num]["InfraWork"] === "애견미용") {
          addmarkers(
            value,
            array[num]["InfraName"],
            array[num]["InfraWork"],
            createMarkerImage(Imagebeauty, imageSize, imageOptions)
          );
        } else if (array[num]["InfraWork"] === "동물병원") {
          addmarkers(
            value,
            array[num]["InfraName"],
            array[num]["InfraWork"],
            createMarkerImage(ImageAniHos, imageSize, imageOptions)
          );
        } else if (array[num]["InfraWork"] === "펫호텔") {
          addmarkers(
            value,
            array[num]["InfraName"],
            array[num]["InfraWork"],
            createMarkerImage(Imagehotel, imageSize, imageOptions)
          );
        } else if (array[num]["InfraWork"] === "펫카페") {
          addmarkers(
            value,
            array[num]["InfraName"],
            array[num]["InfraWork"],
            createMarkerImage(Imagecafe, imageSize, imageOptions)
          );
        }
      }
    }

    function SetmarkersPark(array) {
      for (var num = 0; num < array.length; num++) {
        var value = new kakao.maps.LatLng(
          array[num]["Latitude"],
          array[num]["Longitude"]
        );
        addmarkers(
          value,
          array[num]["ParkName"],
          array[num]["ParkType"],
          createMarkerImage(Imagepark, imageSize, imageOptions)
        );
      }
    }

    //// 마커 함수

    // // 맵 더블클릭 시 마커 생성
    // function Resetmarkers(array) {
    //   kakao.maps.event.addListener(map, "dblclick", function () {
    //     array.setMap(map);
    //   });
    // }

    // 마커 생성
    function addmarkers(value, title, Industry_name, markerimage) {
      var marker = new kakao.maps.Marker({
        position: value,
        image: markerimage,
      });

      // 마커 정보 생성
      var content =
        '<div class="wrap">' +
        '    <div class="info">' +
        '        <div class="title">' +
        title +
        "           </div>" +
        '        <div class="Industry name">' +
        Industry_name +
        "           </div>" +
        "    </div>" +
        "</div>";

      kakao.maps.event.addListener(marker, "click", function () {
        infowindow.setContent(content);
        infowindow.open(map, marker);
      });

      // Resetmarkers(marker);
      zoomchangemarker(marker);
    }

    // 줌 레벨 변동 시 오브젝트 표시 유무 함수
    function zoomchangemarker(value) {
      // 지도가 확대 또는 축소되면 마지막 파라미터로 넘어온 함수를 호출하도록 이벤트를 등록합니다
      kakao.maps.event.addListener(map, "zoom_changed", function () {
        // 지도의 현재 레벨을 얻어옵니다
        var level = map.getLevel();

        // console.log(level)

        if (level < 9) {
          value.setMap(map);
        } else {
          value.setMap(null);
          infowindow.close();
        }
      });

      // kakao.maps.event.addListener(map, "rightclick", function () {
      //   value.setMap(null);
      // });
    }
  }, []);

  return (
    <div>
      <section className="internal-page-wrapper top-100 bottom-100">
        <div className="container-xxl">
          <div className="row h-100 align-items-center justify-content-center text-center">
            <div className="col-12">
              <div className="pet_convience">
                <div>
                  <Button
                    size="sm"
                    name="hospital"
                    width="100px"
                    onClick={() => {
                      checked === true ? setChecked(false) : setChecked(true);
                    }}
                    value={checked}
                  >
                    동물병원
                  </Button>
                  &nbsp;&nbsp;&nbsp;&nbsp;
                  <Button
                    size="sm"
                    name="park"
                    width="100px"
                    // onClick={Park_handleClick()}
                  >
                    공원
                  </Button>
                  &nbsp;&nbsp;&nbsp;&nbsp;
                  <Button
                    size="sm"
                    name="beauty"
                    // onClick={}
                  >
                    애견미용
                  </Button>
                  &nbsp;&nbsp;&nbsp;&nbsp;
                  <Button size="sm" name="taxi">
                    펫 택시
                  </Button>
                  &nbsp;&nbsp;&nbsp;&nbsp;
                  <Button size="sm" name="hotel">
                    펫 호텔
                  </Button>
                  &nbsp;&nbsp;&nbsp;&nbsp;
                  <Button size="sm" name="cafe">
                    애견카페
                  </Button>
                  &nbsp;&nbsp;&nbsp;&nbsp;
                  <Button size="sm" name="24h">
                    24시간 동물병원
                  </Button>
                  &nbsp;&nbsp;&nbsp;&nbsp;
                  <Button size="sm" onClick={forceUpdate}></Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div id="map" className="container-fluid"></div>
    </div>
  );
};

export default Location_map;
