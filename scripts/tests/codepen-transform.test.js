const transform = require('../tasks/codepen-examples-transform');
const jscodeshift = require('jscodeshift');
const fs = require('fs');

describe('Codepen Transform', () => {
  it('correctly transforms code examples with variable exports', () => {
    const filePath = '../packages/office-ui-fabric-react/src/components/Label/examples/Label.Basic.Example.tsx';
    const fileInfo = {
      path: filePath,
      source: fs.readFileSync(filePath)
    };
    const api = { jscodeshift: jscodeshift.withParser('babylon'), stats: {} };
    const transformResult = transform(fileInfo, api);
    expect(transformResult).toMatchSnapshot();
  });

  it('correctly transforms code examples with class exports', () => {
    const filePath = '../packages/office-ui-fabric-react/src/components/TextField/examples/TextField.Basic.Example.tsx';
    const fileInfo = {
      path: filePath,
      source: fs.readFileSync(filePath)
    };
    const api = { jscodeshift: jscodeshift.withParser('babylon'), stats: {} };
    const transformResult = transform(fileInfo, api);
    expect(transformResult).toMatchSnapshot();
  });
});
