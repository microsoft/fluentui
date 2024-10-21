import { createTreeWithEmptyWorkspace } from '@nx/devkit/testing';
import { Tree } from '@nx/devkit';

import { migrateToProjectCrystalGenerator } from './generator';
import { MigrateToProjectCrystalGeneratorSchema } from './schema';

describe('migrate-to-project-crystal generator', () => {
  let tree: Tree;
  const options: MigrateToProjectCrystalGeneratorSchema = { name: 'test' };

  beforeEach(() => {
    tree = createTreeWithEmptyWorkspace();
  });

  it('should run successfully', async () => {
    await migrateToProjectCrystalGenerator(tree, options);

    expect(1).toBe(1);
  });
});
