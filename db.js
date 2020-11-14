// const connection = mysql.createConnection({
//   host: 'mysql',
//   user: 'root',
//   password: 'root',
//   database: 'macos',
//   port: 3306,
// });
// connection.connect();
// connection.query('SELECT 1 + 1 AS solution', function (err, rows, fields) {
//   console.log('DB FAIL', err);
//   if (err) throw err;
//   console.log('CONNECTED: The solution is: ', rows[0].solution)
// });

// exports = {
//   connection
// }
const mysql = require('mysql');

const pool = mysql.createPool({
  host: 'mysql',
  user: 'root',
  password: 'root',
  database: 'macos',
  port: 3306,
});

exports.connection = {
  query: function () {
    const queryArgs = Array.prototype.slice.call(arguments),
      events = [],
      eventNameIndex = {};

    pool.getConnection(function (err, conn) {
      if (err) {
        if (eventNameIndex.error) {
          eventNameIndex.error();
        }
      }
      if (conn) {
        const q = conn.query.apply(conn, queryArgs);
        q.on('end', function () {
          conn.release();
        });

        events.forEach(function (args) {
          q.on.apply(q, args);
        });
      }
    });

    return {
      on: function (eventName, callback) {
        events.push(Array.prototype.slice.call(arguments));
        eventNameIndex[eventName] = callback;
        return this;
      }
    };
  }
};
