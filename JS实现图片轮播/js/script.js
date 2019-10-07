window.onload = function(){
    // 全局变量
    var index = 0,
        timer = null,
        main = byId("main"),
        next = byId("next"),
        prev = byId("prev"),
        pics = byId("banner").getElementsByTagName("div"),
        len = pics.length,
        dots = byId("dots").getElementsByTagName("span"),
        menu = byId("menu-content"),
        menuItems = menu.getElementsByTagName("li"),
        mlen = menuItems.length,
        subMenu = byId("sub-menu"),
        subItems = subMenu.getElementsByClassName("inner-box");
        //console.log(menu)

    // DOM2级事件封装函数
    function addHandler(element,type,handler){
        if(element.addEventListener){
            element.addEventListener(type,handler,true);
        }else if(element.attachEvent){
            element.attachEvent("on" + type,handler);
        }else{
            element["on" + type] = handler;
            // 原本是element.type,但是IE浏览器要加前缀on，所以用[]的形式，JS中的"."符号都可以用[]代替 
        }
    }
    // 查找ID的函数封装,()里面别忘记传参数id进去
    function byId(id){
        return typeof(id)==="string"?document.getElementById(id):id;
    }
    //消除定时器，停止自动轮播
    function stopAutoPlay(){
        if(timer){
            clearInterval(timer);
        }
    }
    //图片轮播
    function startAutoPlay(){
        timer = setInterval(function(){
            index++;
            if(index >= len) index = 0;
            //console.log(index)
            changeImg();
        },3000)    
    }

    //图片和圆点索引转变函数封装
    function changeImg(){
        for(var i = 0;i < len;i++){
            pics[i].style.display = "none"; //display是样式，要加style
            dots[i].className = "";
        }
        pics[index].style.display = "block";
        dots[index].className = "active";
    }
    //点击下一张
    addHandler(next,"click",function(){
        index++;
        if(index >= len) index = 0;
        changeImg();
    })
    //点击下一张
    addHandler(prev,"click",function(){
        index--;
        if(index < 0) index = 2;
        changeImg();
    })
    //圆点索引设置
    for(var j = 0;j < len;j++){
        dots[j].setAttribute("data-index",j);
        addHandler(dots[j],"click",function(){
        //console.log(this.getAttribute("data-index"))
            index = this.getAttribute("data-index");
            changeImg();
        });
    }
    //主菜单和子菜单转变函数封装
    function changeMenu(){
        for(var n = 0;n < mlen; n++){
            menuItems[n].style.background = "none";
            subItems[n].style.display = 'none'; 
        }
        menuItems[index].style.background = "rgba(0,0,0,0.1)";
        subItems[index].style.display = "block";
    }
    //主菜单索引设置
    for(var m = 0;m < mlen; m++){
        menuItems[m].setAttribute("data-mindex",m);
        addHandler(menuItems[m],"mouseover",function(){
            subMenu.className = "sub-menu";  
    //Uncaught ReferenceError: subMenu is not defined at HTMLLIElement。引用错误：subMenu是一个未定义的HTML对象，说明subMenu未定义
            index = this.getAttribute("data-mindex");
            changeMenu();
        })
    }
    //鼠标离开主菜单时，背景样式消失
    for(var m = 0;m < mlen; m++){
        menuItems[m].setAttribute("data-mindex",m);
        addHandler(menuItems[m],"mouseout",function(){
            index = this.getAttribute("data-mindex");
            menuItems[index].style.background = "none";
        })
    }
    /* for(var m=0,mlen=menuItems.length;m<mlen;m++){
        menuItems[m].setAttribute("data-index",m);
        addHandler(menuItems[m],"mouseover",function(){
            subMenu.className = "sub-menu";
            var idx = this.getAttribute("data-index");
            for(var j=0,jlen=subItems.length;j<jlen;j++){
            subItems[j].style.display = 'none';
            menuItems[j].style.background = "none";
            }
            subItems[idx].style.display = "block";
            menuItems[idx].style.background = "rgba(0,0,0,0.1)";
        });
    } */  
    //跟我上面的写法是一个原理，这里的逻辑是遍历主菜单，然后给它里面的每一项设置自定义属性，然后给每一项添加鼠标事件，去掉二级菜单隐藏的类名，给一个自定义变量接收每一项的自定义属性（值是本身的索引），然后遍历主菜单和二级菜单，分别设置他们的属性为"none",最后用主菜单和二级菜单每一项自定义属性的值来分别开启它们的转变（类似转变函数封装）

    //鼠标离开主菜单和二级菜单时，二级菜单隐藏,
    addHandler(menu,"mouseout",function(){
        subMenu.className = "sub-menu hide";
    })
    addHandler(subMenu,"mouseout",function(){
        subMenu.className = "sub-menu hide";
    })
    //鼠标划入二级菜单时，二级菜单打开
    addHandler(subMenu,"mouseover",function(){
        subMenu.className = "sub-menu"; 
    })
    startAutoPlay();
    addHandler(main,"mouseover",stopAutoPlay);//事件句柄在DOM2级事件里不用括号
    addHandler(main,"mouseout",startAutoPlay);
}