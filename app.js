const { mostrarTitulo } = require("./output");
const { mainMenu, createAccount, loginMenu, loggedMenu } = require("./input");
const { readUsers, addUser, login } = require("./users");

async function main() {
  console.clear();
  //   mostrarTitulo();

  let logged = false; // This will define if we already have logged in or not
  let username = ""; // This will save the logged username
  while (!logged) {
    // This will keep users in main menu until they log in
    let op = await mainMenu();
    if (op.main_ops == 1) {
      let account = await createAccount();
      await addUser(account);
    }
    if (op.main_ops == 2) {
      let account = await loginMenu();
      logged = await login(account);
      if (logged) {
        username = account.username;
      }
    }
    if (op.main_ops == 3) {
      console.clear();
      return;
    }
    console.clear();
  }

  while (logged) {
    let log = await loggedMenu(); // Here we have the menu of the game after logged
    if (log.logged_ops == 1) {
      // Crear nuevo juego
    }
    if (log.logged_ops == 2) {
      // Ver estadisticas
    }
    if (log.logged_ops == 3) {
      console.clear();
      return;
    }
    console.clear();
  }
}

main();
