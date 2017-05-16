var db = require('./db');

module.exports.create = function (tableName, datas, done) {
    var keys = Object.keys(datas);
    // var fieldName = keys.map(function (key) {
    //     return key ;
    // });

    var values = keys.map(function (key) {
        return datas[key];
    });

    // INSERT INTO `node_mysql`.`people`
    // (`name`,`age`,`address`) VALUES
    // ('Larry',41,'California, USA');

    db.get().query('INSERT INTO ' + tableName + '(' + keys.join(',') + ') VALUES (?,?,?)' , values, function (err, result) {
        if (err) {
            return done(err);
        }
        console.log('插入数据成功...');
        done(null, result);
    });
}

module.exports.getAll = function (tableName, done) {
    db.get().query('SELECT * FROM ' + tableName, function (err, rows) {
        if (err) {
            return done(err);
        }
        console.log('查询成功...');
        done(null, rows);
    });
}

module.exports.getAllByUser = function (tableName, userId, done) {
    db.get().query('SELECT * FROM ' + tableName + ' WHERE id=' + userId, function (err, rows) {
        if (err) {
            return done(err);
        }
        console.log('查询成功...');
        done(null, rows);
    })
}
