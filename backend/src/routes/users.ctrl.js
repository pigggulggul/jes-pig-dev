"use strict";

const User = require("../models/User");

const output = {
  home: (req, res) => {
    console.log(`GET / 200 "홈 화면으로 이동"`);
    res.render("index");
  },

  login: (req, res) => {
    console.log(`GET / 200 "로그인 화면으로 이동"`);
    res.render("login");
  },

  register: (req, res) => {
    console.log(`GET / 200 "회원가입 화면으로 이동"`);
    res.render("register");
  },
};

const process = {
  login: async (req, res) => {
    const user = new User(req.body);
    const response = await user.login();
    if (response.err) {
      console.log(
        `POST /login 200 Response: "success: ${response.success}, ${response.err}"`
      );
    } else
      console.log(
        `POST /login 200 Response: "success: ${response.success}, msg: ${response.msg}"`
      );
    return res.json(response);
  },
  register: async (req, res) => {
    const user = new User(req.body);
    const response = await user.register();
    if (response.err) {
      console.log(
        `POST /register 200 Response: "success: ${response.success}, ${response.err}"`
      );
    } else
      console.log(
        `POST /register 200 Response: "success: ${response.success}, msg: ${response.msg}"`
      );
    return res.json(response);
  },
};

module.exports = {
  output,
  process,
};
