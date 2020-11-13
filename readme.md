# KULAP's market APIs
```
npm i
npm run dev
```

## Run locally

healthcheck
```
curl http://localhost:3000/healthcheck
```

market
```
curl http://localhost:3000/api/pairs
curl http://localhost:3000/api/tickers
curl http://localhost:3000/api/orderbook?ticker_id=BTC_ETH&depth=200
curl http://localhost:3000/api/historical_trades?ticker_id=BTC_ETH&limit=10
```
