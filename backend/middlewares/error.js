// Custom Error Handler Class
class ErrorHandler extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}

// Error Middleware
const errorMiddleware = (err, req, res, next) => {
  // Default values for error
  err.message = err.message || "Internal Server Error";
  err.statusCode = err.statusCode || 500;

  // Handle specific error types
  if (err.code === 11000) {
    const message = `Duplicate field value: ${Object.keys(err.keyValue)}. Please use a different value.`;
    err = new ErrorHandler(message, 400);
  }

  if (err.name === "JsonWebTokenError") {
    const message = `Invalid JSON Web Token. Please try again.`;
    err = new ErrorHandler(message, 400);
  }

  if (err.name === "TokenExpiredError") {
    const message = `Your token has expired. Please log in again.`;
    err = new ErrorHandler(message, 400);
  }

  if (err.name === "CastError") {
    const message = `Invalid value for ${err.path}: ${err.value}`;
    err = new ErrorHandler(message, 400);
  }

  
  // Handle Mongoose validation errors
  const errorMessage = err.errors
    ? Object.values(err.errors)
        .map((error) => error.message)
        .join(" ")
    : err.message;

  // Send the error response
  return  res.status(err.statusCode).json({
    success: false,
    message: errorMessage,
  });
};
// Export ErrorHandler and middleware
export { ErrorHandler, errorMiddleware };
