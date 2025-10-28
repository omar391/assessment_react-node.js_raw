const express = require('express');
const repack = require('jsonretype');
const cors = require('cors');
const userRouter = require('./routes/userRoute.js');
const foodRouter = require('./routes/foodRoute.js');
const cartRouter = require('./routes/cartRoute.js');
const orderRouter = require('./routes/orderRoute.js');

const createApp = () => {
  const app = express();

  app.use(express.json());
  app.use(cors());
  app.use(repack());

  app.use('/api/food', foodRouter);
  app.use('/images', express.static('uploads'));
  app.use('/api/user', userRouter);
  app.use('/api/cart', cartRouter);
  app.use('/api/order', orderRouter);

  app.get('/', (req, res) => {
    res.send('API working');
  });

  return app;
};

module.exports = { createApp };
