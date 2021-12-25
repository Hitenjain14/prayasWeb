const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });
const mongoose = require('mongoose');

process.on('uncaughtException', (err) => {
  console.log('Uncaught Exception Shutting down..');
  console.log(err.name, err.message);
  process.exit(1);
});

const app = require('./app');

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(`Server running on ${port}...`);
});

process.on('unhandledRejection', (err) => {
  console.log('Unhandled Rejection Shutting down..');
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
