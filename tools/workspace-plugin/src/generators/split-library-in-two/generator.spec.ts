import { createTreeWithEmptyWorkspace } from '@nx/devkit/testing';
import { Tree, readProjectConfiguration } from '@nx/devkit';

import { splitLibraryInTwoGenerator } from './generator';
import { SplitLibraryInTwoGeneratorSchema } from './schema';

describe('split-library-in-two generator', () => {
  let tree: Tree;
  const options: SplitLibraryInTwoGeneratorSchema = { name: 'test' };

  beforeEach(() => {
    tree = createTreeWithEmptyWorkspace();
  });

  it('should run successfully', async () => {
    await splitLibraryInTwoGenerator(tree, options);
    const config = readProjectConfiguration(tree, 'test');
    expect(config).toBeDefined();
  });
});
