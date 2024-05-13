import { createTreeWithEmptyWorkspace } from '@nx/devkit/testing';
import { Tree, readJson } from '@nx/devkit';

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
    expect(tree.exists('/tools/generators/custom/files/constants.ts__tmpl__')).toBeTruthy();
    expect(tree.exists('/tools/generators/custom/lib/utils.ts')).toBeTruthy();
    expect(tree.exists('/tools/generators/custom/lib/utils.spec.ts')).toBeTruthy();
    expect(tree.exists('/tools/generators/custom/README.md')).toBeTruthy();
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
      "import * as path from 'path';
      import {
        Tree,
        formatFiles,
        installPackagesTask,
        names,
        generateFiles,
      } from '@nx/devkit';
      import { libraryGenerator } from '@nx/workspace/generators';

      import { getProjectConfig } from '../../utils';

      import { CustomGeneratorSchema } from './schema';

      interface NormalizedSchema extends ReturnType<typeof normalizeOptions> {}

      export default async function (tree: Tree, schema: CustomGeneratorSchema) {
        await libraryGenerator(tree, { name: schema.name });

        const normalizedOptions = normalizeOptions(tree, schema);

        addFiles(tree, normalizedOptions);

        await formatFiles(tree);

        return () => {
          installPackagesTask(tree);
        };
      }

      function normalizeOptions(tree: Tree, options: CustomGeneratorSchema) {
        const project = getProjectConfig(tree, { packageName: options.name });

        return {
          ...options,
          ...project,
          ...names(options.name),
        };
      }

      /**
       * NOTE: remove this if your generator doesn't process any static/dynamic templates
       */
      function addFiles(tree: Tree, options: NormalizedSchema) {
        const templateOptions = {
          ...options,
          tmpl: '',
        };

        generateFiles(
          tree,
          path.join(__dirname, 'files'),
          path.join(options.projectConfig.root, options.name),
          templateOptions
        );
      }
      "
    `);
  });

  it('should generate testing boilerplate', async () => {
    await generator(tree, options);

    const content = tree.read('/tools/generators/custom/index.spec.ts')?.toString();

    expect(content).toMatchInlineSnapshot(`
      "import { createTreeWithEmptyWorkspace } from '@nx/devkit/testing';
      import { Tree, readProjectConfiguration } from '@nx/devkit';

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
        });
      });
      "
    `);
  });

  it(`should generate README.md boilerplate`, async () => {
    await generator(tree, options);

    const content = tree.read('/tools/generators/custom/README.md')?.toString();

    expect(content).toMatchInlineSnapshot(`
      "# custom

      Workspace Generator ...TODO...

      <!-- toc -->

      - [Usage](#usage)
        - [Examples](#examples)
      - [Options](#options)
        - [\`name\`](#name)

      <!-- tocstop -->

      ## Usage

      \`\`\`sh
      yarn nx g @fluentui/workspace-plugin:custom ...
      \`\`\`

      Show what will be generated without writing to disk:

      \`\`\`sh
      yarn nx g @fluentui/workspace-plugin:custom --dry-run
      \`\`\`

      ### Examples

      \`\`\`sh
      yarn nx g @fluentui/workspace-plugin:custom
      \`\`\`

      ## Options

      #### \`name\`

      Type: \`string\`

      TODO...
      "
    `);
  });
  it(`should throw when required props are missing`, async () => {
    await expect(generator(tree, { name: '' })).rejects.toMatchInlineSnapshot(`[Error: name is required]`);
  });
});
