import { createTreeWithEmptyWorkspace } from '@nx/devkit/testing';
import {
  Tree,
  readProjectConfiguration,
  readJson,
  joinPathFragments,
  writeJson,
  addProjectConfiguration,
  stripIndents,
} from '@nx/devkit';

import { bundleSizeConfigurationGenerator } from './generator';
import { BundleSizeConfigurationGeneratorSchema } from './schema';

describe('bundle-size-configuration generator', () => {
  let tree: Tree;
  const options: BundleSizeConfigurationGeneratorSchema = { project: 'react-continental' };

  beforeEach(async () => {
    tree = createTreeWithEmptyWorkspace();

    createLibrary(tree, 'react-continental');
  });

  it('should add setup bundle size', async () => {
    await bundleSizeConfigurationGenerator(tree, options);
    const config = readProjectConfiguration(tree, options.project);

    const packageJson = readJson(tree, joinPathFragments(config.root, 'package.json'));

    expect(tree.exists(joinPathFragments(config.root, 'monosize.config.mjs'))).toEqual(false);

    expect(packageJson.scripts).toEqual(undefined);

    expect(tree.read(joinPathFragments(config.root, 'bundle-size/index.fixture.js'), 'utf-8')).toMatchInlineSnapshot(`
      "import * as p from '@proj/react-continental';

      console.log(p);

      export default {
        name: 'react-continental - package',
      };
      "
    `);
  });

  it(`should not add index.fixture.js if there are already existing fixtures`, async () => {
    const config = readProjectConfiguration(tree, options.project);

    tree.write(
      joinPathFragments(config.root, 'bundle-size/Foo.fixture.js'),
      stripIndents`
    import {Foo} from '${options.project}'

    export default {
      name: 'Foo',
    };
    `,
    );

    await bundleSizeConfigurationGenerator(tree, options);

    expect(tree.exists(joinPathFragments(config.root, 'bundle-size/index.fixture.js'))).toEqual(false);
  });

  it(`should add monosize config within project if overrideBaseConfig was specified`, async () => {
    await bundleSizeConfigurationGenerator(tree, { ...options, overrideBaseConfig: true });

    const config = readProjectConfiguration(tree, options.project);

    expect(tree.read(joinPathFragments(config.root, 'monosize.config.mjs'), 'utf-8')).toMatchInlineSnapshot(`
      "// @ts-check

      import webpackBundler from 'monosize-bundler-webpack';

      import baseConfig from '../../../monosize.config.mjs';

      /** @type {import('monosize').MonoSizeConfig} */
      const monosizeConfig = {
        ...baseConfig,
        bundler: webpackBundler((config) => {
          return config;
        }),
      };

      export default monosizeConfig;
      "
    `);
  });
});

function createLibrary(tree: Tree, name: string) {
  const projectName = name;
  const npmProjectName = '@proj/' + projectName;
  const root = `packages/react-components/${name}`;
  addProjectConfiguration(tree, projectName, { root, tags: ['vNext'] });
  writeJson(tree, joinPathFragments(root, 'package.json'), {
    name: npmProjectName,
    version: '9.0.0',
  });

  return tree;
}
