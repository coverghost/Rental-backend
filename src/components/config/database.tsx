// import { MongoClient } from "mongodb";

// const MONGO_URL = "mongodb://0.0.0.0:27017/arya-bank"; // Replace with your MongoDB connection URL
// const dbName = "arya-bank"; // Replace with your desired database name

// export async function connectAndInsertData() {
//   try {
//     const client = await MongoClient.connect(MONGO_URL);
//     const db = client.db(dbName);
//     const collection = db.collection(collectionName);

    

//     const result = await collection.deleteMany();
//     console.log(
//       `${result} documents inserted into "${collectionName}" collection.`
//     );

//     client.close();
//   } catch (error) {
//     console.log("Error connecting to MongoDB:", error);
//   }
// }

import mongoose from "mongoose";

const MONGO_URL = "mongodb://0.0.0.0:27017/arya-bank"; // Replace with your MongoDB connection URL

export const connectToDatabase = async () => {
  try {
    await mongoose.connect(MONGO_URL);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
};

export const db = mongoose.connection;
