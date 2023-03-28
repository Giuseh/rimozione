const mysql = require('mysql2');

exports.db = () => {
    const con = mysql.createConnection({
        host: CONFIG.database.host,
        user: CONFIG.database.user,
        password: CONFIG.database.password,
        database: CONFIG.database.database,
        port: CONFIG.database.port
    });

    con.connect(err => {
        if (err) throw err;
        console.info("\x1b[34m[DATABASE CONNESSO]\x1b[0m");
    });

    setInterval(() => {
        con.query("SELECT 1");
    }, 300000); // 5 min

    return con;
}