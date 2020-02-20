import { exampleUrlTokenFromFilePath } from '../e2eApi';

const e2eExampleContext = require.context('../tests/', false, /-example.tsx$/);

export default e2eExampleContext.keys().reduce((acc, key) => {
  const exampleNameUrlToken = exampleUrlTokenFromFilePath(key.replace(/^.\//, ''));

  return {
    ...acc,
    ...{ [exampleNameUrlToken]: e2eExampleContext(key).default },
  };
}, {});
