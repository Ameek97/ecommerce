import express from "express";
import dotenv from "dotenv";
import dns from "dns";
dns.setServers(["1.1.1.1","8.8.8.8"]);

const app = express();

dotenv.config({ path: "./config.env" });
import userRoute from "./routes/userRoute.js";

const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/api/user", userRoute);

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}✅`);
});
