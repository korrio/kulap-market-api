const config = require( './config' );
const express = require('express');
const cluster = require('cluster');
const numCPUs = require('os').cpus().length;
const logger = require('./utils/logger');
const bodyParser = require('body-parser');
//import controllers
const healthcheckController = require('./controllers/controller-healthcheck');
const sampleController = require('./controllers/controller-sample');

//kulap's
const marketController = require('./controllers/controller-market');

if (cluster.isMaster) {
    // create a worker for each CPU
    for (let i = 0; i < numCPUs; i++) {
        cluster.fork();
    }
    cluster.on('online', (worker) => {
        logger.info(`worker online, worker id: ${worker.id}`);
    });
    //if worker dies, create another one
    cluster.on('exit', (worker, code, signal) => {
        logger.error(`worker died, worker id: ${worker.id} | signal: ${signal} | code: ${code}`);
        cluster.fork();
    });
} else {
    //create express app
    const app = express();
    const router = express.Router();

    app.use(bodyParser.json());
    app.use(router);  // tell the app this is the router we are using
    //healthcheck routes
    router.get('/', healthcheckController.healthcheck);
    router.get('/healthcheck', healthcheckController.healthcheck);
    // sampleController routes
    router.get('/servertime', sampleController.getTime);
    router.get('/transaction', sampleController.sampleTransaction);

    //market api endpoints
    router.get('/api/coins',marketController.coins);
    router.get('/api/pairs',marketController.pairs);
    router.get('/api/tickers',marketController.tickers);

    //example: .../api/orderbook?ticker_id=BTC_ETH&depth=200
    router.get('/api/orderbook',marketController.orderbook);
    //example: .../api/historical_trades?ticker_id=BTC_ETH&limit=10
    router.get('/api/historical_trade',marketController.historical_trade);

    app.listen(config.port, function () {
        logger.info(`worker started: ${cluster.worker.id} | server listening on port: ${config.port}`);
    });
}
