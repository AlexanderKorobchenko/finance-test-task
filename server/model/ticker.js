const { Schema, model } = require("mongoose");

const tickerSchema = Schema(
  {
    index: String,
    name: String,
    favorite: {
      type: Array,
      default: [],
    },
  },
  { versionKey: false }
);

const Ticker = model("ticker", tickerSchema);

module.exports = Ticker;
