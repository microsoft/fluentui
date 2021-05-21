import { createTreeWithEmptyWorkspace } from '@nrwl/devkit/testing';
import { Tree, readJson } from '@nrwl/devkit';

import generator from './index';
import { WorkspaceGeneratorGeneratorSchema } from './schema';

describe('workspace-generator generator', () => {
  let tree: Tree;
  const options: WorkspaceGeneratorGeneratorSchema = { name: 'custom' };

  beforeEach(() => {
    tree = createTreeWithEmptyWorkspace();
  });

  it('should generate boilerplate', async () => {
    await generator(tree, options);

    expect(tree.exists('/tools/generators/custom/index.ts')).toBeTruthy();
    expect(tree.exists('/tools/generators/custom/index.spec.ts')).toBeTruthy();
    expect(tree.exists('/tools/generators/custom/schema.json')).toBeTruthy();
    expect(tree.exists('/tools/generators/custom/schema.ts')).toBeTruthy();
  });

  it('should generate Schema types', async () => {
    await generator(tree, options);

    const content = tree.read('/tools/generators/custom/schema.ts')?.toString();

    expect(content).toMatchInlineSnapshot(`
      "export interface CustomGeneratorSchema {
        /**
         * Library name
         */
        name: string;
      }
      "
    `);
  });

  it('should generate Schema', async () => {
    await generator(tree, options);

    const content = readJson(tree, '/tools/generators/custom/schema.json');

    expect(content.id).toEqual('custom');
  });

  it('should generate implementation boilerplate', async () => {
    await generator(tree, options);

    const content = tree.read('/tools/generators/custom/index.ts')?.toString();

    expect(content).toMatchInlineSnapshot(`
      "import { Tree, formatFiles, installPackagesTask } from '@nrwl/devkit';
      import { libraryGenerator } from '@nrwl/workspace/generators';

      import { CustomGeneratorSchema } from './schema'

      export default async function(host: Tree, schema: CustomGeneratorSchema) {
        await libraryGenerator(host, {name: schema.name});
        await formatFiles(host);
        return () => {
          installPackagesTask(host)
        }
      }
      "
    `);
  });

  it('should generate testing boilerplate', async () => {
    await generator(tree, options);

    const content = tree.read('/tools/generators/custom/index.spec.ts')?.toString();

    expect(content).toMatchInlineSnapshot(`
      "import { createTreeWithEmptyWorkspace } from '@nrwl/devkit/testing';
      import { Tree, readProjectConfiguration } from '@nrwl/devkit';

      import generator from './index';
      import { CustomGeneratorSchema } from './schema';

      describe('custom generator', () => {
        let appTree: Tree;
        const options: CustomGeneratorSchema = { name: 'test' };

        beforeEach(() => {
          appTree = createTreeWithEmptyWorkspace();
        });

        it('should run successfully', async () => {
          await generator(appTree, options);
          const config = readProjectConfiguration(appTree, 'test');
          expect(config).toBeDefined();
        })
      });
      "
    `);
  });

  it(`should throw when required props are missing`, async () => {
    expect(generator(tree, { name: '' })).rejects.toMatchInlineSnapshot(`[Error: name is required]`);
  });
});
