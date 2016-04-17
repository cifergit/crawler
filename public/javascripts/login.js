//登录点击事件
function login() {
    var name = document.getElementById("name").value;
    var password = document.getElementById("password").value;
    if(name && password){
        var postParam = "name="+name+"&password="+password;
        checkLogin(postParam);
    }
    else {
        alert("账号、密码不能为空");
    }
}
//验证登录
function checkLogin(postParam) {
    var xmlHttp;
    if (window.ActiveXObject) {
        xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
    } else if (window.XMLHttpRequest) {
        xmlHttp=new XMLHttpRequest();
    }
    xmlHttp.open("POST", "/check_login", true);
    xmlHttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    xmlHttp.onreadystatechange = function(){
        var XMLHttpReq = xmlHttp;
        if (XMLHttpReq.readyState == 4) {
            if (XMLHttpReq.status == 200) {
                var resp = JSON.parse(XMLHttpReq.responseText);
                console.log(resp);
                if(resp.errcode == 0){
                    alert("登录成功，看看我抓取的博文！");
                    location.href = "/blog?user_id="+resp.data._id+"&user_name="+resp.data.name;
                }
                else {
                    alert("账号或密码错误");
                }
            }
        }
    };
    xmlHttp.send(postParam);
}