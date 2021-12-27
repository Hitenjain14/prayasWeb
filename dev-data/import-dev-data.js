const fs = require('fs');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const upcomingEvents = require('./../models/upcomingEvents');
const User = require('../models/userModel');

dotenv.config({ path: './config.env' });

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);
console.log(DB);
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('DB connection successful!');
  });

//READ JSON FILE
const events = JSON.parse(
  fs.readFileSync(`${__dirname}/userInfo.json`, 'utf-8')
);

//IMPORT DATA INTO DB

const importData = async () => {
  try {
    await User.create(events);
    console.log('Data successfully imported');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

//DELETE ALL DATA

const deleteData = async () => {
  try {
    await upcomingEvents.deleteMany();
    console.log('Data successfully deleted');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

if (process.argv[2] === '--import') {
  importData();
} else if (process.argv[2] === '--delete') {
  deleteData();
}
