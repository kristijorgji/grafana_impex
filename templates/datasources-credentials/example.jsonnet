local secrets = import "../secrets.example.json";
local db = secrets.prodMysql;

{
  "name": "Should-Match-DS-Name",
  "url": db.url,
  "user": db.user,
  "database": db.database,
  "secureJsonData": {
    "password": db.password
  }
}
