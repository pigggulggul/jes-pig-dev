"use strict";

const db = require("../config/db.js");

//UserStorage에서는 DB를 CRUD 기능만 함.
class UserStorage {
  static getUserInfo(id) {
    // Promise 안의 구문이 성공하면 resolve를 실행하고 실패시 reject를 실행한다.
    return new Promise((resolve, reject) => {
      const query =
        "SELECT userId,userPassword,nickname FROM users where userId=?;";
      //성공시 data를 반환하고 data에는 필요한 것들이 배열로 들어잇음
      db.query(query, [id], (err, data) => {
        if (err) reject(`${err}`);
        else {
          resolve(data[0]);
        }
      });
    });
  }
  static async save(userInfo) {
    return new Promise((resolve, reject) => {
      const query =
        "INSERT INTO users(userId, userPassword, nickname) VALUES (?, ?, ?);";
      db.query(
        query,
        [userInfo.userId, userInfo.userPassword, userInfo.nickname],
        (err) => {
          if (err) reject(`${err}`);
          else resolve({ success: true });
        }
      );
    });
  }
  static async findOne(userId) {
    return new Promise((resolve, rejects) => {
      const query = "SELECT userId FROM users WHERE userId=?;";
      db.query(query, [userId], (err, data) => {
        if (err) rejects(`${err}`);
        else {
          if (data.length === 0) {
            resolve({ success: true });
          } else {
            resolve({ success: false });
          }
        }
      });
    });
  }
}
module.exports = UserStorage;
