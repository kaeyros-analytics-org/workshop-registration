import MysqlDbConnectionConfig from "@/lib/mysqldb";
import { NextRequest } from "next/server";
// import next from "next/types";

const UserClass = class {
    static getAllUsers () {
        return new Promise ((NextRequest) => {
            try {
                MysqlDbConnectionConfig.query(
                    // "SELECT id, caption, category, time, place, date, description, img, address, link, total_space, reserved_space, total_remaining_space FROM programs", (err, result, fields) => {
                    "SELECT * FROM users", (err, result, fields) => {
                        if (err) {
                            throw err;
                        }
                        NextRequest(result)
                    }
                )
            } catch (error) {
                throw error;
            }
        })
    }; 

    static getByUserID(id) {

        return new Promise((NextRequest) => {

            try {
                console.log("----ID----", id)
                MysqlDbConnectionConfig.query("SELECT * FROM users WHERE id = " + id, function (err, result, fields) {
                    if (err) throw err;
                    NextRequest(result)
                });
            } catch (error) {
               throw error;
            }
        })

    }; 


    static getUserByEmail(email) {

        return new Promise((NextRequest) => {

            try {
                console.log("----EMAIL----", email)
                MysqlDbConnectionConfig.query(`SELECT * FROM users WHERE email = "${ email }"`, function (err, result, fields) {
                    if (err) throw err;
                    NextRequest(result)
                });
            } catch (error) {
               throw error;
            }
        })

    }; 


    // GET USER EMAIL 
    static getUserEmail(email) {

        console.log("DADADADADADADADA: ", email)

        return new Promise((NextRequest) => {

            MysqlDbConnectionConfig.query(`SELECT email FROM users WHERE email = "${email}"`,function (err, result, fields) {
                if (err) {
                    console.log(err)
                    throw err;
                }
                NextRequest(result)
            })
        })
    }

    static getUserPassword(email) {

        return new Promise((NextRequest) => {

            MysqlDbConnectionConfig.query(`SELECT password FROM users WHERE email = "${email}"`,function (err, result, fields) {
                if (err) {
                    console.log(err)
                    throw err;
                }
                NextRequest(result)
            })
        })

    }

    static addUser(userData) {
        // let date_heur = new Date().toString();
        console.log("the userData: ----", userData)
        return new Promise((NextRequest) => {

            if (userData !== undefined) {

                MysqlDbConnectionConfig.query(`INSERT INTO users(email, password, forgotPasswordToken, forgotPasswordTokenExpiry, isAdmin, isVerified, verifyToken, verifyTokenExpiry) VALUES(?, ?, ?, ?, ?, ?, ?, ?)`, [ userData.email, userData.password, userData.forgotPasswordToken, userData.forgotPasswordTokenExpiry, userData.isAdmin, userData.isVerified, userData.verifyToken, userData.verifyTokenExpiry ], function (err, result, fields) {
                    if (err) throw err;
                    MysqlDbConnectionConfig.query(`SELECT LAST_INSERT_ID()`, function (err, res, fields) {
                        if (err) throw err;
                        NextRequest(res[0]['LAST_INSERT_ID()'])
                    });
                });

            } else {
                NextRequest(new Error(config.errors.noNameValue))
            }
        })
    }

    static updateUser(id, params) {
        return new Promise((NextRequest) => {

            console.log("PARAMS IN THE DB QUERY: ", params)

            if (params !== undefined) {
                MysqlDbConnectionConfig.query("UPDATE users SET email = ?, password = ? WHERE id = ?", [ params.email, params.password, id ], function (err, result, fields) {
                    if (err) throw err; 
                    NextRequest(result)
                })
            } else {
                NextRequest(new Error(config.errors.noNameValue))
            }
        })
    }

    // Supprime un customers via son ID
    static deleteUser(id) {

        try {
            return new Promise((NextRequest) => {
                db.query(`DELETE FROM user WHERE id = ${id}`, function (err, result, fields) {
                    if (err) throw err;
                    NextRequest(result)
                });
            })
        } catch (error) {
            
        }
    }
}

export default UserClass; 