var express = require('express');
var router = express.Router();
var db = require('mongoskin').db('mongodb://localhost:27017/crawler');

router.get('/', function(req, res, next) {
    var ret = {
        title : "博文",
        file_name : "blog"
    };
    var userId = req.query.user_id;
    var userName = req.query.user_name;
    //查询该用户的博文
    if(userId){
        db.collection("t_blog").find({user_id:userId}).toArray(function(err, result) {
            if (err) throw err;
            console.log("user的博文");
            ret.title = "他抓取的博文";
            ret.blog_list = result;
            if(result[0]){
                ret.user_id = result[0].user_id;
                ret.user_name = result[0].user_name;
            }
            else {
                ret.user_id = userId;
                ret.user_name = userName;
            }
            res.render('blog', ret);
        });
    }
    else {
        db.collection("t_blog").find().toArray(function(err, result) {
            if (err) throw err;
            console.log("全部的博文");
            console.log(result);
            ret["title"] = "所有抓取的博文";
            ret.blog_list = result;
            res.render('blog', ret);
        });
    }
});

module.exports = router;

