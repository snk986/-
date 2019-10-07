var id = {
    showSelect: byId('showSelect'),
    select: byId('select'),
    username: byId('username'),
    password: byId('password'),
    confirmPassword: byId('confirmPassword'),
    fullName: byId('fullName'),
    cardId: byId('cardId'),
    emmail: byId('emmail'),
    phoneNumber: byId('phoneNumber'),
    showNamerlue: byId('showNamerlue'),
    Namerlue : byId('Namerlue'),
    hidden : byId('hidden'),
    next: byId('next'),
    skipPage: byId('skipPage')
}
var pattern = {
    // usernameReg : '^[a-zA-Z][\w_]{5,19}$' 这种方式定义的是字符串，就算在函数里重新定义var reg = new RegExp(pattern.usernameReg);也不行，
    usernameReg : /^[a-zA-Z][\w_]{5,29}$/,
    passwordReg : /^\S{6,20}$/,
    fullNameReg : /^(?:[\u4e00-\u9fa5]{2,15}|[a-zA-Z]{3,30})$/,
    cardIdReg : /^(?:\d{18}|\d{17}[xX])$/,
    emmailReg : /^(?:\w+\.)*\w+@(?:\w+\.)+[a-zA-Z]+$/,
    phoneNumberReg : /^1[^12][\d]{9}$/
}
var showRlueSpans = getElem('showRlue'),
    spanChangeBlock = getElem('spanChangeBlock');
var showRlueSpansRight = [
    "用户名输入正确",
    "密码输入正确",
    "两次输入一致",
    "姓名输入正确",
    "号码输入正确",
    "邮箱格式输入正确",
    "手机格式输入正确"
]
var showRlueSpansError = [
    "6-30位字母、数字或“_”,字母开头",
    "6-20位数字、字母或符号,中间不能有空格",
    "两次密码输入不一致，请重新输入",
    "姓名只能包含中文或者英文，且字符在2-30个之间",
    "请输入18位身份证号码，最后一位可能是x",
    "请输入正确的邮箱地址",
    "您输入的手机号码不是有效的格式!"
]
var sum = 0;
// 通过ID查找元素方法
function byId(id) {
    return typeof (id) === 'string' ? document.getElementById(id) : id;
}
// 通过className查找元素方法
function getElem(cls) {
    return document.getElementsByClassName(cls);
}

// 用户名验证 基础的方法，写不出来可以写尝试
id.username.onblur = function () {
    var reg = pattern.usernameReg;
    reg.exec(id.username.value) ? showRlueSpans[0].innerHTML = showRlueSpansRight[0] : showRlueSpans[0].innerHTML = showRlueSpansError[0];
    reg.exec(id.username.value) ? showRlueSpans[0].style.color = 'green' : showRlueSpans[0].style.color = 'red';
}

// 第二种方法，用户名自执行函数，记得各项参数要写对 ,不好用
// (function aaa1(a, b, c){
//     id.username.onblur = function(){
//         var reg = pattern.usernameReg;
//         reg.exec(this.value) ? a.innerHTML = b : a.innerHTML = c;
//         reg.exec(this.value) ? a.style.color = 'green' : a.style.color = 'red';
//     }
// }(showRlueSpans[0], showRlueSpansRight[0], showRlueSpansError[0]))

// 第三种方法，封装注册验证函数失败，为什么正则没有生效？原因是要将this.value改成ele.value，this找不到元素，只能找到包裹它的函数，而包裹它的函数是一个匿名函数。
// pattern, ele,a, b, c这5个参数可以放在一个大对象里面，如下面,但不建议这样做，一个函数干一件事
// function abc(pattern, ele, a, b, c){
//     var reg = pattern;
//     reg.exec(ele.value) ? a.innerHTML = b : a.innerHTML = c;
//     reg.exec(ele.value) ? a.style.color = 'green' : a.style.color = 'red'; 
//     console.log(this.value)
// }
// id.username.onblur = function(){
//     abc(pattern.usernameReg, id.username, showRlueSpans[0], showRlueSpansRight[0], showRlueSpansError[0])
// }
function pe(pattern, ele){
    var reg = pattern;
    reg.exec(ele.value)
}
// 密码验证
id.password.onblur = function () {
    var reg = pattern.passwordReg;
    if(!reg.exec(id.password.value)){
        showRlueSpans[1].innerHTML = showRlueSpansError[1];
        showRlueSpans[1].style.color = 'red';
        hidden.style.display = 'table-cell';
    }else{
        var reg1 = /^(?:\d+|[A-Za-z]+|[@!~#$%^&*.-]+)$/;
        var reg2 = /^(?:[\da-zA-Z]+|[\d@!~#$%^&*.-]+|[a-zA-Z@!~#$%^&*.-]+)$/;
        var reg3 = /^[\da-zA-Z@!~#$%^&*.-]+$/
        hidden.style.display = 'none';
        if(reg1.exec(id.password.value)){
            spanChangeBlock[0].style.background = 'red';
        }else if(reg2.exec(id.password.value)){
            spanChangeBlock[1].style.background = 'orange';
        }else if(reg3.exec(id.password.value)){
            spanChangeBlock[1].style.background = 'orange';
            spanChangeBlock[2].style.background = 'green';
        }
    }
}
// 确认密码
id.confirmPassword.onblur = function () {
    if(id.confirmPassword.value === ''){
        showRlueSpans[2].innerHTML = '输入框不能为空';
        showRlueSpans[2].style.color = 'red';
    }else{
        id.confirmPassword.value === id.password.value? showRlueSpans[2].innerHTML = showRlueSpansRight[2] : showRlueSpans[2].innerHTML = showRlueSpansError[2];
        id.confirmPassword.value === id.password.value? showRlueSpans[2].style.color = 'green'  : showRlueSpans[2].style.color = 'red';
    }
}
// 姓名验证
id.fullName.onblur = function () {
    var reg = pattern.fullNameReg;
    // console.log(reg.exec(id.username.value))
    reg.exec(id.fullName.value) ? showRlueSpans[3].innerHTML = showRlueSpansRight[3] : showRlueSpans[3].innerHTML = showRlueSpansError[3];
    reg.exec(id.fullName.value) ? showRlueSpans[3].style.color = 'green' : showRlueSpans[3].style.color = 'red';
}

// 证件验证
id.cardId.onblur = function () {
    var reg = pattern.cardIdReg;
    // console.log(reg.exec(id.username.value))
    reg.exec(id.cardId.value) ? showRlueSpans[4].innerHTML = showRlueSpansRight[4] : showRlueSpans[4].innerHTML = showRlueSpansError[4];
    reg.exec(id.cardId.value) ? showRlueSpans[4].style.color = 'green' : showRlueSpans[4].style.color = 'red';
}

// 邮箱验证
id.emmail.onblur = function () {
    var reg = pattern.emmailReg;
    // console.log(reg.exec(id.username.value))
    reg.exec(id.emmail.value) ? showRlueSpans[5].innerHTML = showRlueSpansRight[5] : showRlueSpans[5].innerHTML = showRlueSpansError[5];
    reg.exec(id.emmail.value) ? showRlueSpans[5].style.color = 'green' : showRlueSpans[5].style.color = 'red';
}

// 手机验证
id.phoneNumber.onblur = function () {
    var reg = pattern.phoneNumberReg;
    // console.log(reg.exec(id.username.value))
    reg.exec(id.phoneNumber.value) ? showRlueSpans[6].innerHTML = showRlueSpansRight[6] : showRlueSpans[6].innerHTML = showRlueSpansError[6];
    reg.exec(id.phoneNumber.value) ? showRlueSpans[6].style.color = 'green' : showRlueSpans[6].style.color = 'red';
}

// 提交验证
id.next.onclick = function(){
    for(var i = 0;i < showRlueSpans.length;i++){
        if(showRlueSpans[i].style.color != 'green'){
            showRlueSpans[i].innerHTML = showRlueSpansError[i];
            showRlueSpans[i].style.color = 'red';
            // 这里不能打印是因为form标签中的method="post"方法把数据提交了出去。
        }else{
            sum++;
        }     
    }
    sum == 6? id.skipPage.action ='http://www.baidu.cn/' : alert('验证失败');
}
// 当鼠标划过头部右侧选项的“我的IMOOC”时，出现下拉列表
// 下拉列表显示的函数
function selectDisplay(pro){
    id.select.style.display = pro;
}
id.showSelect.onmouseover = function () {
    selectDisplay('block');
}

id.select.onmouseover = function () {
    selectDisplay('block');
}

id.select.onmouseout = function () {
    selectDisplay('none');
}
// 鼠标滑过姓名填写规则，姓名规则显示
// 姓名规则显示的函数
function NamerlueDisplay(pro){
    id.Namerlue.style.display = pro;
}
id.showNamerlue.onmouseover = function(){
    NamerlueDisplay('block');
}

id.Namerlue.onmouseover = function(){
    NamerlueDisplay('block');
}

id.showNamerlue.onmouseout = function () {
    NamerlueDisplay('none');
}

id.Namerlue.onmouseout = function () {
    NamerlueDisplay('none');
}


