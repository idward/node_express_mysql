var mysql = require('mysql');
var async = require('async');
var config = require('./db.config');

var state = {
    pool: null
};

module.exports.connect = function (done) {
    //创建数据库连接池
    state.pool = mysql.createPool(config.mysql);
    //
    done();
};

module.exports.get = function () {
    return state.pool;
};

module.exports.fixtures = function (data, done) {
    var pool = state.pool;
    if (!pool) {
        return done(new Error('Missing database connection.'));
    }

    var names = Object.keys(data.tables);
    async.each(names, function (name, cb) {
        async.each(data.tables[name], function (row, cb) {
            var keys = Object.keys(row);
            var values = keys.map(function (key) {
                return '"' + row[key] + '"';
            });

            pool.query('INSERT INTO ' + name + ' (' + keys.join(',') + ') VALUES (' +
                values.join(',') + ')', cb);
        }, cb);
    }, done);
};

module.exports.drop = function (tables, done) {
    var pool = state.pool;
    if (!pool) {
        return done(new Error('Missing database connection.'));
    }

    async.each(tables, function (name, cb) {
        pool.query('DELETE * FROM ' + name, cb);
    }, done);
}