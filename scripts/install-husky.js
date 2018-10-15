let path = require('path');
let husky = require('husky/src/install');
// "src" is needed because husky normally expects to look upwards from
// its "src" folder
husky(path.resolve(__dirname, 'src'));
