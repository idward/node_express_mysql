var express = require('express');
var router = express.Router();
var model = require('../db/db_api');


/* GET users listing. */
router.get('/signup', function (req, res, next) {
    res.render('users/signup');
});

router.post('/signup', function (req, res, next) {
    var data = {};
    data.name = req.body.name;
    data.age = req.body.age;
    data.address = req.body.address;

    model.create('people', data, function (err, result) {
        if (err) {
            console.log(err);
            return;
        }

    });
});


module.exports = router;
