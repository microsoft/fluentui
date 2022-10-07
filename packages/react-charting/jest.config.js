import { createConfig, resolveMergeStylesSerializer } from '@fluentui/scripts/jest/jest-resources';
import path from 'path';

const config = createConfig({
  setupFiles: [path.resolve(path.join(__dirname, 'config', 'tests.js'))],
  snapshotSerializers: [resolveMergeStylesSerializer(), 'enzyme-to-json/serializer'],
});

module.exports = config;
