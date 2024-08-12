"use strict";

const db = require("../config/db");

//UserStorage에서는 DB를 CRUD 기능만 함.
class UserStorage {
  static getUserInfo(id) {
    // Promise 안의 구문이 성공하면 resolve를 실행하고 실패시 reject를 실행한다.
    return new Promise((resolve, reject) => {
      const query = "SELECT * FROM users where id=?;";
      db.query(query, [id], (err, data) => {
        if (err) reject(`${err}`);
        else resolve(data[0]);
      });
    });
  }
  static async save(userInfo) {
    return new Promise((resolve, reject) => {
      const query = "INSERT INTO users(id, name, psword) VALUES (?, ?, ?);";
      db.query(query, [userInfo.id, userInfo.name, userInfo.psword], (err) => {
        if (err) reject(`${err}`);
        else resolve({ success: true });
      });
    });
  }
}
module.exports = UserStorage;
