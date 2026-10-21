import { createTreeWithEmptyWorkspace } from '@nx/devkit/testing';
import {
  Tree,
  readJson,
  readJsonFile,
  updateJson,
  workspaceRoot,
  getWorkspaceLayout,
  readProjectConfiguration,
  joinPathFragments,
} from '@nx/devkit';
import { libraryGenerator } from '@nx/js';

import generator from './index';
import { WorkspaceGeneratorGeneratorSchema } from './schema';

describe('workspace-generator generator', () => {
  let tree: Tree;
  const options: WorkspaceGeneratorGeneratorSchema = { name: 'custom' };

  beforeEach(() => {
    tree = createTreeWithEmptyWorkspace({ formatter: 'prettier' });
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
        getWorkspaceLayout,
        joinPathFragments,
      } from '@nx/devkit';
      import { libraryGenerator } from '@nx/js';

      import { getProjectConfig } from '../../utils';

      import { CustomGeneratorSchema } from './schema';

      interface NormalizedSchema extends ReturnType<typeof normalizeOptions> {}

      export default async function (tree: Tree, schema: CustomGeneratorSchema) {
        await libraryGenerator(tree, {
          name: schema.name,
          directory: joinPathFragments(getWorkspaceLayout(tree).libsDir, schema.name),
          formatter: 'prettier',
        });

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

  it('should create a library with the generated Nx API call', async () => {
    const rootPackageJson = readJsonFile<{ devDependencies: { typescript: string } }>(
      joinPathFragments(workspaceRoot, 'package.json'),
    );
    updateJson(tree, 'package.json', json => ({
      ...json,
      devDependencies: { ...json.devDependencies, typescript: rootPackageJson.devDependencies.typescript },
    }));
    const name = 'example';
    const directory = joinPathFragments(getWorkspaceLayout(tree).libsDir, name);

    await libraryGenerator(tree, { name, directory, formatter: 'prettier' });

    expect(readProjectConfiguration(tree, name).root).toEqual(directory);
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
          appTree = createTreeWithEmptyWorkspace({ formatter: 'prettier' });
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
