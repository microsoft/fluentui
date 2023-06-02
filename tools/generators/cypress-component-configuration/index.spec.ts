import { createTreeWithEmptyV1Workspace } from '@nrwl/devkit/testing';
import { Tree, readProjectConfiguration } from '@nrwl/devkit';

import generator from './index';
import { CypressComponentConfigurationGeneratorSchema } from './schema';

describe('cypress-component-configuration generator', () => {
  let appTree: Tree;
  const options: CypressComponentConfigurationGeneratorSchema = { name: 'test' };

  beforeEach(() => {
    appTree = createTreeWithEmptyV1Workspace();
  });

  it('should run successfully', async () => {
    await generator(appTree, options);
    const config = readProjectConfiguration(appTree, 'test');
    expect(config).toBeDefined();
  });
});
