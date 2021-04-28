local secrets = import "../secrets.example.json";
local db = secrets.prodMysql;

{
  "id": 3,
  "url": db.url,
  "user": db.user,
  "database": db.database,
  "secureJsonData": {
    "password": db.password
  }
}
