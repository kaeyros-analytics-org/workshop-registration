const mysql = require('mysql2');

// JC PRESTIGE
const MysqlDbConnectionConfig = mysql.createConnection({
  host: "mysqle8ad.netcup.net",
  port: 3306,
  user: "k198767_attendance",
  password: "6r%76hO0z",
  database: "k198767_attendance",
});

// k198767_sch_att_test
// k198767_jc_hotel_booking_user
// 1a4b3n0G*

MysqlDbConnectionConfig.connect(function(err) {
    if (err) throw err;
    console.log("Database Connected!"); 
});

export default MysqlDbConnectionConfig; 

