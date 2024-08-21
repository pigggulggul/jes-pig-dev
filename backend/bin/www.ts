"use strict";

const startApp = require("../src/app.ts");
const PORT = process.env.PORT || 5000;
// const logger = require("../src/config/logger");

startApp.listen(PORT, () => {
  console.log(`${PORT} 포트에서 서버가 가동되었습니다.`);
});
