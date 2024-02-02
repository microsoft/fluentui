const { joinPathFragments } = require('@nx/devkit');
const { registerTsProject } = require('@nx/js/src/internal');

registerTsProject(joinPathFragments(__dirname, '.', 'tsconfig.lib.json'));

const { main } = require('./nx-publish');

main().catch(reason => {
  console.error(reason);
  throw new Error(reason);
});
