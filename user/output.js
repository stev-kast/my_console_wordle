const figlet = require("figlet");

async function showTitle() {
  await figlet("T-Wordle", function (err, data) {
    if (err) {
      console.log("Something bad happen :C");
      console.dir(err);
      return;
    }
    console.log(data);
  });
}

module.exports = {
  showTitle,
};
