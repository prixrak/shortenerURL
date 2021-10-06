import express from "express"; // create server by express
import config from "config"; // for constants
import mongoose from "mongoose"; // for DB
import authRouter from "./routes/auth.routes.js";
import linkRouter from "./routes/link.routes.js";
import redirectRoutes from "./routes/redirect.routes.js"; // use for redurecting from shorten url to original
import path from "path";

const __dirname = path.resolve();
// get PORT from constants
let PORT = config.get("port") || 3000;
if (process.env.NODE_ENV === "production") {
  const PORT = process.env.PORT || 3000;
}

const app = express(); 

// convert from Steam to js object
app.use(express.json({ extended: true }));

// routes 
app.use("/api/auth", authRouter); 
app.use("/api/link", linkRouter);
app.use("/t", redirectRoutes);

if (process.env.NODE_ENV === "production") {
  app.use("/", express.static(path.join(__dirname, "client", "build")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
  });
}

async function start() {
  try {
    await mongoose.connect(config.get("mongoUri"), {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    app.listen(PORT, () => console.log(`Server has been started on port: ${PORT}`));
  } catch (e) {
    console.log("Server Error", e.message)
    process.exit(1)
  }
}

start();