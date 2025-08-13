const baseConfig = require('../../cypress.config').default;

// If the base config has a support file, import it
if (baseConfig.component?.supportFile) {
  require(baseConfig.component.supportFile);
}

// Import custom commands
require('./commands');
