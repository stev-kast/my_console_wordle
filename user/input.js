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
      type: "password",
      message: "Cree su contraseña",
      mask: "*",
    },
  ];
  // Muestra el menu
  return inquirer.prompt(register_ops);
};

const confirmMessage = async (message) => {
  // This is a message to make sure user can read it before clearing screen, can only be removed after tapping a key
  const confirm = [
    {
      type: "confirm",
      name: "confirmMessage",
      message: message,
      default: false,
      suffix: "  =>(Press Enter to continue)<=",
    },
  ];
  return inquirer.prompt(confirm);
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
      type: "password",
      message: "Digite su contraseña",
      mask: "*",
    },
  ];
  // Muestra el menu
  return inquirer.prompt(login_ops);
};

const loggedMenu = async () => {
  const log = [
    {
      name: "logged_ops",
      type: "list",
      message: "Seleccione su opcion",
      choices: [
        { value: 1, name: "Crear un nuevo Juego" },
        { value: 2, name: "Consultar las estadísticas" },
        { value: 3, name: "Salir" },
      ],
    },
  ];
  return inquirer.prompt(log);
};

module.exports = {
  mainMenu,
  createAccount,
  loginMenu,
  confirmMessage,
  loggedMenu,
};
