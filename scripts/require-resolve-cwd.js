module.exports = function (request) {
  const resolve = require('resolve');
  return resolve.sync(request, { basedir: process.cwd() });
}