const { getDependencies } = require('./getDependencies');

describe.skip(`#getDependencies`, () => {
  const packageName = '@fluentui/react-text';
  it(`should return package/s dependency tree array for all,devDeps and production dependencies`, async () => {
    const deps = await getDependencies(packageName);

    expect(deps.dependencies).toMatchInlineSnapshot(`
      Array [
        Object {
          "dependencyType": "dependencies",
          "isTopLevel": true,
          "name": "@fluentui/react-shared-contexts",
        },
        Object {
          "dependencyType": "dependencies",
          "isTopLevel": false,
          "name": "@fluentui/react-theme",
        },
        Object {
          "dependencyType": "dependencies",
          "isTopLevel": false,
          "name": "@fluentui/tokens",
        },
        Object {
          "dependencyType": "dependencies",
          "isTopLevel": true,
          "name": "@fluentui/react-utilities",
        },
        Object {
          "dependencyType": "dependencies",
          "isTopLevel": false,
          "name": "@fluentui/keyboard-keys",
        },
        Object {
          "dependencyType": "dependencies",
          "isTopLevel": true,
          "name": "@fluentui/react-jsx-runtime",
        },
      ]
    `);

    expect(deps.devDependencies).toMatchInlineSnapshot(`
      Array [
        Object {
          "dependencyType": "devDependencies",
          "isTopLevel": false,
          "name": "@fluentui/eslint-plugin",
        },
        Object {
          "dependencyType": "devDependencies",
          "isTopLevel": false,
          "name": "@fluentui/scripts-api-extractor",
        },
        Object {
          "dependencyType": "devDependencies",
          "isTopLevel": false,
          "name": "@fluentui/scripts-tasks",
        },
        Object {
          "dependencyType": "dependencies",
          "isTopLevel": false,
          "name": "@fluentui/scripts-monorepo",
        },
        Object {
          "dependencyType": "dependencies",
          "isTopLevel": false,
          "name": "@fluentui/scripts-utils",
        },
        Object {
          "dependencyType": "dependencies",
          "isTopLevel": false,
          "name": "@fluentui/scripts-prettier",
        },
        Object {
          "dependencyType": "devDependencies",
          "isTopLevel": false,
          "name": "@fluentui/react-conformance",
        },
        Object {
          "dependencyType": "devDependencies",
          "isTopLevel": false,
          "name": "@fluentui/scripts-jest",
        },
        Object {
          "dependencyType": "devDependencies",
          "isTopLevel": false,
          "name": "@fluentui/react-conformance-griffel",
        },
      ]
    `);
  });

  it(`should provide access to package.json`, async () => {
    const { projectGraph, getProjectPackageJsonInfo } = await getDependencies(packageName);
    const packageInfo = getProjectPackageJsonInfo(packageName, projectGraph);

    expect(packageInfo.absoluteRootPath).toEqual(expect.stringContaining('packages/react-components/react-text'));
    expect(packageInfo?.dependencies).toEqual(expect.any(Object));
    expect(packageInfo?.main).toEqual('lib-commonjs/index.js');
    expect(packageInfo?.module).toEqual('lib/index.js');
  });
});
