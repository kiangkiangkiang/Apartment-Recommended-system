/**系統預設條件 */
var TIMES = 5;
var currentTIMES = 0;

/**演算法部分 */
var weight = [1, 1, 1, 1, 1]; //分別代表 內部,外部,評述,圖片,價格
var clickTimes = [0, 0, 0, 0, 0];
var tempRank = [];
var rank = [];


//1.房屋編號 2.坪數 3.價格 4.標準化內部 5.標準化外部6.標準化坪數7.標準化圖片8.標準化價格 9.百分比內部10.百分比外部11.百分比坪數12.百分比圖片13.百分比價格14.緯度15.經度16.地址
/**和kmeans相關變數 */
var houses = [];
var temphouses = [];
/*var houses = [
    [2387, 20, 28000, 1.10390779, 3.443172451, 7.32268956, 4.177964091, 6.773237793, 0.138561686, 0.353583773, 0.372970601, 0.527559699, 0.712643678, 25.00387049, 121.4552172],
    [2988, 12, 25000, 3.819592105, 3.915855268, 5.153080146, 5.222614915, 6.296759594, 0.479432366, 0.429577953, 0.197455024, 0.683554138, 0.747126437, 25.0166475, 121.4692605],
    [2775, 9.5, 22000, 4.717936963, 4.025908074, 4.475077205, 4.753001242, 5.820281394, 0.592191946, 0.447271367, 0.142606406, 0.613428198, 0.781609195, 24.98610449, 121.5122275],
    [2358, 11, 18000, 4.31033526, 3.288822415, 4.88187897, 4.370190796, 5.184977128, 0.541030082, 0.328768603, 0.175515577, 0.556264311, 0.827586207, 25.147989, 121.4011958],
    [2805, 7, 12000, 3.913524868, 2.996189672, 3.797074263, 3.576639528, 4.232020729, 0.491222737, 0.28172144, 0.087757789, 0.437765783, 0.896551724, 24.97785959, 121.4078832],
    [2331, 7, 12000, 4.625380647, 3.328182197, 3.797074263, 2.551704264, 4.232020729, 0.580574346, 0.335096555, 0.087757789, 0.284715407, 0.896551724, 24.94018707, 121.3773417],
    [20, 5, 8000, 2.187726192, 4.27742397, 3.254671909, 2.866057906, 3.596716463, 0.274601768, 0.48770809, 0.043878894, 0.331656853, 0.942528736, 25.0198957, 121.420521],
    [243, 12.16, 9500, 2.691726326, 3.257782687, 5.196472335, 2.605922053, 3.834955562, 0.33786349, 0.323778282, 0.200965336, 0.29281158, 0.925287356, 25.02410641, 121.423554],
    [850, 6.54, 12000, 4.133716075, 3.986602159, 3.672321722, 3.722041779, 4.232020729, 0.518860973, 0.440952075, 0.077665643, 0.459478247, 0.896551724, 25.0110225, 121.4734253],
    [2602, 8, 12500, 4.781473189, 3.251300114, 4.06827544, 4.029002087, 4.311433762, 0.600166966, 0.322736066, 0.109697236, 0.505315669, 0.890804598, 24.9958791, 121.5112176],
    [2949, 6, 10000, 4.335476426, 4.328103544, 3.525873086, 2.757348502, 3.914368596, 0.544185783, 0.495855949, 0.065818341, 0.315423618, 0.91954023, 25.029684, 121.471992],
    [1341, 7, 8500, 3.045481039, 3.295824945, 3.797074263, 4.141545072, 3.676129496, 0.382266519, 0.329894414, 0.087757789, 0.522121361, 0.936781609, 25.07588874, 121.4974089],
    [2282, 7, 9999, 4.391239358, 3.65723518, 3.797074263, 3.364423437, 3.91420977, 0.551185105, 0.387999074, 0.087757789, 0.406076219, 0.919551724, 24.99926045, 121.5084787],
    [2083, 7, 14500, 5.314507391, 4.08442859, 3.797074263, 5.073379083, 4.629085895, 0.667073023, 0.45667983, 0.087757789, 0.661269218, 0.867816092, 25.00353, 121.5214335],
    [666, 8, 16500, 4.613886812, 4.936215511, 4.06827544, 6.17964103, 4.946738028, 0.579131648, 0.593623349, 0.109697236, 0.826463853, 0.844827586, 25.00467048, 121.4961522],
    [1881, 8, 13000, 4.618057589, 4.248519447, 4.06827544, 4.899224974, 4.390846795, 0.579655161, 0.483061051, 0.109697236, 0.63526333, 0.885057471, 25.08746515, 121.4725498],
    [497, 5, 7000, 3.961616237, 3.232878785, 3.254671909, 3.708898073, 3.437890396, 0.49725913, 0.319774431, 0.043878894, 0.457515538, 0.954022989, 25.03377922, 121.4798773],
    [235, 10, 16000, 4.971454282, 6.003352754, 4.610677793, 4.722058767, 4.867324995, 0.624013251, 0.76518918, 0.15357613, 0.608807655, 0.850574713, 24.99137005, 121.4998862],
    [515, 6.5, 6200, 3.58341272, 4.754807781, 3.661473674, 1.986524893, 3.310829543, 0.449787305, 0.564458059, 0.076788065, 0.20031894, 0.963218391, 25.02375449, 121.4685866],
    [918, 12, 15500, 5.134249782, 5.011125721, 5.153080146, 5.171409226, 4.787911962, 0.644447222, 0.605666817, 0.197455024, 0.675907753, 0.856321839, 25.05713475, 121.45058],
    [21, 19, 18000, 5.118589191, 6.173107874, 7.051488383, 4.134699391, 5.184977128, 0.642481516, 0.792481056, 0.351031154, 0.521099117, 0.827586207, 25.02263331, 121.4694242],
    [1399, 5, 13000, 5.955373936, 4.856644587, 3.254671909, 5.213304789, 4.390846795, 0.747514116, 0.58083057, 0.043878894, 0.682163886, 0.885057471, 25.06585655, 121.4635250],
    [1546, 8, 8000, 3.782866817, 4.227895511, 4.06827544, 3.71601758, 3.596716463, 0.474822635, 0.479745299, 0.109697236, 0.458578672, 0.942528736, 25.0089705, 121.4524958],
    [608, 13, 13000, 4.135039919, 5.352239158, 5.424281323, 4.596919729, 4.390846795, 0.519027141, 0.660508319, 0.219394471, 0.590121034, 0.885057471, 25.045856, 121.4335243],
    [135, 8, 8000, 2.934294376, 5.438776392, 4.06827544, 3.774616604, 3.596716463, 0.368310452, 0.674421087, 0.109697236, 0.467329081, 0.942528736, 25.09152496, 121.4689012],
    [441, 12, 6500, 2.918888633, 3.372057552, 5.153080146, 3.976153434, 3.358477363, 0.366376735, 0.342150486, 0.197455024, 0.497423945, 0.959770115, 25.003683, 121.5105728],
    [509, 10.5, 8500, 3.179221345, 4.586156372, 4.746278381, 4.600479483, 3.676129496, 0.399053503, 0.537343628, 0.164545853, 0.590652601, 0.936781609, 25.12862233, 121.451878],
    [894, 7, 7000, 3.333908526, 6.042920718, 3.797074263, 3.055546339, 3.437890396, 0.418469724, 0.771550602, 0.087757789, 0.359952568, 0.954022989, 25.1721225, 121.4504843],
    [1149, 6, 7500, 4.394303196, 4.139683824, 3.525873086, 4.832137307, 3.517303429, 0.551569675, 0.465563326, 0.065818341, 0.625245339, 0.948275862, 24.95460529, 121.3490138],
    [1317, 8, 6000, 4.004069364, 4.248294554, 4.06827544, 3.736554621, 3.27906433, 0.502587814, 0.483024895, 0.109697236, 0.461645404, 0.965517241, 25.0202375, 121.4832964],
    [275, 8, 10000, 5.09559716, 4.166159496, 4.06827544, 5.842285901, 3.914368596, 0.639595573, 0.469819874, 0.109697236, 0.776087668, 0.91954023, 25.004286, 121.4835033],
    [1130, 8, 7500, 4.065425115, 5.3612316, 4.06827544, 4.092256173, 3.517303429, 0.510289143, 0.661954053, 0.109697236, 0.514761204, 0.948275862, 25.00694404, 121.523527],
    [1325, 6.5, 7500, 4.004069364, 5.836343419, 3.661473674, 4.651959, 3.517303429, 0.502587814, 0.738338748, 0.076788065, 0.598339876, 0.948275862, 24.993936, 121.4788613],
    [767, 7, 8900, 6.224017106, 5.789059996, 3.797074263, 4.393739936, 3.739659923, 0.781234007, 0.730736896, 0.087757789, 0.559780831, 0.932183908, 25.00465239, 121.4815881],
    [1050, 5, 7500, 5.13172987, 5.401123571, 3.254671909, 5.226722323, 3.517303429, 0.644130924, 0.668367566, 0.043878894, 0.684167484, 0.948275862, 25.08465668, 121.4573098]
]*/
const Iteration = 5;
var n1 = -1;
var n2 = -1;
var group1 = [];
var group2 = [];
var center1 = [];
var center2 = [];
var canKmeans = true;

var chart = [];
var data1 = [1, 2];
var data2 = [1, 2];

/** 變數順序(位置) //3,4,5,6,7=內,外,平,圖,價   **/
const inside = 3; //內部
const outside = 4; //外部
const size = 5; //評述
const picture = 6; //圖片
const price = 7; //價格
const var_start = 3; //變數起始位置
const var_end = 7; //變數結束位置




window.onload = function() {

    $.ajax({
        type: "POST",
        url: "php/sqlalldata.php",
        success: function(data) {
            data = JSON.parse(data);
            houses = turnToArray(data);
            console.log("house.length = " + houses.length);
            //houses = turnLatLngToNumber(temphouses);
            //console.log(houses);
            //console.log(typeof(houses[0][14]));
            kmeans(-1); //如果參數是-1 代表第一次kmeans
            displayChart1();
            displayChart2();
            update(center1, center2);
        },
        error: function(jqXHR) {
            alert("發生錯誤 狀態: " + jqXHR.readyState + "           " + jqXHR.status);
        }
    });

}


function turnToArray(obj) {
    var arr = [];
    for (var i = 0; i < obj.length; i++) {
        var temprow = [];
        Object.keys(obj[i]).map(function(mainkey) {
            if (mainkey == "13" || mainkey == "14") {
                var tempobj = Number(obj[i][mainkey]);
                temprow.push(tempobj);
            } else {
                temprow.push(obj[i][mainkey]);
            }
        });
        arr[i] = temprow;
    }
    return arr;
}
/*
function turnLatLngToNumber(arr){
    for(i = 0;i<=arr.length;i++)
    {
        arr[i][13] = Number(arr[i][13]);
        arr[i][14] = Number(arr[i][14]);
    } 
    return arr;
}
*/
function kmeans(index) {
    var oldGroup1 = [];
    var oldGroup2 = [];
    var newN1 = 0;
    var newN2 = 0;
    //步驟1             
    if (index != -1) {
        var tempGroup = eval("group" + index); //取得被選到的群           
    } else { //第一次kmeans
        var tempGroup = [];
        for (var i = 0; i < houses.length; i++) {
            tempGroup[i] = i;
        }
    }
    // console.log("當前物件數量" + tempGroup.length);
    //步驟2 隨機產生兩個質心
    var c1 = Math.floor(Math.random() * tempGroup.length);
    var c2;
    while (true) {
        c2 = Math.floor(Math.random() * tempGroup.length);
        if (c1 != c2) break;
    }
    c1 = tempGroup[c1]; //由tempGroup內的編號變成房子的編號
    c2 = tempGroup[c2];

    //迭代 iteration次
    for (var it = 0; it < Iteration; it++) {
        //console.log("迭代" + it + "次");
        newN1 = 0;
        newN2 = 0;
        var newGroup1 = [];
        var newGroup2 = [];
        //步驟3計算每個點和質心的距離
        var sum1 = [0, 0, 0, 0, 0];
        var sum2 = [0, 0, 0, 0, 0];
        tempGroup.forEach(function(e, i) {
            var div1 = 0;
            var div2 = 0;
            for (var varible = var_start; varible <= var_end; varible++) {
                div1 += Math.pow(houses[e][varible] - houses[c1][varible], 2);
                div2 += Math.pow(houses[e][varible] - houses[c2][varible], 2);
            }
            //歸類 //如果距離值新一比較遠 就歸類為值新二，順便計算新中心點
            if (Math.sqrt(div1) > Math.sqrt(div2)) {
                newGroup2.push(e);
                newN2 += 1;
                for (var varible = var_start; varible <= var_end; varible++) {
                    sum2[varible - var_start] += houses[e][varible]; //加總每個變數，為了之後取平均
                }
            } else {
                newGroup1.push(e);
                newN1 += 1;
                for (var varible = var_start; varible <= var_end; varible++) {
                    sum1[varible - var_start] += houses[e][varible];
                }

            }
        });

        //測試是否更新完兩個群不變
        if (!(oldGroup1.length == 0 && oldGroup2.length == 0)) {
            var isSame = true;
            for (var u = 0; u < newGroup1.length && u < oldGroup1.length; u++) {
                if (newGroup1[u] != oldGroup1[u]) {
                    isSame = false;
                    break;
                }
            }
            if (isSame)
                for (var u = 0; u < newGroup2.length && u < oldGroup2.length; u++) {
                    if (newGroup2[u] != oldGroup2[u]) {
                        isSame = false;
                        break;
                    }
                }
            if (isSame) {
                //console.log("兩群相同 停止迭代，new=" + newGroup1 + ",old=" + oldGroup1);
                it = Iteration; //停止 不用迭代了
                break;
            }
        }
        //

        //步驟4 計算新的兩群的中心點            
        for (var varible = var_start; varible <= var_end; varible++) {
            sum1[varible - var_start] /= newN1; //取每個變數的平均(4-1)
            sum2[varible - var_start] /= newN2;
        }
        for (var u = 1; u <= 2; u++) {
            var min = 1000000;
            eval("newGroup" + u).forEach(function(e, i) { //(4-2)
                var div = 0;
                for (var varible = var_start; varible <= var_end; varible++) {
                    div += Math.pow(houses[e][varible] - eval("sum" + u)[varible]);
                }
                if (Math.sqrt(div) < min) {
                    min = Math.sqrt(div);
                    eval("c" + u) = e;
                }
            });
        }
        oldGroup1 = newGroup1;
        oldGroup2 = newGroup2;
        //console.log("當前 1 值心" + houses[c1]);
        //console.log("當前 2 值心" + houses[c2]);
        //console.log("當前 1 群" + oldGroup1);
        //console.log("當前 2 群" + oldGroup2);
    }
    n1 = newN1;
    n2 = newN2;
    group1 = oldGroup1;
    group2 = oldGroup2;
    //console.log("jkkkjkjkjk = " + houses[c1]);
    center1 = houses[c1];
    center2 = houses[c2];
}

function update(c1, c2) {
    //改圖片    
    document.getElementById("Image1").src = "data/image/h" + c1[0] + ".jpg";
    document.getElementById("Image2").src = "data/image/h" + c2[0] + ".jpg";
    //改價錢 坪數
    /*document.getElementById("ps1").innerHTML = "價錢:" + c1[2] + ",坪數:" + c1[1];
    document.getElementById("ps2").innerHTML = "價錢:" + c2[2] + ",坪數:" + c2[1];*/
    document.getElementById("ps11").innerHTML = "價錢:" + c1[2];
    document.getElementById("ps12").innerHTML = "坪數:" + c1[1];
    document.getElementById("ps21").innerHTML = "價錢:" + c2[2];
    document.getElementById("ps22").innerHTML = "坪數:" + c2[1];
    //改長條圖            
    for (var i = 0; i < 2; i++) {
        for (var u = 0; u <= 1; u++) {
            chart[i].data.datasets.forEach((dataset) => {
                dataset.data.pop();
            });
        }
    }
    for (var i = 1; i <= 2; i++) {
        for (var u = 8; u <= 9; u++) {
            chart[i - 1].data.datasets.forEach((dataset) => {
                dataset.data.push(eval("c" + i)[u]);
            });
        }


    }
    chart[1].update();
    chart[0].update();

}

function furniturecheck(data) {
    var j = 0;
    for (i = 0; i <= 9; i++) {
        if (data[j][i] == "1") {
            document.getElementById("f" + j + i).src = "./data/lamp/lamp1.png";
        } else {
            document.getElementById("f" + j + i).src = "./data/lamp/lamp3.png";
        }
    }

}


function choose(index) {
    if (eval("group" + index).length < 2) {
        //console.log("因為物件數太少不構KMEANS，因此停止試驗");
        canKmeans = false;
    }
    currentTIMES++; //紀錄第幾次實驗
    if (currentTIMES > TIMES) {
        //alert("超過實驗次數:" + TIMES + "次，或物件太少無法繼續分群");
        return;
    }

    //步驟2,3 判斷比較好的變數，挑整權重
    adjustWeight(index);
    /*for (var i = 0; i < weight.length; i++) {
        console.log(i + " : " + weight[i]);
    }*/
    //kmeans分群   
    if (canKmeans) { //可以kmeans就k
        kmeans(index); //預計回傳兩個質心點(包含所有資訊的ARRAY)
    } else {
        currentTIMES = TIMES; //不行kmeans 就讓他停
    }

    //更新圖片 長條圖 坪數價格等等數據
    update(center1, center2);
    if (currentTIMES == TIMES) {

        lineMoveNext(true);
        console.log("weight : " + weight);
        //calculateWeightRank();
        //console.log("weight_rank :" + weight_rank);
        //找本系統排名*************    
        //價錢放分母
        /*for (var i = 0; i < houses.length; i++) {
            var tempSum = 0;
            for (var j = var_start; j <= var_end - 1; j++) {
                tempSum += Math.pow(houses[i][j], weight[j - var_start]);
            }
            tempRank.push([i, tempSum / Math.pow(houses[i][price], weight[price - var_start])]);

        }
        tempRank.sort(function(x, y) {
            return y[1] - x[1];
        });
        tempRank.forEach(function(element) {
            rank.push(element[0]);
        });*/
        currentPage++;
        setTimeout(changePage, 1000);
        //調整 : 第一名:物件 → 第一個物件 : 名次
        //rank = changeRank(rank);
        //console.log("rank after arrange:" + rank);
        //alert("此頁已完成，請按底下submit以繼續作答");

    } //這個判斷一定要在choose function的最後 //只要點了第五次計算完後 就要算排名

}

function adjustWeight(index) {
    var adjustWho = [];
    var div = [];
    var olddata1 = [];
    var olddata2 = [];
    for (var i = 8; i <= 12; i++) { //各個變數的百分比，因為data有改所以用olddata暫時代替
        olddata1.push(center1[i]);
        olddata2.push(center2[i]);
    }


    for (var i = 0; i < olddata1.length; i++) {
        if (index == 1) {
            if (olddata1[i] > olddata2[i]) {
                adjustWho.push(i);
                div.push(olddata1[i] - olddata2[i]);
            }
        } else {
            if (olddata2[i] > olddata1[i]) {
                adjustWho.push(i);
                div.push(olddata2[i] - olddata1[i]);
            }
        }
    }
    //開始條權重   
    //用等比  0.1 , 0.15 , 0.225 , 0.3375 , 0.50625
    adjustWho.forEach(function(e, i) {
        weight[e] += (0.1 * Math.pow(1.5, clickTimes[e]))
        clickTimes[e] += 1;
    });
    //console.log("weight:" + weight);
}

function changeRank(r) {
    var newRank = [r.length];
    r.forEach(function(e, i) {
            newRank[e] = i + 1;
        })
        /*for (var i = 0; i < newRank.length; i++) {
            newRank[i] = Math.ceil(newRank[i] / 2);
        }*/
    return newRank;
}


function displayChart1() {
    var ctx_bar = document.getElementById('canvas1').getContext('2d');
    var temp = new Chart(ctx_bar, {
        type: 'horizontalBar',
        data: {
            labels: ["家具設備", "地理環境"],
            datasets: [{

                data: data1,
                backgroundColor: ["rgba(255, 99, 132, 0.2)",
                    'rgba(54, 162, 235, 0.2)'

                ],
                borderWidth: 1,
            }]
        },
        options: {
            legend: {
                display: false
            },
            title: {
                display: true,
                text: '以下為各個因素所勝過之房屋'
            },
            scales: {
                yAxes: [{
                    categoryPercentage: 0.6, //柱子寬度(類別比例)                            
                    gridLines: {
                        offsetGridLines: true
                    },
                    ticks: {
                        beginAtZero: true //從零開始
                    }
                }],
                xAxes: [{
                    ticks: {
                        beginAtZero: true,
                        //steps: 10,//每一格刻度間距10
                        //stepValue: 10,
                        max: 1, //設定最大值
                        min: 0
                    },
                    categoryPercentage: 0.01, //刻度寬度
                }],
            },
            animation: {
                duration: 1,
                onComplete: function() {
                    var chartInstance = this.chart,
                        ctx = chartInstance.ctx;
                    ctx.font = Chart.helpers.fontString(13, Chart.defaults.global.defaultFontSize, Chart.defaults.global.defaultFontStyle, Chart.defaults.global.defaultFontFamily, "微軟正黑體");
                    ctx.textAlign = 'center';
                    ctx.textBaseline = 'bottom';

                    this.data.datasets.forEach(function(dataset, i) {
                        var meta = chartInstance.controller.getDatasetMeta(i);
                        meta.data.forEach(function(bar, index) {
                            var data = dataset.data[index];
                            ctx.fillText("優於" + (Math.round(data * 100)) + "%的房屋", bar._model.x + 13, bar._model.y - 9);
                        });
                    });
                }
            }
        }
    });
    chart.push(temp);

}

function displayChart2() {
    var ctx_bar = document.getElementById('canvas2').getContext('2d');
    var temp = new Chart(ctx_bar, {

        type: 'horizontalBar',
        data: {
            labels: ["家具設備", "地理環境"],
            datasets: [{

                data: data2,
                backgroundColor: ["rgba(255, 99, 132, 0.2)",
                    'rgba(54, 162, 235, 0.2)'
                ],
                borderWidth: 1,
            }]
        },
        options: {
            legend: {
                display: false
            },
            scales: {
                yAxes: [{
                    categoryPercentage: 0.6, //柱子寬度(類別比例)                            
                    gridLines: {
                        offsetGridLines: true
                    },
                    ticks: {
                        beginAtZero: true //從零開始
                    }
                }],
                xAxes: [{
                    ticks: {
                        beginAtZero: true,
                        //steps: 10,//每一格刻度間距10
                        //stepValue: 10,
                        max: 1, //設定最大值
                        min: 0
                    },
                    categoryPercentage: 0.01, //刻度寬度
                }],
            },
            animation: {

                duration: 1,
                onComplete: function() {
                    var chartInstance = this.chart,
                        ctx = chartInstance.ctx;
                    ctx.font = Chart.helpers.fontString(13, Chart.defaults.global.defaultFontSize, Chart.defaults.global.defaultFontStyle, Chart.defaults.global.defaultFontFamily, "微軟正黑體");
                    ctx.textAlign = 'center';
                    ctx.textBaseline = 'bottom';

                    this.data.datasets.forEach(function(dataset, i) {
                        var meta = chartInstance.controller.getDatasetMeta(i);
                        meta.data.forEach(function(bar, index) {
                            var data = dataset.data[index];
                            ctx.fillText("優於" + Math.round(data * 100) + "%的房屋", bar._model.x + 13, bar._model.y - 9);
                        });
                    });
                }
            },
            title: {
                display: true,
                text: '以下為各個因素所勝過之房屋'
            }
        }
    });
    chart.push(temp);
}