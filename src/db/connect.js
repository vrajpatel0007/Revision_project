const mongoose = require("mongoose");

const connectDB = () => {
  try {
       mongoose.connect(`${process.env.MONGODB_URL}`)
      console.log(`\n MongoDB connected !! `);
  } catch (error) {
      console.log("MONGODb connection error ", error);
      process.exit(1)
  }
}

module.exports = connectDB;
