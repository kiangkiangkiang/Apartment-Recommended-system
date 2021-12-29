const areaNumber = 5;
var currentArea = 1;
var allArea = []; //所有上班地點
var alltransWay = []; //所有交通方式
var alltransTime = []; //所有到達時間
var allPage = ['profile', 'messages', "home", 'doner'];
var currentPage = 1;
var currentLine = 20;
var allpoint = 0;
var correctpoint = 0;
var isGeocodeOK = false;
var isInTwoCity = true;
var number;


function add() {
    //alert(document.getElementById("area1").value == "");
    if (currentArea == 5) {
        return;
    }
    if (document.getElementById("area" + currentArea).value == "") {
        alert("地址尚未輸入");
        return;
    } else {
        currentArea++;
        document.getElementById("area_div" + currentArea).style.display = "table";
    }
}

function Delete(index) {
    for (var i = 1; i <= currentArea; i++) {
        if (document.getElementById("area" + i).value != "") {
            allArea.push(document.getElementById("area" + i).value);
        }
    }

    allArea.splice(index - 1, 1);

    for (var i = 1; i <= currentArea; i++) {
        document.getElementById("area" + i).value = "";
        document.getElementById("area_div" + i).style.display = "none";
    }

    for (var i = 1; i <= allArea.length; i++) {
        document.getElementById("area" + i).value = allArea[i - 1];
    }
    if (currentArea > 1)
        currentArea--;
    else {}
    for (var i = 1; i <= currentArea; i++) {
        document.getElementById("area_div" + i).style.display = "table";
    }
    allArea = [];

}

function next() {
    if (currentPage >= 4) {
        return;
    } else if (currentPage == 1) {
        if (!isGeocodeOK) {
            if (checkPage1()) {
                console.log("123");
                document.getElementsByTagName("a")[6].setAttribute("href", "#temp");

            } else {
                alert("請輸入上班地點");

                return;
            }
        } else {
            isGeocodeOK = false;
        }

    } else if (currentPage == 2) {
        for(i=1 ;i<=number;i++){
            if (document.getElementById("transWay" + i).value == "none")
            {
                alert("請選擇交通工具");
                return;
            }
        }
        lineMoveNext(true);
        document.getElementsByTagName("a")[6].setAttribute("href", "#" + allPage[currentPage]);
        document.getElementsByTagName("li")[currentPage - 1].setAttribute("class", "");

        currentPage++;

        showPage3();
        document.getElementsByTagName("li")[currentPage - 1].setAttribute("class", "active");

    } else if (currentPage == 3) {
        if (checkPage3()) {
            lineMoveNext(true);
            document.getElementsByTagName("a")[6].setAttribute("href", "#" + allPage[currentPage]);
            document.getElementsByTagName("li")[currentPage - 1].setAttribute("class", "");
            currentPage++;
            document.getElementsByTagName("li")[currentPage - 1].setAttribute("class", "active");
        } else {
            alert("請輸入可接受的通勤時間");

            return;
        }


    } else {
        document.getElementsByTagName("a")[6].setAttribute("href", "#" + allPage[currentPage]);
        document.getElementsByTagName("li")[currentPage - 1].setAttribute("class", "");
        currentPage++;

        document.getElementsByTagName("li")[currentPage - 1].setAttribute("class", "active");
    }
    if (currentPage == 4) {
        document.getElementById("next_btn").style.display = "none";
        document.getElementById("back_btn").style.display = "none";
        allArea = [];
        for (var i = 1; i <= currentArea; i++) {
            if (document.getElementById("area" + i).value != "") {
                allArea.push(document.getElementById("area" + i).value);
            }
            alltransWay.push($('#transWay' + i + ' option:selected').val());
            alltransTime.push($("#timeInput" + i).val());
        }



    }

    //console.log(document.getElementsByTagName("a")[5]);

}

function back() {
    if (currentPage <= 1) {
        return;
    }
    if (currentPage == 2) {
        reset2();
    }
    if (currentPage == 3) {
        reset3();
    }
    lineMoveBack();
    document.getElementsByTagName("li")[currentPage - 1].setAttribute("class", "");
    currentPage--;
    document.getElementsByTagName("li")[currentPage - 1].setAttribute("class", "active");
    document.getElementsByTagName("a")[5].setAttribute("href", "#" + allPage[currentPage - 1]);
    document.getElementsByTagName("a")[6].setAttribute("href", "#" + allPage[currentPage - 1]);


    //console.log(document.getElementsByTagName("a")[5]);

}



function checkPage3() {
    var number = 0;
    var isOK = true;
    for (var i = 1; i <= currentArea; i++) {
        if (document.getElementById("area" + i).value != "") {
            number++;
        }
    }
    for (var i = 1; i <= number; i++) {
        if (document.getElementById("timeInput" + i).value == "") {
            isOK = false;
        }
    }
    return isOK;
}

function showPage2() {
    number = 0;
    var tempArea = [];
    for (var i = 1; i <= currentArea; i++) {
        if (document.getElementById("area" + i).value != "") {
            number++;
            tempArea.push(document.getElementById("area" + i).value);
        }
    }
    for (var i = 1; i <= number; i++) {
        document.getElementById("trans" + i).style.display = "block";
        document.getElementById("areaLabel" + i).innerHTML = "地點" + i + "：" + tempArea[i - 1] + "，所使用交通工具：";
    }

}


function showPage3() {

    var number = 0;
    var tempArea = [];
    for (var i = 1; i <= currentArea; i++) {
        if (document.getElementById("area" + i).value != "") {
            number++;
            tempArea.push(document.getElementById("area" + i).value);
        }
    }

    for (var i = 1; i <= number; i++) {
        document.getElementById("time" + i).style.display = "block";
        document.getElementById("timeLabel" + i).innerHTML = "地點" + i + "：" + tempArea[i - 1] + "，所使用交通工具：" + $('#transWay' + i + ' option:selected').text();
    }
}

function reset2() {
    for (var i = 1; i <= 5; i++) {
        document.getElementById("trans" + i).style.display = "none";
    }
}

function reset3() {
    for (var i = 1; i <= 5; i++) {
        document.getElementById("time" + i).style.display = "none";
    }
}

function lineMoveNext(isfilldata) {
    //$(".liner").animate({ background: "linear - gradient(to right, #555555 100%, #fff 0%)" });
    //alert("123");
    //document.getElementById("line").style.background = "linear-gradient(to right, #555555 100%, #fff 0%)";
    var Kprogress = 1;
    var Interval = setInterval(function() {
        console.log("currentPage = " + currentPage);
        document.getElementById("line").style.background = "linear-gradient(to right, #555555 " + currentLine + "%, #fff 0%)";
        currentLine++;
        if (isfilldata) {
            if (currentPage == 2) {
                if (currentLine >= 25) {
                    document.getElementById("s2").style.border = "2px solid rgb(121, 93, 18)";
                    clearInterval(Interval);
                }
            } else if (currentPage == 3) {
                if (currentLine >= 50) {
                    document.getElementById("s3").style.border = "2px solid rgb(121, 93, 18)";
                    clearInterval(Interval);
                }
            } else if (currentPage == 4) {
                if (currentLine >= 70) {
                    document.getElementById("s4").style.border = "2px solid rgb(121, 93, 18)";
                    clearInterval(Interval);
                }
            } else if (currentPage == 5) {
                if (currentLine >= 90) {
                    document.getElementById("s5").style.border = "2px solid rgb(121, 93, 18)";
                    clearInterval(Interval);
                }
            }
        } else {
            Kprogress++;
            if (Kprogress == 4) {
                clearInterval(Interval);
            }
        }

    }, 20);


}

function lineMoveBack() {
    var Interval = setInterval(function() {
        //console.log("currentLine = " + currentLine);
        //console.log("currentPage = " + currentPage);
        document.getElementById("line").style.background = "linear-gradient(to right, #555555 " + currentLine + "%, #fff 0%)";
        currentLine--;
        if (currentPage == 1) {
            document.getElementById("s2").style.border = "2px solid #ddd";
            if (currentLine <= 5) {
                clearInterval(Interval);
            }
        } else if (currentPage == 2) {
            document.getElementById("s3").style.border = "2px solid #ddd";
            if (currentLine <= 25) {
                clearInterval(Interval);
            }
        } else if (currentPage == 3) {
            document.getElementById("s4").style.border = "2px solid #ddd";
            if (currentLine <= 50) {
                clearInterval(Interval);
            }
        }
    }, 10);
}


function checkPage1() {
    isInTwoCity = true;
    isOK = false;
    allpoint = 0;
    correctpoint = 0;
    for (var i = 1; i <= currentArea; i++) {
        if (document.getElementById("area" + i).value != "") {
            allpoint++;
            checkGeocode(document.getElementById("area" + i).value);
            isOK = true;
        }
    }
    return isOK;
}


function checkGeocode(address) {

    geocoder.geocode({
        address: address
    }, function(results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
            console.log(results[0].formatted_address + "  " + address);
            correctpoint++;
            var test1 = results[0].formatted_address.match("台北市") != null;
            var test2 = results[0].formatted_address.match("臺北市") != null;
            var test3 = results[0].formatted_address.match("新北市") != null;
            if (!(test1 || test2 || test3)) {
                isInTwoCity = false;
                if (address == "陽明山") {
                    isInTwoCity = true;
                }
            }

            if (correctpoint == allpoint) {
                if (isInTwoCity) {

                    isGeocodeOK = true;
                    lineMoveNext(true);
                    document.getElementsByTagName("a")[6].setAttribute("href", "#" + allPage[currentPage]);

                    document.getElementById("next_btn").click();
                    document.getElementsByTagName("li")[currentPage - 1].setAttribute("class", "");
                    currentPage++;
                    showPage2();
                    //console.log(document.getElementsByTagName("li")[currentPage - 1]);
                    document.getElementsByTagName("li")[currentPage - 1].setAttribute("class", "active");

                } else {
                    alert("請確認輸入地點是否在雙北");

                }
            }


        } else {
            console.log("fail = " + status);
            alert("請詳細輸入通勤地點");

        }
    });
}

function setButtonDisabled(bool) {
    /*if (bool) {
        document.getElementsByTagName("a")[5].addEventListener("click", function() {
            return false;
        });
        document.getElementsByTagName("a")[5].addEventListener("click", function() {
            return false;
        });
    } else {
        document.getElementsByTagName("a")[5].addEventListener("click", function() {
            return true;
        });
        document.getElementsByTagName("a")[6].addEventListener("click", function() {
            return true;
        });
    }*/
}