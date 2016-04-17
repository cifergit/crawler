var express = require('express');
var router = express.Router();
var http = require('http');
var cheerio = require('cheerio');//页面获取到的数据模块
var db = require('mongoskin').db('mongodb://localhost:27017/crawler');

var url = "http://aotu.io/atom.xml";

//保存
function blogsSave(html,resp,userId,userName){
    var $ = cheerio.load(html);
    var insertObjList = Array();
    var feed = $("feed").eq(0);
    var feedTitle = feed.find("title").text();
    var entryList = $("entry");
    if(entryList && entryList.length > 0){
        for(var i = 0;i < entryList.length;i++){
            var entry = entryList.eq(i);
            var entryId = entry.find("id").text();
            var entryTitle = entry.find("title").text();
            var entryPublished = entry.find("published").text();
            var entryUpdated = entry.find("updated").text();
            var entryContent = entry.find("content").text().replace(/src="\/img/g,'src="http://aotu.io/assets/img');
            var insertObj = {
                user_id : userId,
                user_name : userName,
                feed_title : feedTitle,
                entry_id : entryId,
                entry_title : entryTitle,
                entry_published : entryPublished,
                entry_updated : entryUpdated,
                entry_content : entryContent
            };
            insertObjList.push(insertObj);
        }
        db.collection("t_blog").insert(insertObjList,function(err, result) {
            if (err) throw err;
            console.log(result);
            if(result && result.ops){
                ret = {
                    errcode : 0,
                    errmsg : "抓取成功!!!",
                };
            }
            resp.json(ret);
        });
    }
}

router.post('/', function(req, resp, next) {
    var userId = req.body.user_id;
    var userName = req.body.user_name;
    if(!userId || !userName){
        userId = "5713993773fb42fbe3f6e27a";
        userName = "test";
    }
    http.get(url,function(res){
        var html="";
        res.on("data",function(data){
            html+=data;
        });
        res.on("end",function(){
            blogsSave(html,resp,userId,userName);
        })
    });
});

module.exports = router;
