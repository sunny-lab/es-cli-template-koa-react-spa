var chalk = require('chalk');

module.exports = {
    error: function (str) {
        console.log(chalk.red(str));
    },
    warn: function (str) {
        console.log(chalk.yellow(str));
    },
    info: function (str) {
        console.log(str);
    }
}
