var map;
var totalArea = 0;
var inputArray = [];
var timelimit = [];
var toolchoose = [];
var outputArray = []; //應該是裝marker
var currentAdd = 0;
var distance = [];
var centerlat = 0;
var centerlng = 0;
var thecenter;
var geocoder = new google.maps.Geocoder();
var totaldistance = 0;
const r = 2200; //半徑(找中心點圓,和算中心點附近的房屋有關)
var nearbyHouse = []; //在中心點附近的房子
/****最後物件產生 */
var currentObj = 1;
var nearbyIcon = 'data/free icon/placeholder1.png'
var focusIcon = 'data/free icon/placeholder2 .png'
var nearbyMarker = [];
var tempfocus = -1;
var radarData = [-1, -1, -1, -1, -1];
var firstTime = true;
/**第三點新增 */
var mostNearby = []; //最近的十個點(放距離)
var mostNearbyMarker = []; //最近的十個點(放marker)
var mostNearbyHouse = []; //放物件
var canGenerate = true;
var Radar;


function changePage() {
    document.getElementsByTagName("body")[0].style.backgroundImage = "url('data/htmlbackground/t1.jpg')";
    document.getElementById("p1").style.display = "none";
    document.getElementById("p2title").style.display = "block";
    document.getElementById("p2").style.display = "block";

    //initial 
    for (var i = 0; i < totalArea; i++) {
        outputArray.push(0);
    }
    totalArea = allArea.length;
    inputArray = allArea;
    timelimit = alltransTime;
    toolchoose = alltransWay;
    //console.log("inputArray=" + inputArray);
    for (var i = 0; i < totalArea; i++) {
        _geocoder(inputArray[i]);
    }
}


google.maps.event.addDomListener(
    window, 'load', init);

function init() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: {
            lat: 25.0339687,
            lng: 121.5622835
        },
        zoom: 11.5
    });

}

/** 地理座標轉檔*/
function _geocoder(address) {
    geocoder.geocode({
        address: address
    }, function(results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
            var LatLng = results[0].geometry.location;
            var n1 = new google.maps.Marker({
                position: results[0].geometry.location,
                map: map,
                visible: false //上班地點不顯示
            });
            //console.log(results[0].formatted_address + "  " + address);
            //console.log("n1 1to3 : = " + new Big(n1.position.lat()) + " , " + new Big(n1.position.lng()));
            ////關鍵程式碼 因為他是先集合所有request再一次發送 所以轉檔順序不一定按照我送的順序
            ////解決方法  直接在裡面判斷順序
            for (var i = 0; i < totalArea; i++) {
                if (address == inputArray[i]) {
                    outputArray[i] = n1;
                    //console.log("調整後到outputArray的第 " + i + " 個");
                    break;
                }
            } //邏輯上是 每次一個新的地址近來 我就先判斷他是屬於哪個input的值 然後再給相同位置(i)的output
            ////
            //outputArray.push(n1);

            currentAdd++;
            if (currentAdd == totalArea) {
                //console.log("output長度是 = " + outputArray.length);
                /*outputArray.forEach(function(e, i) {
                    //alert(e.position.lat() + "  " + e.position.lng());

                });*/
                calculateCenter(outputArray);
            }
        } else {
            alert("fail = " + status);
        }
    });
}


/**中心點 */
function calculateCenter(points) {
    //console.log("points=" + points);
    for (var j = 0; j < totalArea; j++) {
        if (toolchoose[j] == "DRIVING") {
            distance.push(timelimit[j] * 40);
        } else if (toolchoose[j] == "WALKING") {
            distance.push(timelimit[j] * 4);
        } else if (toolchoose[j] == "TRANSIT") {
            distance.push(timelimit[j] * 30);
        }
    }


    distance.forEach(function(e) {
        totaldistance = totaldistance + (1 / e);
    });
    points.forEach(function(e, i) {
        centerlat = centerlat + e.position.lat() * (1 / distance[i]);
        centerlng = centerlng + e.position.lng() * (1 / distance[i]);
    });
    thecenter = {
        lng: centerlng / totaldistance,
        lat: centerlat / totaldistance
    };
    //alert("中心點 : " + thecenter.lng + " " + thecenter.lat);
    //console.log("中心點 : " + thecenter.lng + " " + thecenter.lat);
    //console.log("error = " + "121.50531447851459 25.132245439257293");
    //121.49800392812497 25.127441821875003
    //121.45616529687497 25.040955584375
    // yes = 121.51966058466553 25.094694557422507
    //121.45870077292001 25.04490216655791
    var center = new google.maps.Marker({
        position: {
            lat: thecenter.lat,
            lng: thecenter.lng
        },
        map: map
    });
    var latLng = new google.maps.LatLng(center.position.lat(), center.position.lng());
    map.setCenter(latLng);
    setCircle(center, r);
    setHouseInCircle(center, r);
    console.log("nearbyHouse.length" + nearbyHouse.length);
    calculateCP();
    setHouseEvent();
    generateObjDiv();
}

function setCircle(point, circle_distance) {
    var circle = new google.maps.Circle({
        center: point.position,
        radius: circle_distance,
        strokeOpacity: 0,
        fillColor: '#9E6D70',
        fillOpacity: 0.35,
        map: map
    });
}

//計算距離var temp = google.maps.geometry.spherical.computeDistanceBetween( )
function setHouseInCircle(point, r) {
    houses.forEach(function(e, i) {

        //console.log(aa);

        var oldMarker = new google.maps.Marker({
            position: {
                lat: Number(e[13]),
                lng: Number(e[14])
            },
            map: map,
            visible: false,
            icon: {
                url: nearbyIcon,
                scaledSize: new google.maps.Size(30, 30)
            }
        });

        var temp = google.maps.geometry.spherical.computeDistanceBetween(
            oldMarker.position, point.position
        )

        //第三點新增
        selectMostNearby(temp, e, oldMarker);

        if (temp <= r) {
            //console.log("1");
            nearbyHouse.push(e); //在中心點附近的房子 就把它存進去
            nearbyMarker.push(oldMarker);
            oldMarker.icon.url = nearbyIcon;
        }
    });
    //google.maps.event.trigger(map, 'resize'); //refresh map
    //alert("距離=" + temp);
    //var request = preDistanceMatrix(point, house);
    //mutipleRoute(request[0], request[1]);
}

function generateObjDiv() { //產生更多物件    

    /*var a1 = '<div id="o';
    //currentObj
    var a2 = '"style="display:table">    <label style="font-size:18px">&nbsp; ';
    //currentObj
    var b = '.價錢:';
    //price
    var c = '，坪數';
    //size
    var d = '</label>&nbsp;<button  data-toggle="modal" data-target="#myModal" type="button" class="btn btn-outline-secondary" style="border: 1px solid;" onclick="detail(';
    //currentObj
    var e = ')">詳細資訊</button></div><div class="list-group-item" style="cursor: pointer;" onclick="mapDisplay(';
    //currentObj
    var f = ')"><div class="col-md-3" style="padding:0;">  <img class="img-fluid rounded mb-3 mb-md-0" src="data/image/h';
    //房屋編號
    var g = '.jpg" width="1000" height="1000"> </div> <div> <p>';
    //內部外部
    var h = '</p>    </div></div><br>'
    for (var i = 0; i < 10; i++) {
        if (currentObj > nearbyHouse.length) {
            console.log('沒物件了');
            return;
        }*/

    /*document.getElementById("ObjDisplay").innerHTML += a1 + currentObj + a2 + currentObj + b +
     nearbyHouse[rank[currentObj - 1]][2] + c + nearbyHouse[rank[currentObj - 1]][1] + d + currentObj + e +
      currentObj + f + nearbyHouse[rank[currentObj - 1]][0] + g + "內部外部ㄚㄚ" + h;*/
    var a1 = '<div id="o';
    //currentObj
    var a2 = '"style="display:table; background-color:#DEB887;height=1rem;">    ';
    //currentObj
    var a3 = '<label style="font-size:20px;font-weight:bold">&nbsp';

    var a4 = '</label>&nbsp<hr>';

    var a5 = '</div><div class="p2listdiv"><div class="list-group-item" style="cursor: pointer;" onclick="mapDisplay(';
    //currentObj
    var a6 = ')">';
    //房屋編號

    var a6_2 = '<div class="col-md-3" style="padding:0;">  <img class="img-fluid rounded mb-3 mb-md-0" src="data/image/h';
    var a7 = '.jpg" width="1000" height="100% !important"> </div> <div> <p class="list-ps">';
    var a7_2 = "<u><em style='font-weight:bold;'>";
    var yourCPrank; //放排名要顯示的東西;
    var a7_3 = "</em></u>&nbsp&nbsp&nbsp&nbsp&nbsp";
    //內部外部
    var a8 = '元/月&nbsp&nbsp&nbsp&nbsp ';
    //price
    var a9 = '坪 ';
    //size
    var t1 = '</p>';
    var a10 = '<button  data-toggle="modal" data-target="#myModal" type="button" class="btn btn-outline-secondary" style="border: 1px solid;" onclick="detail(';
    //currentObj
    var a11 = ')">詳細資訊</button>';

    var a12 = '    </div></div></div>'
    var isFirst = true;
    for (var i = 0; i < 10; i++) {
        if (currentObj > nearbyHouse.length) {
            console.log('沒物件了');
            //第三點新增
            if (nearbyHouse.length < 10 && canGenerate) {
                canGenerate = false;
                for (var u = 0, times = 0; u < 20; u++) {
                    var isDisplay = false;
                    for (var k = 0; k < nearbyHouse.length; k++) {
                        console.log(JSON.stringify(mostNearbyHouse[u]) === JSON.stringify(nearbyHouse[k]));
                        if (JSON.stringify(mostNearbyHouse[u]) === JSON.stringify(nearbyHouse[k])) {
                            isDisplay = true;
                            break;
                        }
                    }
                    if (isDisplay) {
                        continue;
                    } else {
                        var temp = u + 10000; //用來判斷是否是特殊狀況
                        if (isFirst) {
                            document.getElementById("ObjDisplay").innerHTML += a1 + currentObj + a2 + "&nbsp" + a3 + "<em>附近沒有更多房屋了，但可以參考以下房屋</em>" + a4 + a5 +
                                temp + a6 + a6_2 + mostNearbyHouse[u][0] + a7 + "&nbsp&nbsp&nbsp" +
                                mostNearbyHouse[u][2] + a8 + mostNearbyHouse[u][1] + a9 + "<br>" + "&nbsp&nbsp&nbsp" +
                                mostNearbyHouse[u][15] + t1 + a10 + temp + a11 + a12;
                            isFirst = false;
                        } else {
                            document.getElementById("ObjDisplay").innerHTML += a1 + currentObj + a2 + "&nbsp" + a5 +
                                temp + a6 + a6_2 + mostNearbyHouse[u][0] + a7 + "&nbsp&nbsp&nbsp" +
                                mostNearbyHouse[u][2] + a8 + mostNearbyHouse[u][1] + a9 + "<br>" + "&nbsp&nbsp&nbsp" +
                                mostNearbyHouse[u][15] + t1 + a10 + temp + a11 + a12;
                        }
                        mostNearbyMarker[u].setVisible(true);

                        setAllEvent(u, currentObj);
                        times++;
                        currentObj++;
                    }
                    if (times == 10) {
                        break;
                    }
                }

            }
            return;
        }
        yourCPrank = setYourCpRank(currentObj);
        document.getElementById("ObjDisplay").innerHTML += a1 + currentObj + a2 + "&nbsp" + a5 +
            currentObj + a6 + a6_2 + nearbyHouse[rank[currentObj - 1]][0] + a7 + "&nbsp&nbsp&nbsp" + a7_2 + yourCPrank + a7_3 +
            nearbyHouse[rank[currentObj - 1]][2] + a8 + nearbyHouse[rank[currentObj - 1]][1] + a9 + "<br>" + "&nbsp&nbsp&nbsp" +
            nearbyHouse[rank[currentObj - 1]][15] + t1 + a10 + currentObj + a11 + a12;

        nearbyMarker[rank[currentObj - 1]].setVisible(true);
        //nearbyMarker[rank[currentObj - 1]].visible = true;
        currentObj++;
    }
}

function setYourCpRank(obj) {

    if (obj <= 10) {
        switch (obj) {
            case 1:
                return "CP冠軍";
            case 2:
                return "CP亞軍";
            case 3:
                return "CP季軍";
            default:
                return "高CP房屋";
        }
    } else {
        return "CP值第" + obj + "名";
    }

}

function mapDisplay(index) { //在地圖上顯示物件   
    if (tempfocus != -1) {
        tempfocus.icon.url = nearbyIcon;
    }
    //第三點新增
    if (index <= 10000) {
        map.setCenter(new google.maps.LatLng(nearbyHouse[rank[index - 1]][13], nearbyHouse[rank[index - 1]][14]));
        nearbyMarker[rank[index - 1]].icon.url = focusIcon;
        tempfocus = nearbyMarker[rank[index - 1]];
    } else {
        index = index - 10000;
        map.setCenter(new google.maps.LatLng(mostNearbyHouse[index][13], mostNearbyHouse[index][14]));
        mostNearbyMarker[index].icon.url = focusIcon;
        tempfocus = mostNearbyMarker[index];
    }
}

function detail(index) {
    $.ajax({
        type: "POST",
        url: "./php/sqlfurniture.php",
        data: {
            house1num: nearbyHouse[rank[index - 1]][0],
        },
        success: function(furnituredata) {

            furnituredata = JSON.parse(furnituredata);
            furnituredata = turnToArray(furnituredata);
            console.log(furnituredata);
            furniturecheck(furnituredata);
        },
        error: function(jqXHR) {
            alert("發生錯誤 當前狀態: " + jqXHR.readyState + "  狀態代碼" + jqXHR.status +
                "  伺服器回應:" + jqXHR.responseText);
        }
    });

    //第三點新增
    if (index < 10000) {
        console.log(nearbyHouse);
        document.getElementById("focusImage").src = "data/image/h" + nearbyHouse[rank[index - 1]][0] + ".jpg";
        document.getElementById("modalps").innerHTML = "$" + nearbyHouse[rank[index - 1]][2] + "/月&nbsp;&nbsp;，&nbsp;&nbsp;" + nearbyHouse[rank[index - 1]][1] + "坪";
        document.getElementById("modAddress").innerHTML = nearbyHouse[rank[index - 1]][15];
        for (var i = var_start; i <= var_end - 1; i++) {
            //怕超過20 全距太大很醜
            if (Math.pow(nearbyHouse[rank[index - 1]][i], weight[i - var_start]) > 20) {
                radarData[i - var_start] = 20;
            } else {
                radarData[i - var_start] = Math.pow(nearbyHouse[rank[index - 1]][i], weight[i - var_start]);
            }
        }
        //調整價格

        var tempPrice = 7 - nearbyHouse[rank[index - 1]][price];
        if (tempPrice < 0) { //價錢太高
            radarData[4] = 0;
        } else {
            if (Math.pow(tempPrice, weight[4]) > 20) {
                radarData[4] = 20;
            } else {
                radarData[4] = Math.pow(tempPrice, weight[4]);
            }
        }
        RadarChart();
    } else {
        index = index - 10000;
        document.getElementById("focusImage").src = "data/image/h" + mostNearbyHouse[index][0] + ".jpg";
        document.getElementById("modalps").innerHTML = "$" + mostNearbyHouse[index][2] + "/月&nbsp;&nbsp;，&nbsp;&nbsp;" + mostNearbyHouse[index][1] + "坪";
        for (var i = var_start; i <= var_end - 1; i++) {
            //怕超過20 全距太大很醜
            if (Math.pow(mostNearbyHouse[index][i], weight[i - var_start]) > 20) {
                radarData[i - var_start] = 20;
            } else {
                radarData[i - var_start] = Math.pow(mostNearbyHouse[index][i], weight[i - var_start]);
            }
        }
        //調整價格
        var tempPrice = 7 - mostNearbyHouse[index][price];
        if (tempPrice < 0) { //價錢太高
            radarData[4] = 0;
        } else {
            if (Math.pow(tempPrice, weight[4]) > 20) {
                radarData[4] = 20;
            } else {
                radarData[4] = Math.pow(tempPrice, weight[4]);
            }
        }
        RadarChart();
    }
    firstTime = false;
}

function calculateCP() {
    for (var i = 0; i < nearbyHouse.length; i++) {
        var tempSum = 0;
        for (var j = var_start; j <= var_end - 1; j++) {
            tempSum += Math.pow(nearbyHouse[i][j], weight[j - var_start]);
        }
        tempRank.push([i, tempSum / Math.pow(nearbyHouse[i][price], weight[price - var_start])]);

    }
    tempRank.sort(function(x, y) {
        return y[1] - x[1];
    });
    tempRank.forEach(function(element) {
        rank.push(element[0]);
    });
    console.log(rank);
}

function setHouseEvent() {

    rank.forEach(function(e, i) {
        nearbyMarker[e].addListener('click', function() {
            var temp = i + 1;
            document.getElementById("o" + temp).scrollIntoView();
        });
    });

}




function RadarChart() {
    var ctx_Radar = document.getElementById('radarChart').getContext('2d');

    if (Radar) {
        var temp1 = document.getElementById('radarChart').width;
        var temp2 = document.getElementById('radarChart').height;
        Radar.destroy();
        document.getElementById('radarChart').width = temp1;
        document.getElementById('radarChart').height = temp2;
    }
    Radar = new Chart(ctx_Radar, {
        type: 'radar',
        data: {
            labels: ["家具設備", "地理環境", "坪數", "美觀", "價格"],
            datasets: [{
                label: '整體分數',
                data: radarData,
                backgroundColor: "rgba(255, 99, 132, 0.2)",
            }]
        },
        options: {
            scale: {
                ticks: {
                    beginAtZero: true,
                    min: 0,
                    max: 20,
                    stepSize: 4
                }
            }
        }

    });
}

//第三點新增
function selectMostNearby(dist, obj, marker) {
    var howManyWin = 0;
    for (var i = mostNearby.length - 1; i >= 0; i--) {
        if (dist < mostNearby[i]) {
            howManyWin++;
        } else {
            break;
        }
    }
    mostNearby.splice(mostNearby.length - howManyWin, 0, dist); //假設5個 我比三個還好 就是排在第二個後面 
    mostNearbyHouse.splice(mostNearbyHouse.length - howManyWin, 0, obj);
    mostNearbyMarker.splice(mostNearbyMarker.length - howManyWin, 0, marker);
    if (mostNearby.length > 20) {
        mostNearby.pop();
        mostNearbyHouse.pop();
        mostNearbyMarker.pop();
    }
}

function setAllEvent(houseIndex, divIndex) {
    mostNearbyMarker[houseIndex].addListener('click', function() {
        document.getElementById("o" + divIndex).scrollIntoView();
    });

}

function removeData(chart) {
    chart.data.labels.pop();
    chart.data.datasets.forEach((dataset) => {
        dataset.data.pop();
    });
    chart.update();
}