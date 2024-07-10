const mongoose = require("mongoose");
//203.175.72.50/32
//username: realahmedali4
//password: Y71wPpoXA2IsFH0u

const connectDB = async () => {
  try {
    //"mongodb+srv://realahmedali4:Y71wPpoXA2IsFH0u@cluster000001.ecfeinx.mongodb.net/mydatabase?retryWrites=true&w=majority&appName=Cluster000001"

    const conn = await mongoose.connect(
      "mongodb+srv://realahmedali4:Y71wPpoXA2IsFH0u@cluster000001.ecfeinx.mongodb.net/MERN_AI_CHATBOT?retryWrites=true&w=majority&appName=Cluster000001"
    );
    console.log(`Mongodb connected ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error connecting to mongodb ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
