// requirements
const request = require('request');
const fs = require('fs');

// get command line info for the url and file path
const url = process.argv[2];
const filePath = process.argv[3];

// function to download and save the data to a specific path
const fetchData = function(url, filePath) {
  // checks if both file path and url were entered
  if (!filePath || !url) {
    console.log("Need to enter url AND file path");
    return;
  }
  
  // checks if it can load the url & loads url
  request(url, (err, res, body) => {
    if (err) {
      console.log('Unable to load url: ', err);
      return;
    }

    // writes file with requested data (overwrites it if the path already exists)
    fs.writeFile(filePath, body, (err) => {
      if (err) {
        console.log("Path is invalid: ", err);
      } else {
        console.log(`Downloaded and saved ${body.length} bytes to ${filePath}`);
      }
    });
  });
};

fetchData(url, filePath);
