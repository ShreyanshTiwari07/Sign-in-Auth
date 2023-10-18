const app = require("./app");
require("dotenv").config();
const PORT = process.env.PORT;
const startApp = () => {
  app.listen(PORT, () => {
    console.log(`Auth Backend running on port ${PORT}`);
  });
};

startApp();
