const request = require('request');
const fs = require('fs');
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});
// grab both command line args.
const url = process.argv[2];
const path = process.argv[3];

// make my http request
request(url, (error, response, body) => {
  // if valid request move forward or else log error and response code.
  if (!error && response.statusCode < 300) {
    // check if file already exists
    fs.access(path, (err) => {
      if (err) {
        console.log('Writing your file...');
        // write body of request to file specified by path.
        fs.writeFile(path, body, (err) => {
          if (err) return console.log(err);
          const stats = fs.statSync(path);
          const fileSize = stats['size'];
          console.log(`Downloaded and saved ${fileSize} bytes to ${path}`);
          rl.close();
        });
      } else {
        rl.question('That file already exists do you want to overwrite it? (y/n) ', (reply) => {
          if (reply === 'y') {
            console.log('Overwriting the file...')
            // write body of request to file specified by path.
            fs.writeFile(path, body, (err) => {
              if (err) return console.log(err);
              const stats = fs.statSync(path);
              const fileSize = stats['size'];
              console.log(`Downloaded and saved ${fileSize} bytes to ${path}`);
            });
            rl.close();
          } else {
            rl.close();
          }
        });
      }
  });
    
  } else {
    console.log('Error: ', error);
    console.log('Response Code: ', response.statusCode);
  }
  
});

