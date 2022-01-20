//update滚动条
window.onload = roll(50);
function roll(t) {
    var ul1 = document.getElementById("comment1");
    var ul2 = document.getElementById("comment2");
    var ulbox = document.getElementById("review_box");
    ul2.innerHTML = ul1.innerHTML;
    ulbox.scrollTop = 0; // 开始无滚动时设为0
    var timer = setInterval(rollStart, t); // 设置定时器，参数t用在这为间隔时间（单位毫秒），参数t越小，滚动速度越快
    // 鼠标移入时暂停滚动
    ulbox.onmouseover = function () {
        clearInterval(timer);
    }
    // 鼠标移出后继续滚动
    ulbox.onmouseout = function () {
        timer = setInterval(rollStart, t);
    }
}
// 开始滚动函数 
function rollStart() {
    // 上面声明的DOM对象为局部对象需要再次声明
    var ul1 = document.getElementById("comment1");
    var ul2 = document.getElementById("comment2");
    var ulbox = document.getElementById("review_box");
    // 正常滚动不断给scrollTop的值+1,当滚动高度大于列表内容高度时恢复为0
    if (ulbox.scrollTop >= ul1.scrollHeight) {
        ulbox.scrollTop = 0;
    } else {
        ulbox.scrollTop++;
    }



}

//nav 城市名字


addEvent(window, 'load', function () {
    getSync("http://localhost:3000/cities", '', suc, err);
    function suc(msg) {
        var cities = document.getElementById('city')
        var city = JSON.parse(msg.responseText);
        for (var i = 0; i < city.length; i++) {
            if (i == 0) {
                cities.innerHTML += ' <span class="active">' + city[i] + '</span>'
            }
            else {
                cities.innerHTML += ' <span >' + city[i] + '</span>'
            }
        }
        // console.log(city)
        //城市添加点击事件
        var oSpan = cities.getElementsByTagName('span');
        for (var i = 0; i < oSpan.length; i++) {
            oSpan[i].onclick = function () {
                for (var j = 0; j < oSpan.length; j++) {
                    oSpan[j].className = ''
                }
                this.className = 'active';
            }
        }

    }
    function err(aaa) {
        console.log(aaa);
    }
})
/* 视频下边新闻 */
addEvent(window, 'load', function () {
    getSync("http://localhost:3000/new", '', suc0, err)
    function suc0(suc) {
        var nnew = document.querySelector(".new-1")
        var responnew = JSON.parse(suc.responseText)
        for (var i = 0; i < responnew.length; i++) {
            nnew.innerHTML += `<a href="##">
              <li class="li-1"><span class="shuzi"></span>`+ responnew[i] + `
              </li>`
        }

    }
    function err(aaa) {
        console.log(aaa);
    }
})
/* hotshop
*/
/* 改为id 的酒店 */
addEvent(window, 'load', function () {
    getSync('http://localhost:3000/HoTshop', '', suc1, err)
    function suc1(_msg1) {
        var tabitem1 = document.querySelector('#hotshop')
        var respontab = JSON.parse(_msg1.responseText)
        for (var i = 0; i < respontab[0].img0.length; i++) {
            tabitem1.innerHTML += `<a href="##"> <span class="tab-item-0"><img src="` + respontab[0].img0[i] + `"</span>
      <span class="tab-item-2">
          <p>`+ respontab[1].p0[i] + `</p>
          <p>区域省:`+ respontab[2].p1[i] + `</p>
          <p>人均:`+ respontab[3].p2[i] + `</p>
          <p>人气:`+ respontab[4].p3[i] + `</p>
      </span>
      <span class="tab-item-4">
          <img src="./imgs/hot_bg.png" alt="">
      </span>
      </a> `
        }

    }
    function err(aaa) {
        console.log(aaa);
    }
})

/* EWshop */
var EWshop = document.querySelector("#EWshop")

addEvent(EWshop, 'click', function () {
    getSync('http://localhost:3000/EWshop', '', suc2, err)
    function suc2(_msg1) {
        var tabitem1 = document.querySelector('#ew')
        var respontab = JSON.parse(_msg1.responseText)
        for (var i = 0; i < respontab[0].img0.length; i++) {
            tabitem1.innerHTML += `
           <a href="##"> <span class="tab-item-0"><img src="` + respontab[0].img0[i] + `"</span>
      <span class="tab-item-2">
          <p>`+ respontab[1].p0[i] + `</p>
          <p>区域省:`+ respontab[2].p1[i] + `</p>
          <p>人均:`+ respontab[3].p2[i] + `</p>
          <p>人气:`+ respontab[4].p3[i] + `</p>
      </span>
      <span class="tab-item-4">
          <img src="./imgs/hot_bg.png" alt="">
      </span>
      </a>`
        }
    }
    function err(aaa) {
        console.log(aaa);
    }

})

layui.use('element', function () {
    var abc = layui.element;

    //…
});


//日历
//嵌套在指定容器中
// layui.use('laydate', callback);
layui.use('laydate', function () {
    var laydate = layui.laydate;
    laydate.render({
        elem: '#test2'
        , position: 'static'
        , change: function (value, date) { //监听日期被切换
            lay('#testView').html(value);
        }
    });
});
//轮播图
function $(id) {
    return document.getElementById(id);
}
function addLoadEvent(func) {
    var oldonload = window.onload;
    if (typeof window.onload != 'function') {
        window.onload = func;
    } else {
        window.onload = function () {
            oldonload();
            func();
        }
    }
}
function moveElement(elementID, final_x, final_y, interval) {
    if (!document.getElementById) return false;
    if (!document.getElementById(elementID)) return false;
    var elem = document.getElementById(elementID);
    if (elem.movement) {
        clearTimeout(elem.movement);
    }
    if (!elem.style.left) {
        elem.style.left = "0px";
    }
    if (!elem.style.top) {
        elem.style.top = "0px";
    }
    var xpos = parseInt(elem.style.left);
    var ypos = parseInt(elem.style.top);
    if (xpos == final_x && ypos == final_y) {
        return true;
    }
    if (xpos < final_x) {
        var dist = Math.ceil((final_x - xpos) / 10);
        xpos = xpos + dist;
    }
    if (xpos > final_x) {
        var dist = Math.ceil((xpos - final_x) / 10);
        xpos = xpos - dist;
    }
    if (ypos < final_y) {
        var dist = Math.ceil((final_y - ypos) / 10);
        ypos = ypos + dist;
    }
    if (ypos > final_y) {
        var dist = Math.ceil((ypos - final_y) / 10);
        ypos = ypos - dist;
    }
    elem.style.left = xpos + "px";
    elem.style.top = ypos + "px";
    var repeat = "moveElement('" + elementID + "'," + final_x + "," + final_y + "," + interval + ")";
    elem.movement = setTimeout(repeat, interval);
}
function classNormal(iFocusBtnID) {
    var iFocusBtns = $(iFocusBtnID).getElementsByTagName('li');
    for (var i = 0; i < iFocusBtns.length; i++) {
        iFocusBtns[i].className = 'normal';
    }
}
function classCurrent(iFocusBtnID, n) {
    var iFocusBtns = $(iFocusBtnID).getElementsByTagName('li');
    iFocusBtns[n].className = 'current';
}
function iFocusChange() {
    if (!$('ifocus')) return false;
    $('ifocus').onmouseover = function () {
        atuokey = true
    };
    $('ifocus').onmouseout = function () {
        atuokey = false
    };
    var iFocusBtns = $('ifocus_btn').getElementsByTagName('li');
    var listLength = iFocusBtns.length;
    iFocusBtns[0].onmouseover = function () {
        moveElement('ifocus_piclist', 0, 0, 5);
        classNormal('ifocus_btn');
        classCurrent('ifocus_btn', 0);
    }
    if (listLength >= 2) {
        iFocusBtns[1].onmouseover = function () {
            moveElement('ifocus_piclist', 0, -130, 5);
            classNormal('ifocus_btn');
            classCurrent('ifocus_btn', 1);
        }
    }
    if (listLength >= 3) {
        iFocusBtns[2].onmouseover = function () {
            moveElement('ifocus_piclist', 0, -260, 5);
            classNormal('ifocus_btn');
            classCurrent('ifocus_btn', 2);
        }
    }
    if (listLength >= 4) {
        iFocusBtns[3].onmouseover = function () {
            moveElement('ifocus_piclist', 0, -390, 5);
            classNormal('ifocus_btn');
            classCurrent('ifocus_btn', 3);
        }
    }

}
setInterval('autoiFocus()', 3000);
var atuokey = false;
function autoiFocus() {
    if (!$('ifocus')) return false;
    if (atuokey) return false;
    var focusBtnList = $('ifocus_btn').getElementsByTagName('li');
    var listLength = focusBtnList.length;
    for (var i = 0; i < listLength; i++) {
        if (focusBtnList[i].className == 'current') var currentNum = i;
    }
    if (currentNum == 0 && listLength != 1) {
        moveElement('ifocus_piclist', 0, -130, 5);
        classNormal('ifocus_btn');
        classCurrent('ifocus_btn', 1);
    }
    if (currentNum == 1 && listLength != 2) {
        moveElement('ifocus_piclist', 0, -260, 5);
        classNormal('ifocus_btn');
        classCurrent('ifocus_btn', 2);
    }
    if (currentNum == 2 && listLength != 3) {
        moveElement('ifocus_piclist', 0, -390, 5);
        classNormal('ifocus_btn');
        classCurrent('ifocus_btn', 3);
    }
    if (currentNum == 3) {
        moveElement('ifocus_piclist', 0, -00, 5);
        classNormal('ifocus_btn');
        classCurrent('ifocus_btn', 0);
    }

}
addLoadEvent(iFocusChange);
/* 轮播图下文字 */
addEvent(window, 'load', function () {
    getSync('http://localhost:3000/tuijianword', '', suc2, err)
    function suc2(_msg1) {
        var tuijian = document.querySelector('#tuijianword')
        var respontuijian = JSON.parse(_msg1.responseText)
        for (var i = 0; i < respontuijian[0].word.length; i++) {
            tuijian.innerHTML += `  <li><a href="##">
            <span class="tuijian1"></span>
            <span class="tuijain-div">`+ respontuijian[0].word[i] + `</span><span class="tuijian2">` + respontuijian[1].time[i] + `</span>
        </a>
    </li>`
        }

    }
    function err(aaa) {
        console.log(aaa);
    }
})

/* bbs论坛 */
addEvent(window, 'load', function () {
    getSync('http://localhost:3000/bbs', '', suc3, err)
    function suc3(_msg1) {
        var bbsul = document.querySelector('#bbsul')
        var responul = JSON.parse(_msg1.responseText)
        for (var i = 0; i < responul[0].bbsshuzi.length; i++) {
            bbsul.innerHTML += ` <li class="bbs-li " >
         
            <span class="bbs-shuzi">`+ responul[0].bbsshuzi[i] + `</span>
            <span class="bbs-content">`+ responul[1].bbsword[i] + `</span>
            <span class="bbs-wei">`+ responul[2].bbstime[i] + `</span>
    </li>`
        }
        /* 文字mouseover效果 */
        var oLi = bbsul.getElementsByTagName('li');
        for (var i = 0; i < oLi.length; i++) {
            oLi[i].onmouseover = function () {
                for (var j = 0; j < oLi.length; j++) {
                    oLi[j].className = ''
                }
                this.className = 'bbsactive';

            }
        }
    }

    function err(aaa) {
        console.log(aaa);
    }
})
/* 知道分子 */
addEvent(window, 'load', function () {
    getSync('http://localhost:3000/zhidaofenzi1', '', suc4, err)
    function suc4(_msg1) {
        var li1 = document.querySelector('.li1')
        var responli = JSON.parse(_msg1.responseText)
        for (var i = 0; i < responli[0].li0.length; i++) {
            li1.innerHTML += `   <a href="##" > <span class="shuzi">
                                                
            </span>
                    <span class="shuzi1">`+ responli[0].li0[i] + `</span>
                    <span
                        class="zhidao-content">`+ responli[1].li1[i] + `asasasssdaasdasasdasdsadasdasdasdasdasdasdas</span>
                    <span class="zhidaoicon"></span>
                </a>`
        }

    }

    function err(aaa) {
        console.log(aaa);
    }
})
addEvent(window, 'load', function () {
    getSync('http://localhost:3000/zhidaofenzi2', '', suc5, err)
    function suc5(_msg1) {
        var li2 = document.querySelector('.li2')
        var responli = JSON.parse(_msg1.responseText)
        for (var i = 0; i < responli[0].li0.length; i++) {
            li2.innerHTML += `<a href="##"><span class="shuzi">
                                                
            </span>
                    <span class="shuzi1">`+ responli[0].li0[i] + `</span>
                    <span
                        class="zhidao-content">`+ responli[1].li1[i] + `asasasssdaasdasasdasdsadasdasdasdasdasdasdas</span>
                    <span class="zhidaoicon2"></span>
                </a>`
        }

    }

    function err(aaa) {
        console.log(aaa);
    }
})
addEvent(window, 'load', function () {
    getSync('http://localhost:3000/zhidaofenzi3', '', suc6, err)
    function suc6(_msg1) {
        var li3 = document.querySelector('.li3')
        var responli = JSON.parse(_msg1.responseText)
        for (var i = 0; i < responli[0].li0.length; i++) {
            li3.innerHTML += `   <a href="##" > <span class="shuzi">
                                                
            </span>
                    <span class="shuzi1">`+ responli[0].li0[i] + `</span>
                    <span
                        class="zhidao-content">`+ responli[1].li1[i] + `asasasssdaasdasasdasdsadasdasdasdasdasdasdas</span>
                    <span class="zhidaoicon"></span>
                </a>`
        }

    }

    function err(aaa) {
        console.log(aaa);
    }
})
addEvent(window, 'load', function () {
    getSync('http://localhost:3000/zhidaofenzi4', '', suc7, err)
    function suc7(_msg1) {
        var li4 = document.querySelector('.li4')
        var responli = JSON.parse(_msg1.responseText)
        for (var i = 0; i < responli[0].li0.length; i++) {
            li4.innerHTML += `   <a href="##" > <span class="shuzi">
                                                
            </span>
                    <span class="shuzi1">`+ responli[0].li0[i] + `</span>
                    <span
                        class="zhidao-content">`+ responli[1].li1[i] + `asasasssdaasdasasdasdsadasdasdasdasdasdasdas</span>
                    <span class="zhidaoicon2"></span>
                </a>`
        }

    }

    function err(aaa) {
        console.log(aaa);
    }
})
addEvent(window, 'load', function () {
    getSync('http://localhost:3000/zhidaofenzi5', '', suc8, err)
    function suc8(_msg1) {
        var li5 = document.querySelector('.li5')
        var responli = JSON.parse(_msg1.responseText)
        for (var i = 0; i < responli[0].li0.length; i++) {
            li5.innerHTML += `   <a href="##" > <span class="shuzi">
                                                
            </span>
                    <span class="shuzi1">`+ responli[0].li0[i] + `</span>
                    <span
                        class="zhidao-content">`+ responli[1].li1[i] + `asasasssdaasdasasdasdsadasdasdasdasdasdasdas</span>
                    <span class="zhidaoicon2"></span>
                </a>`
        }

    }

    function err(aaa) {
        console.log(aaa);
    }
})
addEvent(window, 'load', function () {
    getSync('http://localhost:3000/hotshaoke', '', suc9, err)
    function suc9(_msg1) {
        var tu = document.querySelector('#tu')
        var respontu = JSON.parse(_msg1.responseText)
        for (var i = 0; i < respontu.length; i++) {
            tu.innerHTML += `<img src="` + respontu[i] + `" alt=""> `

        }
        // console.log(respontu);
        // console.log(respontu[0].length);
    }

    function err(aaa) {
        console.log(aaa);
    }
})
/* 媒体声音 */
addEvent(window, 'load', function () {
    getSync('http://localhost:3000/zanzhu-1', '', suc10, err)
    function suc10(_msg1) {
        var zanzhu = document.querySelector('.zanzhu')
        var responzanzhu_1 = JSON.parse(_msg1.responseText)
        for (var i = 0; i < responzanzhu_1[0].img.length; i++) {
            zanzhu.innerHTML += `<div class="zanzhu-1"><img src="` + responzanzhu_1[0].img[i] + `" alt=""><span><a
            href="##
            ">`+ responzanzhu_1[1].word[i] + `</a></span></div>`
        }

    }

    function err(aaa) {
        console.log(aaa);
    }
})
/* 抢券 */
addEvent(window, 'load', function () {
    getSync('http://localhost:3000/qiangquan', '', suc11, err)
    function suc11(_msg1) {
        var qiangquan = document.querySelector('#qiangquan2')
        var responqiangquan = JSON.parse(_msg1.responseText)
        for (var i = 0; i < responqiangquan[0].word.length; i++) {
            qiangquan.innerHTML += `<li class="zhidao-li"><a href="">
                <span class="shuzi"></span>
                    <span class="shuzi1">`+ responqiangquan[0].word[i] + `</span>
                    <span
                        class="zhidao-content">`+ responqiangquan[1].sheng[i] + `asasasssdaasdasasdasdsadasdasdasdasdasdasdas</span>
                    <span class="zhidao-wei">`+ responqiangquan[2].dayin[i] + `</span>
                </a>
            </li>`
        }
    }
    function err(aaa) {
        console.log(aaa);
    }
})
/* 今日推荐 */
addEvent(window, 'load', function () {
    getSync('http://localhost:3000/daycontent', '', suc12, err)
    function suc12(_msg1) {
        var daycontent = document.querySelector('.daycontent')
        var respondaycontent = JSON.parse(_msg1.responseText)
        for (var i = 0; i < respondaycontent[0].img.length; i++) {
            daycontent.innerHTML += `<div class="daypart">
                <span class="daysp-1"><img src="`+ respondaycontent[0].img[i] + `" alt=""></span>
                <a href="##" class="daysp-2">
                    <p class="dayp1">`+ respondaycontent[1].mingzi[i] + `</p>
                    <p class="dayp2"><span>口味:</span>`+ respondaycontent[2].word[i] + `</p>
                    <p class="dayp3"><span>区域:</span>`+ respondaycontent[3].area[i] + `/cbd</p>
                </a>
            </div>`
        }

    }
    function err(aaa) {
        console.log(aaa);
    }
})
/* 折扣 */
addEvent(window, 'load', function () {
    getSync('http://localhost:3000/zhekou', '', suc13, err)
    function suc13(_msg1) {
        var zhekou = document.querySelector('.zhekouul')
        var responzhekou = JSON.parse(_msg1.responseText)
        for (var i = 0; i < responzhekou[0].word.length; i++) {
            zhekou.innerHTML += `<li class="zhidao-li">  <span class="shuzi"></span>
                <a href="##">
                    <span class="shuzi1">`+ responzhekou[0].word[i] + `</span>
                    <span class="zhidao-content">`+ responzhekou[1].content[i] + `asasasssdaasdasasdasdsadasdasdasdasdasdasdas</span>
                </a>
            </li>`
        }

        var parent = document.getElementById('parent');
        var zhekou1 = document.getElementById('zhekou1');
        var zhekou2 = document.getElementById('zhekou2');
        console.log(zhekou1.innerHTML);
        zhekou2.innerHTML = zhekou1.innerHTML;

        var timer = setInterval(function () {
            if (parent.scrollTop >= zhekou1.scrollHeight) {
                parent.scrollTop = 0;
            } else {
                parent.scrollTop++;
            }
        }, 50);
        parent.onmouseover = function () {
            clearInterval(timer);
        }
        // 鼠标移出后继续滚动
        parent.onmouseout = function () {
            timer = setInterval(function () {
                var parent = document.getElementById('parent');
                var zhekou1 = document.getElementById('zhekou1');
                var zhekou2 = document.getElementById('zhekou2');
                // console.log(zhekou1.innerHTML);
                zhekou2.innerHTML = zhekou1.innerHTML;
                if (parent.scrollTop >= zhekou1.scrollHeight) {
                    parent.scrollTop = 0;
                } else {
                    parent.scrollTop++;
                }
            }, 50);

        }


        // var parent = document.getElementById('parent');
        //     var zhekou1 = document.getElementById('zhekou1');
        //     var zhekou2 = document.getElementById('zhekou2');
        //     console.log(zhekou1.innerHTML);
        //     zhekou2.innerHTML = zhekou1.innerHTML;
        //     // console.log( zhekou2.innerHTML);
        //     setInterval(function () {
        //       if(parent.scrollTop >= zhekou1.scrollHeight) {
        //         parent.scrollTop = 0;
        //       } else {
        //         parent.scrollTop++;
        //       }
        //     }, 50);

    }
    function err(aaa) {
        console.log(aaa);
    }
})



/* 加盟 */
addEvent(window, 'load', function () {
    getSync('http://localhost:3000/jiameng', '', suc14, err)
    function suc14(_msg1) {
        var jiamengul = document.querySelector('.jiamengul')
        var responjiamengul = JSON.parse(_msg1.responseText)
        for (var i = 0; i < responjiamengul[0].word.length; i++) {
            jiamengul.innerHTML += `<li class="zhidao-li">  <span class="shuzi"></span>
                <a href="##">
                    <span class="shuzi1">`+ responjiamengul[0].word[i] + `</span>
                    <span class="zhidao-content">`+ responjiamengul[1].content[i] + `</span>
                </a>
            </li>`
        }

    }
    function err(aaa) {
        console.log(aaa);
    }
})
// layui.use('layer', function(){
//     var layer = layui.layer;

//    //页面层-自定义

// layer.open({
//     type: 1,
//     title: false,
//     closeBtn: 0,
//     shadeClose: true,
//     skin: 'yourclass',
//     content: '自定义HTML内容',
//     time: 2000,
//    
//   });
//   });

layer.open({
    content: '浏览器滚动条已锁',
    scrollbar: false,
    title: false,
    time: 10000,
    area: ['630px', '360px']
});