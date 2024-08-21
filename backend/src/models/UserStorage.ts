"use strict";

const db = require("../config/db.ts");

//UserStorage에서는 DB를 CRUD 기능만 함.
class UserStorage {
  static getUserInfo(id: string) {
    // Promise 안의 구문이 성공하면 resolve를 실행하고 실패시 reject를 실행한다.
    return new Promise((resolve, reject) => {
      const query =
        "SELECT userId,userPassword,nickname FROM users where userId=?;";
      //성공시 data를 반환하고 data에는 필요한 것들이 배열로 들어잇음
      db.query(query, [id], (err: Error, data: any) => {
        if (err) reject(`${err}`);
        else {
          resolve(data[0]);
        }
      });
    });
  }
  static async save(userInfo: {
    userId: string;
    userPassword: string;
    nickname: string;
  }) {
    return new Promise((resolve, reject) => {
      const query =
        "INSERT INTO users(userId, userPassword, nickname) VALUES (?, ?, ?);";
      db.query(
        query,
        [userInfo.userId, userInfo.userPassword, userInfo.nickname],
        (err: Error) => {
          if (err) reject(`${err}`);
          else resolve({ success: true });
        }
      );
    });
  }
}
module.exports = UserStorage;
