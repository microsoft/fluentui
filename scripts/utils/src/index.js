module.exports = {
  ...require('./find-config'),
  ...require('./read-config'),
  ...require('./write-config'),
  ...require('./sh'),
  ...require('./merge'),
};
