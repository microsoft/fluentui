const { execSync } = require('child_process');
const { Timezone } = require('./constants');

Object.entries(Timezone).forEach(([tzName, tzIdentifier]) => {
  console.log(`**********Running tests in ${tzName} timezone**********`);

  process.env.TZ = tzIdentifier;
  execSync(['yarn', 'jest', ...process.argv.slice(2)].join(' '), { stdio: 'inherit' });

  console.log(`**********Tests in ${tzName} timezone passed!**********`);
});
