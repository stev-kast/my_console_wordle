const fs = require("fs");
const path = require("path");
const inquirer = require("inquirer");

const dic_common = path.join(__dirname, "dic_common_5Upper_ES");
const dic = path.join(__dirname, "dic_5Upper_ES");

const verify_word = async (input, word) => {
  let di = await readDic();
  let word_in_dic = Object.values(di).some((e) => e == input);

  if (input.length != 5) {
    console.log("Tamaño incorrecto");
    return 0;
  } else if (!word_in_dic) {
    console.log("Palabra no existe");
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

const new_game = async () => {
  let word = await generate_word();
  console.log(typeof word, word);
  for (let i = 5; i >= 0; i--) {
    let ob_input = await gameMenu(i + 1);
    let input = ob_input.main_game.toUpperCase();
    verify_word(input, word);
  }
};

module.exports = {
  new_game,
};

//////// This executiion is only for testing !!!
new_game();
