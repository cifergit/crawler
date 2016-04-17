var express = require('express');
var router = express.Router();
var db = require('mongoskin').db('mongodb://localhost:27017/crawler');

//返回所有用户
router.get('/', function(req, res, next) {
    db.collection("t_user").find().toArray(function(err, result) {
        if (err) throw err;
        var ret = {
            title : "全部用户"
        };
        ret.user_list = result;
        res.render('users', ret);
    });
});

module.exports = router;
