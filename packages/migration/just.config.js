const { preset, just } = require('@uifabric/build');
const { task, series } = just;

preset();
// TODO remove, fix tests on windows environments
// TODO: add "test" command to migration/package.json once this merges: https://github.com/OfficeDev/office-ui-fabric-react/pull/11614
task('build', series('clean', 'copy', 'ts:commonjs-only')).cached();
