"use strict";

const userStorage = require("./UserStorage.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
//User에서는 CRUD를 통해 반환받은 데이터들을 검증하고 조작.
class User {
  constructor(body) {
    this.body = body;
  }

  async login() {
    const client = this.body;
    console.log(client, "client 확인");
    try {
      //await는 promise를 반환하는 애한테만 할 수
      const { userId, userPassword } = await userStorage.getUserInfo(
        client.userId
      );
      const checkPw = await bcrypt.compare(client.userPassword, userPassword);
      if (userId) {
        if (userId === client.userId && checkPw) {
          const token = jwt.sign(
            {
              id: userId,
              exp: Math.floor(Date.now() / 1000) + 60 * 60,
            },
            process.env.JWT_SECRET
          );

          return { success: true, token: token, msg: "" };
        }
        return { success: false, msg: "비밀번호가 틀렸습니다" };
      }
      return { success: false, msg: "존재하지 않는 아이디입니다." };
    } catch (err) {
      return { success: false, err };
    }
  }

  async register() {
    const client = this.body;
    try {
      const isValid = await userStorage.findOne(client.userId);
      console.log(isValid);
      if (isValid.success) {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(client.userPassword, salt);
        const hashClient = {
          userId: client.userId,
          userPassword: hashedPassword,
          nickname: client.nickname,
        };
        const response = await userStorage.save(hashClient);
        return response;
      } else {
        return { success: false, msg: "아이디가 중복되었습니다" };
      }
    } catch (err) {
      return { success: false, err };
    }
  }
}
module.exports = User;
