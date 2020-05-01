const just = require('just-scripts');

module.exports = {
  preset: require('./just.config'),
  // TODO (fui repo merge): re-export all the just exports at the root
  just,
  ...just,
};
