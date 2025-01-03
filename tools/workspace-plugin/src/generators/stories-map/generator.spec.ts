import { createTreeWithEmptyWorkspace } from '@nx/devkit/testing';
import { Tree } from '@nx/devkit';

import { storiesMapGenerator } from './generator';
import { StoriesMapGeneratorSchema } from './schema';

describe('stories-map generator', () => {
  let tree: Tree;
  const options: StoriesMapGeneratorSchema = {};

  beforeEach(() => {
    tree = createTreeWithEmptyWorkspace();
  });

  it('should run successfully', async () => {
    await storiesMapGenerator(tree, options);

    expect(tree.exists('/stories-map.json')).toEqual(true);
  });
});
