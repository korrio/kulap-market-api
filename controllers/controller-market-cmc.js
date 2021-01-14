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

module.exports.summary = async (req, res) => {

  try {
  	// (Price of WBTC is quoted in USD) 
    let json =  [{
    "trading_pairs": "USDT_WBTC",
    "base_currency": "USDT",
    "quote_currency": "WBTC",
    "last_price": 0.0000203,
    "lowest_ask": 0.0000213,
    "highest_bid": 0.0000202,
    "base_volume": 350700,
    "quote_volume": 7.139649999999999,
    "price_change_percent_24h": -0.49019607843137253,
    "highest_price_24h": 0.0000204,
    "lowest_price_24h": 0.0000203
  }];
    res.status(200).json(listed_coins);
  } catch (error) {
    logger.error(`pairs error: ${error.message}`);
    res.status(500).json({ status: 'error', message: error.message, statusCode: 500 });
  }
}

module.exports.assets = async (req, res) => {

  let listed_coins = await getListed();
  let pairs = [];
  let main_coins = ["ETH", "USDT"];
  listed_coins.forEach((coin) => {
    console.log(coin);

    main_coins.forEach((main_coin) => {
      pairs.push({
        "ticker_id": `${main_coin}_${coin}`,
        "base": main_coin,
        "target": coin,
      })
    })

  })

  try {
    res.status(200).json(pairs);
  } catch (error) {
    logger.error(`pairs error: ${error.message}`);
    res.status(500).json({ status: 'error', message: error.message, statusCode: 500 });
  }
}

module.exports.tickers = async (req, res) => {
  try {
    // res.status(200).json({
    //   "ticker_id": "BTC_ETH",
    //   "base_currency": "BTC",
    //   "target_currency": "ETH",
    //   "last_price": "50.0",
    //   "base_volume": "10",
    //   "target_volume": "500",
    //   "bid": "49.9",
    //   "ask": "50.1",
    //   "high": "51.3",
    //   "low": "49.2",
    // });

    res.status(200).json({  
   "USDT_USDC":{  
      "name":"bitcoin",
      "unified_cryptoasset_id" :"1", //<-- id ref: https://pro-api.coinmarketcap.com/v1/cryptocurrency/map?CMC_PRO_API_KEY=UNIFIED-CRYPTOASSET-INDEX&listing_status=active
      "can_withdraw":"true",
      "can_deposit":"true",
      "min_withdraw":"0.01",
      "max_withdraw ":"100", 
      "name":"bitcoin",
      "maker_fee":"0.01",
      "taker_fee":"0.01",
   },
   "USDT_DAI":{  
      "name":"ethereum",
      "unified_cryptoasset_id":"1027", //<-- id ref: https://pro-api.coinmarketcap.com/v1/cryptocurrency/map?CMC_PRO_API_KEY=UNIFIED-CRYPTOASSET-INDEX&listing_status=active
      "can_withdraw":"false",
      "can_deposit":"false",
      "min_withdraw":"10.00",
      "max_withdraw ":"0.00", 
      "maker_fee":"0.01",
      "taker_fee":"0.01",
   }
}
);
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
      "market_pair": "BTC_ETH",
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

module.exports.trade = async (req, res) => {

  let ticker_id = req.query.ticker_id;
  let limit = req.query.limit;

  try {
    res.status(200).json({
      "buy": [{
        "trade_id": 3523643,
        "price": "0.01",
        "base_volume": "ธนานนท์",
        "quote_volume": "0.01000000",
        "timestamp": "‭1585177482652‬",
        "type": "sell"
      }]
    });
  } catch (error) {
    logger.error(`tickers error: ${error.message}`);
    res.status(500).json({ status: 'error', message: error.message, statusCode: 500 });
  }
}