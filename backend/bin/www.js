"use strict";

const app = require("../app");
const PORT = process.env.PORT || 5000;
// const logger = require("../src/config/logger");

app.listen(PORT, () => {
  console.log(`${PORT} 포트에서 서버가 가동되었습니다.`);
});
