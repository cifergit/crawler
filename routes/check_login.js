var express = require('express');
var router = express.Router();
var db = require('mongoskin').db('mongodb://localhost:27017/crawler');

/* GET home page. */
router.post('/', function(req, res, next) {
    console.log(req);
    var name = req.body.name;
    var password = req.body.password;
    console.log(name);
    console.log(password);
    db.collection("t_user").find({name : name,password:password}).toArray(function(err, result) {
        if (err) throw err;
        var ret = {
            errcode : 404,
            errmsg : "密码错误",
            data : {}
        };


        console.log(result);
        if(result && result[0]){
            ret = {
                errcode : 0,
                errmsg : "登录成功",
                data : result[0]
            };
        }
        console.log(ret);
        res.json(ret);
    });
});

module.exports = router;
