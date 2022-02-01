const express = require("express");

const { Ticker } = require("../../model");
const { authentication } = require("../../middlewares");
const { ROUTE_ADD_TICKER, ROUTE_DELETE_TICKER } = process.env;

const router = express.Router();

router.post(`/${ROUTE_ADD_TICKER}`, async (req, res, next) => {
  try {
    const newTicker = await Ticker.create({ ...req.body });
    res.status(201).json(newTicker);
  } catch (error) {
    next(error);
  }
});

router.delete(`/${ROUTE_DELETE_TICKER}`, async (req, res, next) => {
  try {
    //findOneAndRemove( name or index)
  } catch (error) {
    next(error);
  }
});

router.patch("/:tickerId/favorite", authentication, async (req, res, next) => {
  try {
    const { _id } = req.user;
    const { tickerId } = req.params;

    const tempTicker = await Ticker.findById(tickerId);
    const favoriteUsers = tempTicker.favorite;

    if (favoriteUsers.includes(_id)) {
      // favoriteUsers.filter((el) => el !== _id);
      const indx = favoriteUsers.indexOf(_id);
      favoriteUsers.splice(indx, 1);
    } else {
      favoriteUsers.push(_id);
    }

    const updateItem = await Ticker.findByIdAndUpdate(
      tickerId,
      { favorite: favoriteUsers },
      {
        new: true,
      }
    );

    res.json(updateItem);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
