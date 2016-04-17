function catch_blog() {
    var userIdObj = document.getElementById("userId");
    var userNameObj = document.getElementById("userName");
    if(userIdObj && userNameObj && userIdObj.value && userNameObj.value){
        alert("开始抓取，需要较长时间，请不要关闭本页！");
        var xmlHttp;
        if (window.ActiveXObject) {
            xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
        } else if (window.XMLHttpRequest) {
            xmlHttp=new XMLHttpRequest();
        }
        xmlHttp.open("POST", "/catch_blog", true);
        xmlHttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
        xmlHttp.onreadystatechange = function(){
            var XMLHttpReq = xmlHttp;
            if (XMLHttpReq.readyState == 4) {
                if (XMLHttpReq.status == 200) {
                    var resp = JSON.parse(XMLHttpReq.responseText);
                    console.log(resp);
                    if(resp.errcode == 0){
                        alert("抓取成功！！！");
                        location.reload();
                    }
                    else {
                        alert(resp.errmsg);
                    }
                }
            }
        };
        xmlHttp.send("user_id="+userIdObj.value+"&user_name="+userNameObj.value);
    }
    else {
        alert("请登录");
        location.href = "/";
    }
}