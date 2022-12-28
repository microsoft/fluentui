import { createTreeWithEmptyWorkspace } from '@nrwl/devkit/testing';
import { Tree, readProjectConfiguration } from '@nrwl/devkit';

import generator from './index';
import { MigrateScriptsToPkgGeneratorSchema } from './schema';

describe('migrate-scripts-to-pkg generator', () => {
  let appTree: Tree;
  const options: MigrateScriptsToPkgGeneratorSchema = { name: 'test' };

  beforeEach(() => {
    appTree = createTreeWithEmptyWorkspace();
  });

  it('should run successfully', async () => {
    await generator(appTree, options);
    const config = readProjectConfiguration(appTree, 'test');
    expect(config).toBeDefined();
  });
});
