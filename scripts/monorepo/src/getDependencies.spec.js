// NOTE:
// - this spec file needs to be a javascript file otherwise there will be jest error: 'Cannot find module 'spdx-license-ids' from 'scan.js''
// also to make this work `moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],` was modified with added `json`
// not 100% same error - but issue with same package ( that lerna uses under the hood ) - https://github.com/storybookjs/storybook/issues/3728#issuecomment-396190777

const { getDependencies } = require('./getDependencies');

describe(`#getDependencies`, () => {
  const packageName = '@fluentui/react-text';
  it(`should return package/s dependency tree array for all,devDeps and production dependencies`, async () => {
    const deps = await getDependencies(packageName);

    expect(deps.dependencies).toEqual(expect.arrayContaining(['@fluentui/tokens', '@fluentui/react-theme']));
    expect(deps.devDependencies).toEqual(
      expect.arrayContaining(['@fluentui/react-conformance', '@fluentui/scripts-utils']),
    );

    expect(deps.all).toEqual([...deps.dependencies, ...deps.devDependencies].sort());
  });

  it(`should provide similar api like 'new Project(root).getPackages()'`, async () => {
    const { projectGraph } = await getDependencies(packageName);
    const packageInfo = projectGraph.nodes[packageName].package;

    expect(packageInfo?.location).toEqual(expect.stringContaining('packages/react-components/react-text'));
    expect(packageInfo?.dependencies).toEqual(expect.any(Object));
    expect(packageInfo?.get('main')).toEqual('lib-commonjs/index.js');
    expect(packageInfo?.get('module')).toEqual('lib/index.js');
  });
});
