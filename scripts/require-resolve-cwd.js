module.exports = function (request) {
  return require.resolve(request, { paths: process.cwd() });
}