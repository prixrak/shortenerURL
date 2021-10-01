import express from "express"; // create server by express
import config from "config"; // for constants
import mongoose from "mongoose"; // for DB

// constants
const PORT = config.get("port") || 3000;

const app = express(); 

async function start() {
  try {
    await mongoose.connect(config.get('mongoUri'), {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    });
    app.listen(PORT, () => console.log(`[+] Server has been started on port: ${PORT}`));
  } catch (e) {
    console.log('Server Error', e.message)
    process.exit(1)
  }
}

