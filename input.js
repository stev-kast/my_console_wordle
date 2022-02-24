const inquirer = require("inquirer");

const mainMenu = async () => {
  const main_ops = [
    {
      name: "main_ops",
      type: "list",
      message: "Seleccione su opcion",
      choices: [
        { value: 1, name: "Crear cuenta" },
        { value: 2, name: "Iniciar Sesion" },
        { value: 3, name: "Salir" },
      ],
    },
  ];
  // Muestra el menu
  return inquirer.prompt(main_ops);
};

const createAccount = async () => {
  const register_ops = [
    {
      name: "name",
      type: "input",
      message: "Digite su nombre",
    },
    {
      name: "last_name",
      type: "input",
      message: "Digite su apellido",
    },
    {
      name: "username",
      type: "input",
      message: "Cree su nombre de usuario",
    },
    {
      name: "passwd",
      type: "input",
      message: "Cree su contraseña",
    },
  ];
  // Muestra el menu
  return inquirer.prompt(register_ops);
};

const loginMenu = async () => {
  const login_ops = [
    {
      name: "username",
      type: "input",
      message: "Digite su nombre de usuario",
    },
    {
      name: "passwd",
      type: "input",
      message: "Digite su contraseña",
    },
  ];
  // Muestra el menu
  return inquirer.prompt(login_ops);
};

module.exports = {
  mainMenu,
  createAccount,
  loginMenu,
};
