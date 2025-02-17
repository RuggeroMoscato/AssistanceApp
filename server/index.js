const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const sql = require("mssql");
const cors = require("cors");
const app = express();
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");
const config = require("./config");
const cookieParser = require("cookie-parser");
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:8081",
    credentials: true,
  })
);

const verifyToken = require("./Middlewares/verifyToken");

app.post("/infopost", async (req, res) => {
  const pool = await sql.connect(config);
  const date = new Date();
  const offsetMs = date.getTimezoneOffset() * 60 * 1000;
  const timestamp = new Date(date.getTime() - offsetMs).toISOString();
  const refreshToken = req.cookies.refreshToken;
  const arrayToken = refreshToken.split(".");
  const tokenPayload = JSON.parse(atob(arrayToken[1]));
  const robotId = parseInt(req.query.ID, 10);

  try {
    const q = `INSERT INTO Malfunctions(robotID, malfunction, createdAt, cretedBy) VALUES(@robotID, @malfunction, @createdAt, @cretedBy)`;
    pool
      .request()
      .input("malfunction", sql.NVarChar, req.body.values.malfunction)
      .input("createdAt", sql.DateTime, timestamp)
      .input("cretedBy", sql.Int, tokenPayload.userId)
      .input("robotId", sql.Int, robotId)
      .query(q);
    return res.status(200).send("malfunctions sended correctly");
  } catch (err) {
    return res.status(500);
  }
});

app.get("/robots", async (req, res) => {
  try {
    const pool = await sql.connect(config);
    const q = "SELECT * FROM Robot";
    const result = await pool.request().query(q);
    res.status(200).json(result.recordset);
  } catch (err) {
    console.log(err)
   return  res.status(500);
  }
});

app.get("/robotsheet", async (req, res) => {
  try {
    const pool = await sql.connect(config);

    const q =
      "SELECT serialNumber, name, mac, idUo, usernameHotspot, nameWifi, passwordWifi, idAnyDesk, passwordAnyDesk, software, firmware, phone, NMU, PIN, PUK, waterPerSecond, tank, servant  FROM Robot WHERE ID = @ID";
    const id = parseInt(req.query.ID, 10);
    const result = await pool.request().input("ID", sql.Int, id).query(q);
    res.status(200).json(result.recordset);
  } catch (err) {
    console.log(err);
    return res.status(500)
  }
});

app.get("/malfunctions", async (req, res) => {
  try {
    const pool = await sql.connect(config);
    const q =
      "SELECT malfunction, date FROM Malfunctions WHERE robotId = @robotId";
    const id = parseInt(req.query.ID, 10);
    const result = await pool.request().input("robotId", sql.Int, id).query(q);
    res.status(200).json(result.recordset);
  } catch (err) {
    console.log(err);
    return res.status(500)
  }
});

app.listen(3000, () => {
  try {
    console.log("Listening on port 3000");
  } catch (err) {
    console.log(err);
  }
});
