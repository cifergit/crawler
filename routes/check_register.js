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
    db.collection("t_user").find({name : name}).toArray(function(err, result) {
        if (err) throw err;
        ret = {
            errcode : 0,
            errmsg : "注册成功",
            data : {}
        };
        //用户已存在
        if(result && result[0]){
            ret = {
                errcode : 403,
                errmsg : "用户已存在",
                data : result[0]
            };
            res.json(ret);
        }
        else {
            db.collection("t_user").insert({name : name,password:password},function(err2, registerResult) {
                if (err2) throw err2;
                console.log(registerResult);
                if(registerResult && registerResult.ops && registerResult.ops[0]){
                    ret = {
                        errcode : 0,
                        errmsg : "注册成功!!!",
                        data : registerResult.ops[0]
                    };
                }
                res.json(ret);
            });
        }
    });
});

module.exports = router;

