var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    var ret = {
        title : "会员登录",
        file_name : "login"
    };

    res.render('login', ret);
});

module.exports = router;
