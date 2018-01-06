import path from 'path';

module.exports = {
    port: 3000,
    tmplRoot: path.join(__dirname, '../../build/srv'),
    staticPath: path.join(__dirname, '../../build/static'),
};
