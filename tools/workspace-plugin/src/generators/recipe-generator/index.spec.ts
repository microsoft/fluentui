import { createTreeWithEmptyWorkspace } from '@nx/devkit/testing';
import { addProjectConfiguration, Tree, writeJson } from '@nx/devkit';
import path from 'path';

import generator from './index';
import { RecipeGeneratorGeneratorSchema } from './schema';

const recipesRoot = 'packages/react-components/recipes/src/recipes';
const recipeName = 'Hello World';
const recipePackageName = 'hello-world';

const setup = (tree: Tree) => {
  const generateApp = () => {
    const paths = { root: 'packages/react-components/recipes' };
    writeJson(tree, path.join(paths.root, 'package.json'), {
      name: '@proj/recipes',
      private: true,
    });
    tree.write(path.join(paths.root, 'src/recipes/.gitkeep'), '');

    addProjectConfiguration(tree, '@proj/recipes', {
      root: paths.root,
      sourceRoot: path.join(paths.root, 'src'),
      projectType: 'application',
      targets: {},
    });
  };

  generateApp();
  return tree;
};

describe('recipe-generator generator', () => {
  let tree: Tree;
  const options: RecipeGeneratorGeneratorSchema = { recipeName };

  beforeEach(() => {
    tree = createTreeWithEmptyWorkspace();
    tree = setup(tree);
  });

  it('should generate boilerplate', async () => {
    await generator(tree, options);

    ['HelloWorld.stories.mdx', 'code-snippets/HelloWorld.tsx', 'code-snippets/index.ts', 'code-snippets', ''].forEach(
      file => {
        expect(tree.exists(path.join(recipesRoot, recipePackageName, file))).toBeTruthy();
      },
    );
  });

  it('should generate implementation boilerplate', async () => {
    await generator(tree, options);

    const storyContent = tree.read(path.join(recipesRoot, recipePackageName, 'HelloWorld.stories.mdx'), 'utf-8');
    const codeSnippetContent = tree.read(
      path.join(recipesRoot, recipePackageName, 'code-snippets/HelloWorld.tsx'),
      'utf-8',
    );
    const codeSnippetIndexContent = tree.read(
      path.join(recipesRoot, recipePackageName, 'code-snippets/index.ts'),
      'utf-8',
    );

    expect(codeSnippetContent).toMatchInlineSnapshot(`
      "import * as React from 'react';
      import { Button } from '@fluentui/react-components';

      export const HelloWorldSnippetExample = () => {
        return <Button>This is a Button</Button>;
      };
      "
    `);
    expect(codeSnippetIndexContent).toMatchInlineSnapshot(`
      "export * from './HelloWorld';
      "
    `);
    expect(storyContent).toMatchSnapshot();
  });
});
