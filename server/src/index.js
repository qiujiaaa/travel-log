const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');

const app = express();
app.use(morgan('common'));
app.use(helmet());
app.use(
  cors({
    origin: 'http://localhost:3000',
  })
);

app.get('/', (req, res) => {
  res.json({
    message: 'Hello World',
  });
});

// notfound middleware
app.use((req, res, next) => {
  const error = new Error(`Not Found = ${req.originalUrl}`);
  res.status(404);
  // next will go to the next middleware
  // if we pass in error, we will go to error handling middleware
  next(error);
});

// error handling middleware (must have 4 parameters)
// eslint-disable-next-line no-unused-vars
app.use((error, req, res, next) => {
  // if it is not 404, it comes from other part of the server
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);

  // only want to show stack in dev mode
  res.json({
    message: error.message,
    stack: process.env.NODE_ENV === 'production' ? 'pancake' : error.stack,
  });
});

const port = process.env.PORT || 1337;
app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
