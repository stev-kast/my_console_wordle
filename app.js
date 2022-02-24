const { mostrarTitulo } = require("./output");
const { mainMenu, createAccount, loginMenu } = require("./input");

async function main() {
  //   mostrarTitulo();
  let op = await mainMenu();
  console.log(op);
  if (op.main_ops == 1) {
    let account = await createAccount();
    console.log(account);
  }
  if (op.main_ops == 2) {
    let account = await loginMenu();
    console.log(account);
  }
  if (op.main_ops == 3) {
    return;
  }
}

main();
