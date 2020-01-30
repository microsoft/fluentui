// Just reuse the serve config--no need to build a UMD bundle of this package
// (also prevents chunks from the different configs from stomping on each other)
module.exports = require('./webpack.serve.config');
