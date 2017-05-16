var mysql = require('mysql');
// var async = require('async');
var config = require('./db.config');

var pool;

module.exports.connect = function (done) {
    //创建数据库连接池
    try {
        pool = mysql.createPool(config.mysql);
        console.log('pool create....');
        done();
    } catch (err) {
        done(err);
    }
}

//API
module.exports.create = function (tableName, datas, done) {
    var keys = Object.keys(datas);
    var values = keys.map(function (key) {
        return datas[key];
    });

    var sql = 'INSERT INTO ' + tableName + '(' + keys.join(',') + ') VALUES (?,?,?)';
    //从数据库连接池获取一个连接
    pool.getConnection(function (err, connection) {
        //如果获取连接失败
        if (err) {
            return done(err);
        }
        //数据库操作
        connection.query(sql, values, function (err, result) {
            //连接释放
            connection.release();
            //如果插入数据失败
            if (err) {
                return done(err);
            }
            console.log('插入数据成功...');
            done(null, result);
        });
    });
}
