const fs = require("fs");
const path = require("path");

const link = path.join(__dirname, "users.json");

const readUsers = async () => {
  if (fs.fileExistsSync(link)) {
    let archivo = fs.readFileSync(ruta, "utf8");
    let users = JSON.parse(archivo);
    return users;
  }
};
