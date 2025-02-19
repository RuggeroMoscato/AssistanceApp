
// const config = {
//   user: process.env.DB_USR,
//   password: process.env.DB_PSW,
//   server: process.env.DB_SRVR,
//   port: process.env.DB_PORT,
//   database: process.env.DB_NAME,
//   options: {
//     trustServerCertificate: true,
//     trustedConnection: false,
//     enableArithAbort: true,
//     encrypt: false,
//   },
// };


// module.exports = config

const config = {
  user: "root",
  password: "1234",
  server: "DESKTOP-447VSKM",
  database: "newsform",
  options: {
    trustServerCertificate: true,
    trustedConnection: false,
    enableArithAbort: true,
    encrypt: false,
  },
};


module.exports = config

