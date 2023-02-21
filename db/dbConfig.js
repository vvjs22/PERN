//File required for local and hosted apps
//This file is used to connect to the database

const pgp = require('pg-promise')();
require('dotenv').config();

const { DATABASE_URL, PG_HOST, PG_PORT, PG_DATABASE, PG_USER } = process.env;
const cn = DATABASE_URL
  ? {
      connectionString: DATABASE_URL,
      max: 30,
    }
  : {
      host: PG_HOST,
      port: PG_PORT,
      database: PG_DATABASE,
      user: PG_USER,
    };

// alt from express docs
// var db = pgp('postgres://username:password@host:port/database')

const db = pgp(cn);
console.log("PostgreSQL connected!", cn);
module.exports = db;