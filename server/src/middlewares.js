const notFound = (req, res, next) => {
  const error = new Error(`Not Found = ${req.originalUrl}`);
  res.status(404);
  // next will go to the next middleware
  // if we pass in error, we will go to error handling middleware
  next(error);
};

// eslint-disable-next-line no-unused-vars
const errorHandler = (error, req, res, next) => {
  // if it is not 404, it comes from other part of the server
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);

  // only want to show stack in dev mode
  res.json({
    message: error.message,
    stack: process.env.NODE_ENV === 'production' ? 'pancake' : error.stack,
  });
};

module.exports = { notFound, errorHandler };
