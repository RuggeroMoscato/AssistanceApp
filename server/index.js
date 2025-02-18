const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const sql = require("mssql");
const cors = require("cors");
const app = express();
const config = require("./config");
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:8081",
    credentials: true,
  })
);

app.post("/infopost", async (req, res) => {
  const pool = await sql.connect(config);
  const date = new Date();
  const offsetMs = date.getTimezoneOffset() * 60 * 1000;
  const timestamp = new Date(date.getTime() - offsetMs).toISOString();
  const robotId = parseInt(req.query.robotId, 10);

  try {
    const q = `INSERT INTO Guasti(idRobot, guasto, data) VALUES(@idRobot, @guasto, @data)`;
    pool
      .request()
      .input("guasto", sql.NVarChar, req.body.values.malfunction)
      .input("data", sql.Date, timestamp)
      .input("idRobot", sql.Int, robotId)
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
      "SELECT guasto, data FROM Guasti WHERE idRobot = @idRobot";
    const id = parseInt(req.query.ID, 10);
    const result = await pool.request().input("idRobot", sql.Int, id).query(q);
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
