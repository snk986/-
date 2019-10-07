var screenAnimateElements = {
    '.screen-1' : [
        '.screen-1__wrap__heading',
        '.screen-1__wrap__subheading',
        // querySelector识别元素的CSS类名，所以定义变量类名的时前面要加'.'
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
        //'.screen-4__wrap__bg',  这是bg整体缩小放大的动画，下面是bg每一项缩小放大的动画
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
}

function setScreenAnimate(screenCls){
    var screen = document.querySelector(screenCls); 
    //获取当前屏的元素,用于添加当前屏点击事件,
    var animateElements = screenAnimateElements[screenCls]; 
    //需要设置动画的元素，用于设置动画
    // console.log(animateElements)
    var isSetAnimateClass = false;  // 是否设置动画初始化样式
    var isAnimateDone = false;      // 动画是否已经done？
     screen.onclick = function (){
        // 初始化样式，增加init属性
        if(isSetAnimateClass === false){
            for (var i = 0;i < animateElements.length;i++){
                var element = document.querySelector(animateElements[i]);
                //console.log(element)
                var baseCls = element.getAttribute('class');
                //console.log(baseCls)
                element.setAttribute('class',baseCls +' '+animateElements[i].substr(1)+'_animate_init');
                //setAttribute这里的tt写成tr了，要注意，写错好几次了
            }
            isSetAnimateClass = true;
            return ;
        }
    // 1、这三个if判断中并没有return返回内容，return后面是空的,也就是无返回值，也可以起到结束代码的作用。setAttribute方法也没有返回值。这行代码：element.setAttribute('class',baseCls +' '+animateElements[i].substr(1)+'_animate_init'); 只是将原来的类名加上修改之后的类名重新设置给元素。
    // 2、for循环没有返回值的哦。遍历animateElements数组，可以在数组中每一个元素上设置类，不只是最后一项。

element.setAttribute('class',baseCls +' '+animateElements[i].substr(1)+'_animate_init'); 

只是将原来的类名加上修改之后的类名重新设置给元素。
        
        //切换所有 animateElement 的  init --> done
        if(isAnimateDone === false){
            for (var i = 0;i < animateElements.length;i++){
                var element = document.querySelector(animateElements[i]);
                var baseCls = element.getAttribute('class');
                element.setAttribute('class',baseCls.replace('_animate_init','_animate_done'));
            }
            isAnimateDone = true;
            return ;
        }

        //切换所有 animateElement 的  done --> init
        if(isAnimateDone === true){
            for (var i = 0;i < animateElements.length;i++){
                var element = document.querySelector(animateElements[i]);
                var baseCls = element.getAttribute('class');
                element.setAttribute('class',baseCls.replace('_animate_done','_animate_init'));
            }
            isAnimateDone = false;
            return ;
        }
    }
}

// 遍历screenAnimateElement对象中的所有动画元素，然后调用setScreenAnimate()函数
for(k in screenAnimateElements){
    setScreenAnimate(k);
}
