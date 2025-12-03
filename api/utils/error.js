// A function that returns an error message based on the parameters it receives

const error = (status, message) => {
  // Create an error object
  const err = new Error();

  // Update the created error object
  err.message = message;
  err.status = status;

  // Return the error object
  return err;
};

export default error;
