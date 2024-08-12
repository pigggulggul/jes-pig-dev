"use strict";

const UserStorage = require("./UserStorage");

//User에서는 CRUD를 통해 반환받은 데이터들을 검증하고 조작.
class User {
  constructor(body) {
    this.body = body;
  }

  async login() {
    const client = this.body;
    try {
      //await는 promise를 반환하는 애한테만 할 수
      const { id, psword } = await UserStorage.getUserInfo(client.id);
      if (id) {
        if (id === client.id && psword === client.psword) {
          return { success: true };
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
      const response = await UserStorage.save(client);
      return response;
    } catch (err) {
      return { success: false, err };
    }
  }
}
module.exports = User;
