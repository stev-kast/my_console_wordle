const fs = require("fs");
const path = require("path");
const { confirmMessage } = require("./input");
const bcrypt = require("bcrypt");

const link = path.join(__dirname, "users.json");

const saltRounds = 10; // Se usa en la encriptacion del password ?

const readUsers = async () => {
  if (fs.existsSync(link)) {
    let archivo = fs.readFileSync(link, "utf8");
    let users = JSON.parse(archivo);
    return users;
    console.log(users);
  }
};

async function addUser(newUser) {
  let datos = await readUsers();
  if (!datos.users.some((e) => e.username == newUser.username)) {
    //Encriptacion
    const hash = await bcrypt.hashSync(newUser.passwd, saltRounds);
    newUser.passwd = hash;
    // Agrega un usuario a la base
    datos.users.push(newUser);
    // Pasa de objeto JSON a un string de datos
    let cadena = JSON.stringify(datos);
    // Escribe la cadena al archivo datos.JSON
    fs.writeFileSync(link, cadena);
    return datos;
  } else {
    await confirmMessage(
      "El nombre de usuario ya existe, por favor inicie el registro nuevamente con otro nombre de usuario o ingrese con el nombre de usuario que ya existe"
    );
    console.log("---");
  }
}

async function login(account) {
  let datos = await readUsers();
  if (datos.users.some((e) => e.username == account.username)) {
    let ind = await datos.users.findIndex(
      (e) => e.username == account.username
    );
    let user = datos.users[ind];
    if (bcrypt.compareSync(account.passwd, user.passwd)) {
      return true, account.username;
    } else {
      return false;
    }
  } else {
    await confirmMessage(
      "No existe cuenta con este nombre de Usuario, Intente ingresar de nuevo o cree una cuenta nueva"
    );
  }
}

module.exports = {
  readUsers,
  addUser,
  login,
};
