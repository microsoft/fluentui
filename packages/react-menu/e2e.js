const cypress = require('@fluentui/scripts/cypress');

return cypress().catch(err => {
  console.error(err);
  process.exit(1);
});
