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
  const robotId = parseInt(req.body.robotId, 10);
  const typeId = parseInt(req.body.typeId, 10);
  try {
    const q = `INSERT INTO Guasti(idRobot, guasto, data, idType) VALUES(@idRobot, @guasto, @data, @idType)`;
    pool
      .request()
      .input("guasto", sql.NVarChar, req.body.values.malfunction)
      .input("data", sql.Date, timestamp)
      .input("idRobot", sql.Int, robotId)
      .input("idType", sql.Int, typeId)
      .query(q);
    return res.status(200).send("malfunctions sended correctly");
  } catch (err) {
    return res.status(500);
  }
});

app.get("/robots", async (req, res) => {
  try {
    const pool = await sql.connect(config);
    const q = "SELECT * FROM InfoRobot";
    const result = await pool.request().query(q);
    res.status(200).json(result.recordset);
  } catch (err) {
    console.log(err);
    return res.status(500);
  }
});

app.get("/robotsheet", async (req, res) => {
  try {
    const pool = await sql.connect(config);

    const q =
      "SELECT serialNumber, name, mac, idUo, usernameHotspot, nameWifi, passwordWifi, idAnyDesk, passwordAnyDesk, software, firmware, phone, NMU, PIN, PUK, waterPerSecond, tank, servant  FROM InfoRobot WHERE ID = @ID";
    const id = parseInt(req.query.ID, 10);
    const result = await pool.request().input("ID", sql.Int, id).query(q);
    res.status(200).json(result.recordset);
  } catch (err) {
    console.log(err);
    return res.status(500);
  }
});

app.get("/malfunctions", async (req, res) => {
  try {
    const pool = await sql.connect(config);
    const q = "SELECT guasto, data FROM Guasti WHERE idRobot = @idRobot";
    const id = parseInt(req.query.ID, 10);
    const result = await pool.request().input("idRobot", sql.Int, id).query(q);
    res.status(200).json(result.recordset);
  } catch (err) {
    console.log(err);
    return res.status(500);
  }
});

app.get("/types", async (req, res) => {
  try {
    const pool = await sql.connect(config);
    const q = "SELECT * FROM Categorie";
    const result = await pool.request().query(q);
    res.status(200).json(result.recordset);
  } catch (err) {
    console.log(err);
    return res.status(500);
  }
});

app.post("/typePost", async (req, res) => {
  const pool = await sql.connect(config);

  try {
    const checkType =
      "SELECT COUNT(*) AS count FROM Categorie WHERE type = @type";
    const checkTypeResult = await pool
      .request()
      .input("type", sql.NVarChar, req.body.values.type)
      .query(checkType);
    if (checkTypeResult.recordset[0].count > 0) {
      return res.status(403).json();
    }
    const q = `INSERT INTO Categorie(type) VALUES (@type)`;
    pool.request().input("type", sql.NVarChar, req.body.values.type).query(q);
    return res.status(200).send("New type sended correctly");
  } catch (err) {
    console.log(err);
    return res.status(500);
  }
});

app.post("/typeDelete", async (req, res) => {
  const pool = await sql.connect(config);
  const id = parseInt(req.body.ID, 10);
  try {
    const checkIdType =
      "SELECT COUNT(*) AS count FROM Guasti WHERE idType = @idType";
    const checkIdTypeResult = await pool
      .request()
      .input("idType", sql.Int, id)
      .query(checkIdType);
    if (checkIdTypeResult.recordset[0].count > 0) {
      return res.status(403).json();
    }
    const q = `DELETE FROM Categorie WHERE ID = @ID`;
    pool.request().input("ID", sql.Int, id).query(q);
    return res.status(200).send("Type deleted correctly");
  } catch (err) {
    console.log(err);
    return res.status(500);
  }
});

app.post("/typeModify", async (req, res) => {
  const pool = await sql.connect(config);
  const id = parseInt(req.body.ID, 10);
  try {
    const q = `UPDATE Categorie SET type = @type WHERE ID = @ID;`;
    pool
      .request()
      .input("type", sql.NVarChar, req.body.values.type)
      .input("ID", sql.Int, id)
      .query(q);
    return res.status(200).send("Type modified successfully");
  } catch (err) {
    console.log(err);
    return res.status(500);
  }
});

app.listen(3000, () => {
  try {
    console.log("Listening on port 3000");
  } catch (err) {
    console.log(err);
  }
});
