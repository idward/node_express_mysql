var express = require('express');
var router = express.Router();
var model = require('../db/db');

/* GET users listing. */
router.get('/signup', function (req, res, next) {
    res.render('users/signup');
});

router.post('/signup', function (req, res, next) {
    var data = {};
    data.name = req.body.name;
    data.age = req.body.age;
    data.address = req.body.address;
    //插入提交数据
    model.create('people', data, function (err, result) {
        if (err) {
            console.log(err);
            return;
        }
        console.log(result);
    });
});

module.exports = router;
