
// 获取元素
var getElement = function(selector){
    return document.querySelector(selector);
}

var getAllElement = function(selector){
    return document.querySelectorAll(selector);
}   

// 获取元素样式
var getCls = function(element){
    return element.getAttribute('class');
}

// 设置元素样式
var setCls = function(element,cls){
    return element.setAttribute('class',cls);
}

// 为元素添加样式   传元素和样式cls进来， 1、先获取元素样式baseCls，2、baseCls.indexOf(cls)：检查baseCls中是否有cls样式，如果===-1，没有，就是设置新的元素样式 baseCls+' '+cls ，以AAA样式为例
var addCls = function(element,cls){
    var baseCls = getCls(element);
    if(baseCls.indexOf(cls) === -1){
        setCls(element,baseCls+' '+cls);
    }
}

// 为元素删除样式
var delCls = function(element,cls){
    var baseCls = getCls(element);
    if(baseCls.indexOf(cls) != -1){
        setCls(element,baseCls.split(cls).join(' ').replace(/\s+/g,' '));
    }
}
//split(cls).join(' ')这两个的用法记得再看看
// element 表示为要删除样式的元素,cls 表示指定删除的类名,baseCls 是获取当前元素element的所有class类名
// split() 是将字符串分割成数组，如果传递参数表示从指定的参数位置开始将字符串分割成数组。利用这种特性， 删除元素的样式， 例：下面的例子分割成数组后，数组中没有c这个元素了:'a b c'.split('c') -->  ['a b',''];
// join() 将数组拼接成字符串，这里传入空格， 表示使用空格拼接字符串，例子：['a b ', ''].join(' ') --> 'a b  '。
// replace(param1, param2) 字符替换方法， 接收两个参数， 第一个参数可以使用正则表达式匹配要被替换的字符， 第二个参数表示准备替换的字符串,/\s+/g 表示全局匹配任意个空白字符，
// 所以baseCls.split(cls).join(' ').replace(/\s+/g,' '）这句代码就是， 将元素本来拥有的所有class类名通过split()方法把需要删除的样式删除了，得到一个新的数组， 然后再通过join(）方法将数组拼接成字符串，最后替换字符串中多余的空白字符。达到实现删除指定类名的方法。
// 设置好函数后记得到console检查一下,var a = getElement('.footer') 记得回车看见undefined，写a再回车

var screenAnimateElements = {
    '.screen-1' : [
        '.screen-1__wrap__heading',
        '.screen-1__wrap__subheading',
    ],
    '.screen-2' : [
        '.screen-2__wrap__heading',
        '.screen-2__wrap__border',
        '.screen-2__wrap__subheading',
        '.screen-2__wrap__man',
        '.screen-2__wrap__roket',
    ],
    '.screen-3' : [
        '.screen-3',
        '.screen-3__right__wrap__heading',
        '.screen-3__right__wrap__border',
        '.screen-3__right__wrap__subheading',
        '.screen-3__right__wrap__features',
    ],
    '.screen-4' : [
        '.screen-4__wrap__heading',
        '.screen-4__wrap__border',
        '.screen-4__wrap__subheading',
        // '.screen-4__wrap__bg__item',
        '.screen-4__wrap__bg__item-1',
        '.screen-4__wrap__bg__item-2',
        '.screen-4__wrap__bg__item-3',
        '.screen-4__wrap__bg__item-4',
        
    ],
    '.screen-5' : [
        '.screen-5__wrap__man',
        '.screen-5__wrap__bottom__heading',
        '.screen-5__wrap__bottom__border',
        '.screen-5__wrap__bottom__subheading',
    ],
};
// 第一步，页面载入后，初始化动画元素样式init可以省略，  在html中和animation中设置类名和相应样式就行了
// function setScreenAnimateInit(screenCls){
//     // var screen = getElement(screenCls);   //获取当前屏元素，给什么事件使用？没有作用，多余的变量
//     //console.log(screen);
//     var animateElements = screenAnimateElements[screenCls]; 
//     //需要设置动画的每一项元素，是arguements类数组对象，
//     // console.log(animateElements);
//     for(var i = 0;i < animateElements.length;i++){
//         // var element = document.querySelector(animateElements[i]);
//         var element = getElement(animateElements[i]);
//         //console.log(animateElements[i]); animateElements[i]是arguements类数组对象中的每一项,属性是字符串
//         //console.log(element); element是DOM元素
//         //再把需要设置动画的每一项DOM元素，通过arguements类数组对象取出来,再获取每一项的class类名 ，类名前面不带'.',  是否能使用getElement getCls？ 可以使用getElement和getCls，上面封装了函数
//         // var baseCls = element.getAttribute('class');
//         var baseCls = getCls(element);
//         //console.log(baseCls);
//         element.setAttribute('class',baseCls + ' '+animateElements[i].substr(1)+'_animate_init');
//     }
// }
// window.onload = function(){
//     for(k in screenAnimateElements){
//         if(k == '.screen-1'){
//           continue;
//         }  
//     // 如果k == '.screen-1'，就跳过第一屏，继续初始化，那么第一屏就没用初始化状态了，所以只有在Html的DOM元素上，加上初始化_animate_init的clss类名
//         setScreenAnimateInit(k);
//     }
// }
//  console.log('onload')

// 第二步 封装当前屏播放动画函数，给滚动条事件调用
function playScreenAnimateDone(screenCls){
    // var screen = getElement(screenCls);
    var animateElements = screenAnimateElements[screenCls]; 
    for (var i = 0;i < animateElements.length;i++){
        var element = document.querySelector(animateElements[i]);
        var baseCls = element.getAttribute('class');
        element.setAttribute('class',baseCls.replace('_animate_init','_animate_done'));
    }
}

// 第二步附加：为什么第一屏没有done的状态？ 因为第一屏在window.onload时跳过了初始化设置，解决办法是手动在DOM中添加_animate_init来初始化
setTimeout(function(){playScreenAnimateDone('.screen-1');},100)

var navItems = getAllElement('.head__nav-item'); // 获取navItems是arguement类数组对象
var asideItems = getAllElement('.aside__nav__wrap-item');

// 封装转变导航栏和滑动门为激活状态的函数,给滚动条事件调用
function changeNavItemsActive(idx){
    for(var i = 0;i < navItems.length-1; i++){
        //console.log(navItems[i]);
        delCls(navItems[i],'head__nav-item_status_active');   
        navTip.style.left = 0 + 'px';
    }
        addCls(navItems[idx],'head__nav-item_status_active');
        navTip.style.left = 96*idx + 'px';
    for(var i = 0;i < asideItems.length; i++){
        delCls(asideItems[i],'aside__nav__wrap-item_status_active');
    }
        addCls(asideItems[idx],'aside__nav__wrap-item_status_active');    
}
// 如果不想高亮状态，把主导航条和右侧导航条的delCls、addCls，以及CSS中相应的样式删除就好了，用ctrl+f查找。

// 滚动条事件绑定
window.onscroll = function(){
    var top  = document.body.scrollTop||document.documentElement.scrollTop;
    //console.log(top)  //声明了<!DOCTYPE html>,用兼容性写法
    // 用switch方法写
    if(top > 60){
        addCls(getElement('.head'),'head_status_black');
    }else{
        delCls(getElement('.head'),'head_status_black');
        changeNavItemsActive(0);
    }
    if(top > 640*1){
        addCls(getElement('.aside__nav'),'aside__nav___status_in');}
    // }else{
    //    delCls(getElement('.aside__nav'),'aside__nav___status_in');
    // }
    if(top > (640*1-100)){
        playScreenAnimateDone('.screen-2');
        changeNavItemsActive(1);
    }
    if(top > (640*2-100)){
        playScreenAnimateDone('.screen-3');
        changeNavItemsActive(2);
    }
    if(top > (640*3-100)){
        playScreenAnimateDone('.screen-4');
        changeNavItemsActive(3);
    }
    if(top > (640*4-100)){
        playScreenAnimateDone('.screen-5');
        changeNavItemsActive(4);
    }
}
// 导航条双向定位
// 先遍历两个导航栏找到每一个元素，然后调用函数changeScreen()
// 这段代码的逻辑是什么？执行的顺序是怎么样的？for循环为什么放外面？
// 逻辑是给导航条中的每一项都绑定了点击事件；执行顺序是在for循环里一直调用changeScreen()函数，把两个参数传进去，navItems和asideItems是类数组对象，上面有声明变量；所以for循环放外面不停的调用函数，为了给每一项都绑定点击事件，读取每一项的当前高度，不同于以前的单个元素绑定事件，是一种新学习的函数方法。
// 自己去尝试一下navItems点击事件的单独绑定
function changeScreen(i,lib){
     lib[i].onclick = function(){
        // console.log(i)
    document.documentElement.scrollTop = i*640 + 1;  
    // scrollTop滚动条事件不仅可以读取高度，还可以写入高度，读取高度在前面的top,这里 + 1是干嘛用的？测试代码这里加1对效果整体是没有影响的。
    //我原先设置i*640 - 80，这里高度的值会赋值给上面的top值,当点击到第一屏时,top=0*640-80= -80，浏览器找不到该值，点击事件不生效，所以第一屏没有滑动门效果。
    }
}
for(var i = 0;i < navItems.length-1;i++){
    changeScreen(i,navItems);
    // 最好navItems.length-1，因为最后一项是按钮不用获得
    // changeScreen(i,asideItems); 这里为什么不能写在一起，要分开写？
}
for(var i = 0;i < asideItems.length;i++){
    changeScreen(i,asideItems);
}

// 滑动门特效
//第一先写函数结构和要传的参数写出来，，传进来的参数一定要正确，还要明白参数类型是什么，特别是传两个以上的参数，一定要区分正确，再写执行代码
// 这里的idx,items和上面的i,lib参数的性质是一样的，只是写法不同，都是(i,navItems)，为什么要区别写法，是因为下面的onmouseout事件里面也有一个for循环，为了使变量i不冲突，所以要换一种写法；var activeIdx = 0;这个变量是为了接收onmouseout事件for循环中鼠标移开的当前项索引
var navTip = getElement('.head__nav-tip');
function moveTip(idx,items){
    items[idx].onmouseover = function(){
        // console.log(this,idx)
        navTip.style.left = 96*idx + 'px';
    }
    var activeIdx = 0;
    items[idx].onmouseout = function(){
        // console.log(this,idx)
        for(var i = 0;i < items.length; i++){
            // 这里不能检测items[idx]的className，因为idx不是一个遍历数组的索引，只是当前鼠标移出的索引
            if( getCls(items[i]).indexOf('head__nav-item_status_active') > -1){
                activeIdx = i;
                break;
            }
        }
        navTip.style.left = 96*activeIdx + 'px';
    }
}
for(var i = 0;i < navItems.length-1;i++){
    moveTip(i,navItems);
}


