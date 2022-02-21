const inquirer = require("inquirer");

const menu = async () => {
  const opciones = [
    {
      name: "opcion",
      type: "list",
      message: "Seleccione su opcion",
      choices: [
        { value: 1, name: "Iniciar sesion" },
        { value: 2, name: "Cerrar sesion" },
        { value: 3, name: "Eliminar banda" },
        { value: 4, name: "Ver bandas" },
        { value: 5, name: "Salir" },
      ],
    },
  ];

  // Muestra el menu
  return inquirer.prompt(opciones);
};

module.exports = {
  menu,
};
