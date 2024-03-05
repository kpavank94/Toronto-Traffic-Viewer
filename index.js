const express = require('express');
const app = express();
const https = require('https');
const { spawn } = require('child_process');

// Set up a route to serve the information
app.get('/', (req, res) => {
    res.send('Information will be displayed here2');
});

// Set up a route to serve the information
app.get('/get-red-light-cameras', (req, res) => {
  // Call the separate Node.js script
  const process = spawn('node', ['retrieve-red-light-cameras.js']);

  process.stdout.on('data', (data) => {
      // Send the data to the client
      res.send(data.toString());
  });

  process.stderr.on('data', (data) => {
      console.error(`stderr: ${data}`);
  });

  process.on('close', (code) => {
      console.log(`child process exited with code ${code}`);
  });
});

// Start the server
const port = 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

// Call the separate Node.js script every 10 seconds
setInterval(() => {
    const process = spawn('node', ['retrieve-red-light-cameras.js']);

    process.stdout.on('data', (data) => {
        console.log(`stdout: ${data}`);
    });

    process.stderr.on('data', (data) => {
        console.error(`stderr: ${data}`);
    });

    process.on('close', (code) => {
        console.log(`child process exited with code ${code}`);
    });
}, 10000);
