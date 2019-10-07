var id = {
    showSelect: byId('showSelect'),
    select: byId('select'),
    username: byId('username'),
    password: byId('password'),
    confirmPassword: byId('confirmPassword'),
    fullName: byId('fullName'),
    cardId: byId('cardId'),
    email: byId('email'),
    phoneNumber: byId('phoneNumber'),
    showNamerlue: byId('showNamerlue'),
    Namerlue : byId('Namerlue'),
    hidden : byId('hidden'),
    next: byId('next'),
    skipPage: byId('skipPage'),
    spanChangeBlock : document.getElementsByClassName('spanChangeBlock'),
    showRlueSpans : document.getElementsByClassName('showRlue'),
    sum : 0
};
var pattern = {
    usernameReg : /^[a-zA-Z][\w_]{5,29}$/,
    passwordReg : /^\S{6,20}$/,
    fullNameReg : /^(?:[\u4e00-\u9fa5]{2,15}|[a-zA-Z]{3,30})$/,
    cardIdReg : /^(?:\d{18}|\d{17}[xX])$/,
    emailReg : /^(?:\w+\.)*\w+@(?:\w+\.)+[a-zA-Z]+$/,
    phoneNumberReg : /^1[^12][\d]{9}$/
};
var showRlue = {
    showRlueSpansRight : [
        "用户名输入正确",
        "密码输入正确",
        "两次输入一致",
        "姓名输入正确",
        "号码输入正确",
        "邮箱格式输入正确",
        "手机格式输入正确"
    ],
    showRlueSpansError : [
        "6-30位字母、数字或“_”,字母开头",
        "6-20位数字、字母或符号,中间不能有空格",
        "两次密码输入不一致，请重新输入",
        "姓名只能包含中文或者英文，且字符在2-30个之间",
        "请输入18位身份证号码，最后一位可能是x",
        "请输入正确的邮箱地址",
        "您输入的手机号码不是有效的格式!"
    ]
};

// 通过ID查找元素方法
function byId(id) {
    return typeof (id) === 'string' ? document.getElementById(id) : id;
}
// 验证正确时展示的内容和样式函数封装
function showRlueSpansRight(showRlueSpans, showRlueSpansRight){
    showRlueSpans.innerHTML = showRlueSpansRight;
    showRlueSpans.style.color = 'green';
}
// 验证错误时展示的内容和样式函数封装
function showRlueSpansError(showRlueSpans, showRlueSpansError){
    showRlueSpans.innerHTML = showRlueSpansError;
    showRlueSpans.style.color = 'red';
}
// 这种写法正则验证不了，打印的值是空？因为如果只是调用函数，只会执行一遍，而onblur方法中需要的是 pe(pattern, ele)函数中的reg.exec(ele.value)值，而值需要用return来返回。
// 下面是正则验证的封装
// function pe(pattern, ele){
//     var reg = pattern;
//     return reg.exec(ele.value);   
// }
// id.username.onblur = function(){
//     pe(pattern.usernameReg, id.username)?showRlueSpansRight(id.showRlueSpans[0], showRlue.showRlueSpansRight[0]):showRlueSpansError(id.showRlueSpans[0], showRlue.showRlueSpansError[0]);
// }
//用户名验证 
id.username.onblur = function(){
    var reg = pattern.usernameReg;
    reg.exec(this.value)?showRlueSpansRight(id.showRlueSpans[0], showRlue.showRlueSpansRight[0]):showRlueSpansError(id.showRlueSpans[0], showRlue.showRlueSpansError[0]);
}
// 姓名验证
id.fullName.onblur = function(){
    var reg = pattern.fullNameReg;
    reg.exec(this.value)?showRlueSpansRight(id.showRlueSpans[3], showRlue.showRlueSpansRight[3]):showRlueSpansError(id.showRlueSpans[3], showRlue.showRlueSpansError[3]);
}
// 身份验证
id.cardId.onblur = function(){
    var reg = pattern.cardIdReg;
    reg.exec(this.value)?showRlueSpansRight(id.showRlueSpans[4], showRlue.showRlueSpansRight[4]):showRlueSpansError(id.showRlueSpans[4], showRlue.showRlueSpansError[4]);
}
// 邮箱验证
id.email.onblur = function(){
    var reg = pattern.emailReg;
    reg.exec(this.value)?showRlueSpansRight(id.showRlueSpans[5], showRlue.showRlueSpansRight[5]):showRlueSpansError(id.showRlueSpans[5], showRlue.showRlueSpansError[5]);
}
// 手机号码验证
id.phoneNumber.onblur = function(){
    var reg = pattern.phoneNumberReg;
    reg.exec(this.value)?showRlueSpansRight(id.showRlueSpans[6], showRlue.showRlueSpansRight[6]):showRlueSpansError(id.showRlueSpans[6], showRlue.showRlueSpansError[6]);
}

// 密码验证
id.password.onblur = function () {
    var reg = pattern.passwordReg;
    if(!reg.exec(id.password.value)){
        id.showRlueSpans[1].innerHTML = showRlue.showRlueSpansError[1];
        id.showRlueSpans[1].style.color = 'red';
        id.hidden.style.display = 'table-cell';
    }else{
        var reg1 = /^(?:\d+|[A-Za-z]+|[@!~#$%^&*.-]+)$/;
        var reg2 = /^(?:[\da-zA-Z]+|[\d@!~#$%^&*.-]+|[a-zA-Z@!~#$%^&*.-]+)$/;
        var reg3 = /^[\da-zA-Z@!~#$%^&*.-]+$/
        id.hidden.style.display = 'none';
        if(reg1.exec(id.password.value)){
            id.spanChangeBlock[0].style.background = 'red';
        }else if(reg2.exec(id.password.value)){
            id.spanChangeBlock[1].style.background = 'orange';
        }else if(reg3.exec(id.password.value)){
            id.spanChangeBlock[1].style.background = 'orange';
            id.spanChangeBlock[2].style.background = 'green';
        }
    }
}
// 确认密码
id.confirmPassword.onblur = function () {
    if(id.confirmPassword.value === ''){
        id.showRlueSpans[2].innerHTML = '输入框不能为空';
        id.showRlueSpans[2].style.color = 'red';
    }else{
        id.confirmPassword.value === id.password.value? id.showRlueSpans[2].innerHTML = showRlue.showRlueSpansRight[2] : id.showRlueSpans[2].innerHTML = showRlue.showRlueSpansError[2];
        id.confirmPassword.value === id.password.value? id.showRlueSpans[2].style.color = 'green'  : id.showRlueSpans[2].style.color = 'red';
    }
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

// 提交验证
id.next.onclick = function(){
    for(var i = 0;i < id.showRlueSpans.length;i++){
        if(id.showRlueSpans[i].style.color != 'green'){
            id.showRlueSpans[i].innerHTML = showRlue.showRlueSpansError[i];
            id.showRlueSpans[i].style.color = 'red';
            // 这里不能打印是因为form标签中的method="post"方法把数据提交了出去。
            console.log()
        }else{
            id.sum++;
        }     
    }
    id.sum == 6? id.skipPage.action ='http://www.baidu.cn/' : alert('验证失败');
}



