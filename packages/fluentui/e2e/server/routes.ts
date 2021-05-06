import * as path from 'path';
import * as _ from 'lodash';

export const exampleUrlTokenFromFilePath = (filePath: string) => {
  const testName = path
    .basename(filePath)
    .replace(/^(.+)-test.tsx?$/, '$1')
    .replace(/^(.+)-example.tsx?$/, '$1');

  return _.kebabCase(testName);
};

const e2eExampleContext = require.context('../tests', false, /-example.tsx$/);

export default e2eExampleContext.keys().reduce((acc, key) => {
  const exampleNameUrlToken = exampleUrlTokenFromFilePath(key.replace(/^.\//, ''));

  return {
    ...acc,
    ...{ [exampleNameUrlToken]: e2eExampleContext(key).default },
  };
}, {});
