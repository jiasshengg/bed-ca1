module.exports = (req, res, next) => {
  // listen for the 'finish' event on the response object
  res.on("finish", () => {
    // to log the status code of the response when the request is complete
    console.log(`Status Code: ${res.statusCode}`);
  });
  next(); 
};
