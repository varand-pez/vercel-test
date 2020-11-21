import mongoose from "mongoose";

let isConnected = false;
const URI = process.env.DB_HOST;
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
};

async function dbConnect() {
  if (isConnected) {
    return;
  }

  const db = await mongoose.connect(URI, options);
  isConnected = !!db.connections[0].readyState;
  console.log("connection", isConnected);
}

export default dbConnect;
