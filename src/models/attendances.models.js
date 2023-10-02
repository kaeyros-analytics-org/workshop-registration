import MysqlDbConnectionConfig from "@/lib/mysqldb";
import { NextRequest } from "next/server";
// import next from "next/types";

const AttendanceClass = class {
  static getAllAttendances() {
    return new Promise((NextRequest) => {
      try {
        MysqlDbConnectionConfig.query(
          // "SELECT id, caption, category, time, place, date, description, img, address, link, total_space, reserved_space, total_remaining_space FROM programs", (err, result, fields) => {
          "SELECT * FROM attendance",
          (err, result, fields) => {
            if (err) {
              throw err;
            }
            NextRequest(result);
          }
        );
      } catch (error) {
        throw error;
      }
    });
  }

  static getAttendanceByUserID(user_id) {
    return new Promise((NextRequest) => {
      try {
        console.log("----ID----", user_id);
        MysqlDbConnectionConfig.query(
          "SELECT * FROM attendance WHERE user_id = " + user_id,
          function (err, result, fields) {
            if (err) throw err;
            NextRequest(result);
          }
        );
      } catch (error) {
        throw error;
      }
    });
  }

  //   static getUserByEmail(email) {
  //     return new Promise((NextRequest) => {
  //       try {
  //         console.log("----EMAIL----", email);
  //         MysqlDbConnectionConfig.query(
  //           `SELECT * FROM attendance WHERE email = "${email}"`,
  //           function (err, result, fields) {
  //             if (err) throw err;
  //             NextRequest(result);
  //           }
  //         );
  //       } catch (error) {
  //         throw error;
  //       }
  //     });
  //   }

  // GET USER EMAIL
  //   static getUserEmail(email) {
  //     console.log("DADADADADADADADA: ", email);

  //     return new Promise((NextRequest) => {
  //       MysqlDbConnectionConfig.query(
  //         `SELECT email FROM attendance WHERE email = "${email}"`,
  //         function (err, result, fields) {
  //           if (err) {
  //             console.log(err);
  //             throw err;
  //           }
  //           NextRequest(result);
  //         }
  //       );
  //     });
  //   }

  //   static getUserPassword(email) {
  //     return new Promise((NextRequest) => {
  //       MysqlDbConnectionConfig.query(
  //         `SELECT password FROM users WHERE email = "${email}"`,
  //         function (err, result, fields) {
  //           if (err) {
  //             console.log(err);
  //             throw err;
  //           }
  //           NextRequest(result);
  //         }
  //       );
  //     });
  //   }

  static addAttendances(attendanceData) {
    // let date_heur = new Date().toString();
    console.log("the attendanceData: ----", attendanceData);
    return new Promise((NextRequest) => {
      if (attendanceData !== undefined) {
        MysqlDbConnectionConfig.query(
          `INSERT INTO attendance(date, time, user_id, name) VALUES(?, ?, ?, ?)`,
          [
            attendanceData.date,
            attendanceData.time,
            attendanceData.user_id,
            attendanceData.name,
          ],
          function (err, result, fields) {
            if (err) throw err;
            MysqlDbConnectionConfig.query(
              `SELECT LAST_INSERT_ID()`,
              function (err, res, fields) {
                if (err) throw err;
                NextRequest(res[0]["LAST_INSERT_ID()"]);
              }
            );
          }
        );
      } else {
        NextRequest(new Error(config.errors.noNameValue));
      }
    });
  }

  //   static addAttendances(attendanceData) {
  //     // let date_heur = new Date().toString();
  //     console.log("the attendanceData: ----", attendanceData);
  //     return new Promise((NextRequest) => {
  //       if (attendanceData !== undefined) {
  //         MysqlDbConnectionConfig.query(
  //           `INSERT INTO attendance(name, date_of_birth, age, gender, highest_education, minimum_required_education, field_study, from_institute, contact, comment) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
  //           [
  //             userData.name,
  //             userData.date_of_birth,
  //             userData.age,
  //             userData.gender,
  //             userData.highest_education,
  //             userData.minimum_required_education,
  //             userData.field_study,
  //             userData.from_institute,
  //             userData.contact,
  //             userData.comment,
  //           ],
  //           function (err, result, fields) {
  //             if (err) throw err;
  //             MysqlDbConnectionConfig.query(
  //               `SELECT LAST_INSERT_ID()`,
  //               function (err, res, fields) {
  //                 if (err) throw err;
  //                 NextRequest(res[0]["LAST_INSERT_ID()"]);
  //               }
  //             );
  //           }
  //         );
  //       } else {
  //         NextRequest(new Error(config.errors.noNameValue));
  //       }
  //     });
  //   }

  //   static updateUser(id, params) {
  //     return new Promise((NextRequest) => {
  //       console.log("PARAMS IN THE DB QUERY: ", params);

  //       if (params !== undefined) {
  //         MysqlDbConnectionConfig.query(
  //           "UPDATE users SET email = ?, password = ? WHERE id = ?",
  //           [params.email, params.password, id],
  //           function (err, result, fields) {
  //             if (err) throw err;
  //             NextRequest(result);
  //           }
  //         );
  //       } else {
  //         NextRequest(new Error(config.errors.noNameValue));
  //       }
  //     });
  //   }

  // Supprime un customers via son ID
  //   static deleteUser(id) {
  //     try {
  //       return new Promise((NextRequest) => {
  //         db.query(
  //           `DELETE FROM user WHERE id = ${id}`,
  //           function (err, result, fields) {
  //             if (err) throw err;
  //             NextRequest(result);
  //           }
  //         );
  //       });
  //     } catch (error) {}
  //   }
};

export default AttendanceClass;
