//注册点击事件
function register() {
    var name = document.getElementById("name").value;
    var password = document.getElementById("password").value;
    var re_password = document.getElementById("re_password").value;
    if(name && password){
        if(password == re_password){
            var postParam = "name="+name+"&password="+password;
            checkRegister(postParam);
        }
        else {
            alert("两次密码必须一致！");
        }
    }
    else {
        alert("账号、密码不能为空！");
    }
}
//验证注册
function checkRegister(postParam) {
    var xmlHttp;
    if (window.ActiveXObject) {
        xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
    } else if (window.XMLHttpRequest) {
        xmlHttp=new XMLHttpRequest();
    }
    xmlHttp.open("POST", "/check_register", true);
    xmlHttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    xmlHttp.onreadystatechange = function(){
        var XMLHttpReq = xmlHttp;
        if (XMLHttpReq.readyState == 4) {
            if (XMLHttpReq.status == 200) {
                var resp = JSON.parse(XMLHttpReq.responseText);
                console.log(resp);
                if(resp.errcode == 0){
                    alert("注册成功，去抓取的博文吧！");
                    if(resp.data._id){
                        location.href = "/blog?user_id="+resp.data._id+"&user_name="+resp.data.name;
                    }
                }
                else {
                    alert(resp.errmsg);
                }
            }
        }
    };
    xmlHttp.send(postParam);
}
