var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    var ret = {
        title : "注册会员",
        file_name : "register"
    };
    res.render('register', ret);
});

module.exports = router;
