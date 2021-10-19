import { createTreeWithEmptyWorkspace } from '@nrwl/devkit/testing';
import { Tree } from '@nrwl/devkit';
import { setupDummyPackage } from '../../test-utils';

import generator from './index';
import { getProjectConfig } from '../../utils';

describe('converged-npmignore generator', () => {
  let tree: Tree;

  beforeEach(() => {
    tree = createTreeWithEmptyWorkspace();
  });

  it('should update npmignore in a converged package', async () => {
    const packageName = '@fluentui/react-button';
    setupDummyPackage(tree, { packageName });
    await generator(tree);

    const projectConfig = getProjectConfig(tree, { packageName });
    const npmIgnore = tree.read(projectConfig.paths.npmConfig)?.toString();
    expect(npmIgnore).toMatchInlineSnapshot(`
      ".storybook/
      .vscode/
      bundle-size/
      config/
      coverage/
      e2e/
      etc/
      node_modules/
      src/
      temp/
      __fixtures__
      __mocks__
      __tests__

      *.api.json
      *.log
      *.spec.*
      *.stories.*
      *.test.*
      *.yml

      # config files
      *config.*
      *rc.*
      .editorconfig
      .eslint*
      .git*
      .prettierignore
      "
    `);
  });

  it('should ignore packages that are not converged', async () => {
    const packageName = '@fluentui/react-button';
    setupDummyPackage(tree, { packageName, version: '1.0.0' });
    await generator(tree);

    const projectConfig = getProjectConfig(tree, { packageName });
    expect(tree.exists(projectConfig.paths.npmConfig)).toBe(false);
  });
});
