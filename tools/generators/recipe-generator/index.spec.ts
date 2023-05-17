import { createTreeWithEmptyWorkspace } from '@nrwl/devkit/testing';
import { Tree, readProjectConfiguration } from '@nrwl/devkit';

import generator from './index';
import { RecipeGeneratorGeneratorSchema } from './schema';

describe('recipe-generator generator', () => {
  let appTree: Tree;
  const options: RecipeGeneratorGeneratorSchema = { recipeName: 'TestRecipe' };

  beforeEach(() => {
    appTree = createTreeWithEmptyWorkspace();
  });

  it('should run successfully', async () => {
    await generator(appTree, options);
    const config = readProjectConfiguration(appTree, 'test');
    expect(config).toBeDefined();
  });
});
