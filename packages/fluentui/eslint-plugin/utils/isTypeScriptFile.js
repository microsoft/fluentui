module.exports = function isTypeScriptFile(fileName) {
  return /\.tsx?$/i.test(fileName || '');
};
