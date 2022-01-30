const FETCH_INTERVAL = 5000;

function randomValue(min = 0, max = 1, precision = 0) {
  const random = Math.random() * (max - min) + min;
  return random.toFixed(precision);
}

function utcDate() {
  const now = new Date();
  return new Date(
    now.getUTCFullYear(),
    now.getUTCMonth(),
    now.getUTCDate(),
    now.getUTCHours(),
    now.getUTCMinutes(),
    now.getUTCSeconds()
  );
}

function getQuotes(socket, tickers) {
  const quotes = tickers.map((ticker) => ({
    index: ticker.index,
    name: ticker.name,
    price: randomValue(150, 250, 2),
    change: randomValue(150, 250, 2),
    change_percent: randomValue(0, 1, 2),
    dividend: randomValue(0, 1, 2),
    yield: randomValue(0, 2, 2),
    last_trade_time: utcDate(),
  }));

  socket.emit("ticker", quotes);
}

function trackTickers(socket, tickers) {
  // run the first time immediately
  getQuotes(socket, tickers);

  // every N seconds
  const timer = setInterval(function () {
    getQuotes(socket, tickers);
  }, FETCH_INTERVAL);

  socket.on("disconnect", function () {
    clearInterval(timer);
  });
}

module.exports = trackTickers;
