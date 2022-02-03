const express = require("express");
const http = require("http");
const logger = require("morgan");
const cors = require("cors");
const io = require("socket.io");

const trackTickers = require("./helpers/createTickers");
const { tickersRouter } = require("./routes/api");
const usersRouter = require("./routes/api/users");
const { Ticker } = require("./model");
const { authentication } = require("./middlewares");

const app = express();
const server = http.createServer(app);
const formatsLogger = app.get("env") === "development" ? "dev" : "short";
const tickers = [];
const socketServer = io(server, {
  cors: {
    origin: "*",
  },
});

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.get("/", async (req, res, next) => {
  try {
    const data = await Ticker.find({});
    tickers.length = 0;
    data.forEach((el) => tickers.push(el));
    res.status(200).json({ message: "Get all: success" });
  } catch (error) {
    next(error);
  }
});

app.use("/api/users", usersRouter);
app.use("/api/tickers", tickersRouter);

app.get("/favorite", authentication, async (req, res, next) => {
  try {
    const { _id } = req.user;
    const data = await Ticker.find({});
    const filteredData = data.filter((el) => el.favorite.includes(_id));
    tickers.length = 0;
    filteredData.forEach((el) => tickers.push(el));
    res.status(200).json({ message: "Get favorite: success" });
  } catch (error) {
    next(error);
  }
});

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});

socketServer.on("connection", (socket) => {
  socket.on("start", () => {
    trackTickers(socket, tickers);
  });
});

module.exports = { server };
