const logger = require('./../utils/logger');
const axios = require('axios')

module.exports.healthcheck = (req, res) => {
  res.json({
    status: 'ok',
    uptime: process.uptime(),
    name: package.name,
    version: package.version
  });
}

let getListed = async () => {
  let url = `https://api.kulap.io/v1/api/assets/listed`;
  let result = await axios.get(url);
  return result.data;
}

module.exports.coins = async (req, res) => {

  let listed_coins = await getListed();

  try {
    res.status(200).json(listed_coins);
  } catch (error) {
    logger.error(`pairs error: ${error.message}`);
    res.status(500).json({ status: 'error', message: error.message, statusCode: 500 });
  }
}

module.exports.pairs = async (req, res) => {

  let listed_coins = await getListed();
  let pairs = [];
  let main_coins = ["ETH","USDT"];
  listed_coins.forEach((coin)=>{
    console.log(coin);

    main_coins.forEach((main_coin)=>{
      pairs.push({
        "ticker_id": `${main_coin}_${coin}`,
        "base": main_coin,
        "target": coin,
      })
    })
    
  })

  try {
    // res.status(200).json({
    //   "ticker_id": "BTC_ETH",
    //   "base": "BTC",
    //   "target": "ETH",
    // });
    res.status(200).json(pairs);
  } catch (error) {
    logger.error(`pairs error: ${error.message}`);
    res.status(500).json({ status: 'error', message: error.message, statusCode: 500 });
  }
}

module.exports.tickers = async (req, res) => {
  try {
    res.status(200).json({
      "ticker_id": "BTC_ETH",
      "base_currency": "BTC",
      "target_currency": "ETH",
      "last_price": "50.0",
      "base_volume": "10",
      "target_volume": "500",
      "bid": "49.9",
      "ask": "50.1",
      "high": "51.3",
      "low": "49.2",
    });
  } catch (error) {
    logger.error(`tickers error: ${error.message}`);
    res.status(500).json({ status: 'error', message: error.message, statusCode: 500 });
  }
}

module.exports.orderbook = async (req, res) => {
  let ticker_id = req.query.ticker_id;
  let depth = req.query.depth;
  try {
    res.status(200).json({
      "ticker_id": "BTC_ETH",
      "timestamp": "1700050000",
      "bids": [
        [
          "49.8",
          "0.50000000"
        ],
        [
          "49.9",
          "6.40000000"
        ]
      ],
      "asks": [
        [
          "50.1",
          "9.20000000"
        ],
        [
          "50.2",
          "7.9000000"
        ]
      ]
    });
  } catch (error) {
    logger.error(`sampleTransaction error: ${error.message}`);
    res.status(500).json({ status: 'error', message: error.message, statusCode: 500 });
  }
}

module.exports.historical_trade = async (req, res) => {

  let ticker_id = req.query.ticker_id;
  let limit = req.query.limit;

  try {
    res.status(200).json({
      "buy": [{
        "trade_id": 1234567,
        "price": "50.1",
        "base_volume": "0.1",
        "target_volume": "1",
        "trade_timestamp": "1700050000",
        "type": "buy"
      }],
      "sell": [{
        "trade_id": 1234567,
        "price": "50.1",
        "base_volume": "0.1",
        "target_volume": "1",
        "trade_timestamp": "1700050000",
        "type": "sell"
      }]
    });
  } catch (error) {
    logger.error(`tickers error: ${error.message}`);
    res.status(500).json({ status: 'error', message: error.message, statusCode: 500 });
  }
}