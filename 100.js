 //nav 城市名字
 addEvent(window,'load',function(){
    getSync("http://localhost:3000/cities",'',suc,err);
    function suc(msg){
        var cities=document.getElementById('city')
        var city=JSON.parse(msg.responseText);
        for(var i=0;i<city.length;i++){
            if(i==0){
                cities.innerHTML+= ' <span class="active">'+city[i]+'</span>'
            }
            else{
                cities.innerHTML+=' <span >'+city[i]+'</span>'
            }
        }
        console.log(city)
        //城市添加点击事件
        var oSpan=cities.getElementsByTagName('span');
        for(var i=0;i<oSpan.length;i++){
            oSpan[i].onclick=function(){
                for(var j=0;j<oSpan.length;j++){
                    oSpan[j].className=''
                }
                this.className='active';
            }
        }
      console.log(oSpan)
    }
function err(sss){
    console.log(sss);
}
  })

    //注意：选项卡 依赖 element 模块，否则无法进行功能性操作
    layui.use('element', function () {
        var element = layui.element;

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
        // if (listLength >= 5) {
        //     iFocusBtns[4].onmouseover = function () {
        //         moveElement('ifocus_piclist', 0, 0, 5);
        //         classNormal('ifocus_btn');
        //         classCurrent('ifocus_btn', 4);
        //     }
        // }
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
        //   if (currentNum == 4) {
        //     moveElement('ifocus_piclist', 0, 0, 5);
        //     classNormal('ifocus_btn');
        //     classCurrent('ifocus_btn',0);
        //   }
    }
    addLoadEvent(iFocusChange);
    //地铁
