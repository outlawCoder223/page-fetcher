const request = require('request');
const fs = require('fs');

const url = process.argv[2];
const path = process.argv[3];

request(url, (error, response, body) => {
  fs.writeFile(path, body, (err) => {
    if (err) return console.log(err);
    const stats = fs.statSync(path);
    const fileSize = stats['size'];
    console.log(`Downloaded and saved ${fileSize} bytes to ${path}`);
  });
});

