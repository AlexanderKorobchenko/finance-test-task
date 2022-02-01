const mongoose = require("mongoose");
require("dotenv").config();

const { server } = require("../app");
const { PORT = 4000, DB_HOST } = process.env;

mongoose
  .connect(DB_HOST)
  .then(() => {
    server.listen(PORT, () => {
      console.log(`Streaming service is running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });
