"use strict";

const userStorage = require("./UserStorage.ts");

//User에서는 CRUD를 통해 반환받은 데이터들을 검증하고 조작.
class User {
  body: any;
  constructor(body: any) {
    this.body = body;
  }

  async login() {
    const client = this.body;
    console.log(client, "cluent 확인");
    try {
      //await는 promise를 반환하는 애한테만 할 수
      const { userId, userPassword } = await userStorage.getUserInfo(
        client.userId
      );
      if (userId) {
        if (userId === client.userId && userPassword === client.userPassword) {
          return { success: true, msg: "" };
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
      const response = await userStorage.save(client);
      return response;
    } catch (err) {
      return { success: false, err };
    }
  }
}
module.exports = User;
