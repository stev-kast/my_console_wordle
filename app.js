const { mostrarTitulo } = require("./output");
const { mainMenu, createAccount, loginMenu, loggedMenu } = require("./input");
const { readUsers, addUser, login } = require("./users");

async function main() {
  console.clear();
  //   mostrarTitulo();
  let logged = false;
  let username = "";
  while (!logged) {
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
    let log = await loggedMenu();
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
