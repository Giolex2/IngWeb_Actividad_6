var sqlite3 = require("sqlite3").verbose();

const DBSOURCE = "api.db";

let db = new sqlite3.Database(DBSOURCE, (err) => {
  if (err) {
    console.error(err.message);
    throw err;
  } else {
    console.log("*** Conectado a una base de datos SQLite ***");
  }
});

module.exports = db;
