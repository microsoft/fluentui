module.exports = {
  createFixtures: config => {
    const entryPath = 'proj-one/hello.js';
    const importStatement = "import * as p from '../../../lib-dist/hello'; console.log(p)";
    config.writeFixture(entryPath, importStatement);
    const fixturesEntries = [entryPath];
    return fixturesEntries;
  },
};
