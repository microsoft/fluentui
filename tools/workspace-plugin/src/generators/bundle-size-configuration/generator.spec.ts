import { createTreeWithEmptyWorkspace } from '@nx/devkit/testing';
import { Tree, readProjectConfiguration } from '@nx/devkit';

import { bundleSizeConfigurationGenerator } from './generator';
import { BundleSizeConfigurationGeneratorSchema } from './schema';

describe('bundle-size-configuration generator', () => {
  let tree: Tree;
  const options: BundleSizeConfigurationGeneratorSchema = { name: 'test' };

  beforeEach(() => {
    tree = createTreeWithEmptyWorkspace();
  });

  it('should run successfully', async () => {
    await bundleSizeConfigurationGenerator(tree, options);
    const config = readProjectConfiguration(tree, 'test');
    expect(config).toBeDefined();
  });
});
