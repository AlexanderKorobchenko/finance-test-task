const express = require("express");
const http = require("http");
const logger = require("morgan");
const cors = require("cors");
const io = require("socket.io");

const trackTickers = require("./helpers/createTickers");
const { Ticker } = require("./model");
const { ROUTE_ADD } = process.env;

const app = express();
const server = http.createServer(app);
const formatsLogger = app.get("env") === "development" ? "dev" : "short";
const socketServer = io(server, {
  cors: {
    origin: "*",
  },
});

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.get("/", async function (req, res, next) {
  try {
    const tickers = await Ticker.find({});

    socketServer.on("connection", (socket) => {
      socket.on("start", () => {
        trackTickers(socket, tickers);
      });
    });
    res.sendFile(__dirname + "/index.html");
  } catch (error) {
    next(error);
  }
});

app.post(`/${ROUTE_ADD}`, async (req, res, next) => {
  try {
    const newTicker = await Ticker.create({ ...req.body });
    res.status(201).json(newTicker);
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

module.exports = server;
