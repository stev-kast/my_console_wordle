const chalk = require("chalk");
const fs = require("fs");
const path = require("path");
const inquirer = require("inquirer");
let colors = [];
let keys = [];

const dic_common = path.join(__dirname, "dic_common_5Upper_ES");
const dic = path.join(__dirname, "dic_5Upper_ES");

const verify_word = async (input, word) => {
  let di = await readDic();
  let word_in_dic = Object.values(di).some((e) => e == input); // read dic solo me retorna un objeto por lo tanto hago la conversion aca

  if (input.length != 5) {
    // return 0 cuando el tamaño de la palabra no es de 5 letras
    return 0;
  } else if (!word_in_dic) {
    // return 1 si la palabra no esta en el diccionario
    return 1;
  }
};

const gameMenu = async (intentos) => {
  // This will request a word to te user, if the word does not eexist this will not count to the total of attempts in the game
  const main_game = [
    {
      name: "main_game",
      type: "input",
      message:
        "Ingresa una palabra de 5 letras (te quedan " + intentos + " intentos)",
    },
  ];
  // Muestra el menu
  return inquirer.prompt(main_game);
};

const confirmMessage = (message) => {
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

const readCommon = async () => {
  if (fs.existsSync(dic_common)) {
    let lectura = await fs.readFileSync(dic_common);
    let abc = await lectura.toString();
    abc = abc.slice(2, -2);
    abc = abc.split('","');
    // Removed last and first two characters from string and converted it to an array ^
    return abc;
  }
};

const readDic = async () => {
  if (fs.existsSync(dic)) {
    let lectura = await fs.readFileSync(dic);
    let abc = await lectura.toString();
    abc = await abc.slice(2, -2);
    abc = await abc.split('","');
    // Removed last and first two characters from string and converted it to an array ^
    return abc;
  }
};

const generate_word = async () => {
  // This will take a random word from a list of common english or spanis words
  let commons = await readCommon();
  let choose = Math.floor(Math.random() * commons.length);
  let word = commons[choose];
  return word;
};

const compare_words = async (input, word) => {
  let wordChecker = 0;
  for (let j = 0; j < 5; j++) {
    if (input.charAt(j) == word.charAt(j)) {
      // --- Extra logic to avoid redundance
      for (let i = 0; i < j; i++) {
        if (colors[colors.length - 1 - i][0] == input.charAt(j)) {
          if (word.split("").filter((e) => e == input.charAt(j)).length == 1) {
            colors[colors.length - 1 - i][1] = 2;
          }
        }
      }
      // ----------
      colors.push([input.charAt(j), 0]);
      let ind = keys.findIndex((e) => e[0] == input.charAt(j));
      keys[ind][1] = 0;
      wordChecker++;
    } else if (word.split("").some((e) => e == input.charAt(j))) {
      // --- Extra logic to avoid redundance
      let count = 0;
      for (let i = 0; i < j; i++) {
        if (colors[colors.length - 1 - i][0] == input.charAt(j)) {
          count++;
        }
      }
      if (count < word.split("").filter((e) => e == input.charAt(j)).length) {
        let ind = keys.findIndex((e) => e[0] == input.charAt(j));
        keys[ind][1] = 1;
        colors.push([input.charAt(j), 1]);
      } else {
        let ind = keys.findIndex((e) => e[0] == input.charAt(j));
        keys[ind][1] = 2;
        colors.push([input.charAt(j), 2]);
      }
      // --------------
    } else if (word.split("").some((e) => e != input.charAt(j))) {
      let ind = keys.findIndex((e) => e[0] == input.charAt(j));
      keys[ind][1] = 2;
      colors.push([input.charAt(j), 2]);
    }
  }
  if (wordChecker == 5) {
    colors.push("@");
  }
};

const printWords = async () => {
  console.log("");
  console.log("\t-----------------------------------------");
  for (let i = 0; i < 30; i++) {
    process.stdout.write(" ");
    process.stdout.write("\t|   ");
    if (colors[i] != undefined) {
      if (colors[i][1] == 0) {
        process.stdout.write(chalk.green(colors[i][0]));
      } else if (colors[i][1] == 1) {
        process.stdout.write(chalk.yellow(colors[i][0]));
      } else if (colors[i][1] == 2) {
        process.stdout.write(chalk.gray(colors[i][0]));
      }
    }
    if (((i + 1) % 5 == 0) & (i > 0)) {
      process.stdout.write("\t|");
      console.log("");
      console.log("\t-----------------------------------------");
    }
  }
  printKeys();
};

const printKeys = async () => {
  console.log("");
  process.stdout.write("     ");
  for (let i = 0; i < keys.length; i++) {
    if (keys[i][1] == 0) {
      process.stdout.write(chalk.green(keys[i][0]));
    } else if (keys[i][1] == 1) {
      process.stdout.write(chalk.yellow(keys[i][0]));
    } else if (keys[i][1] == 2) {
      process.stdout.write(chalk.gray(keys[i][0]));
    } else if (keys[i][1] == 3) {
      process.stdout.write(chalk.white(keys[i][0]));
    }
    process.stdout.write("    ");
    if (((i + 1) % 10 == 0) & (i > 0)) {
      console.log("");
      process.stdout.write("     ");
    }
    if (i == 19) {
      process.stdout.write("     ");
    }
  }
};

const new_game = async () => {
  keys = [
    ["Q", 3],
    ["W", 3],
    ["E", 3],
    ["R", 3],
    ["T", 3],
    ["Y", 3],
    ["U", 3],
    ["I", 3],
    ["O", 3],
    ["P", 3],
    ["A", 3],
    ["S", 3],
    ["D", 3],
    ["F", 3],
    ["G", 3],
    ["H", 3],
    ["J", 3],
    ["K", 3],
    ["L", 3],
    ["Ñ", 3],
    ["Z", 3],
    ["X", 3],
    ["C", 3],
    ["V", 3],
    ["B", 3],
    ["N", 3],
    ["M", 3],
  ];
  colors = []; //new Array(30);
  // colors.fill([" ", 3]);
  let word = await generate_word();
  for (let i = 5; i >= 0; i--) {
    printWords();
    console.log("\n");
    let ob_input = await gameMenu(i + 1);
    let input = ob_input.main_game.toUpperCase();
    let ver = await verify_word(input, word);

    if (ver == 0) {
      i++;
      await confirmMessage("La palabra no contiene 5 letras, intente de nuevo");
    } else if (ver == 1) {
      i++;
      await confirmMessage(
        "La palabra no se encuenta en nuestro diccionario, intente de nuevo"
      );
    } else {
      compare_words(input, word);
      if (colors.some((e) => e == "@")) {
        printWords();
        await confirmMessage(
          "Has descubierto la palabra en " + (6 - i) + " intentos!"
        );
        return 6 - i;
      }
      //await confirmMessage(colors);
    }

    console.clear();
  }
  printWords();
  await confirmMessage(
    "\n\nGame Over, Mejor suerte la proxima vez! La palabra era: " + word
  );
  return 0;
};

module.exports = {
  new_game,
};

//////// This executiion is only for testing !!!
//new_game();
