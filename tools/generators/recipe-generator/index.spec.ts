import { createTreeWithEmptyWorkspace } from '@nrwl/devkit/testing';
import { Tree } from '@nrwl/devkit';
import * as path from 'path';

import generator from './index';
import { RecipeGeneratorGeneratorSchema } from './schema';

const recipesRoot = 'apps/recipes-react-components/src/recipes';
const recipeName = 'Hello World';
const recipePackageName = 'hello-world';

describe('recipe-generator generator', () => {
  let tree: Tree;
  const options: RecipeGeneratorGeneratorSchema = { recipeName };

  beforeEach(() => {
    tree = createTreeWithEmptyWorkspace();
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

    const storyContent = tree.read(path.join(recipesRoot, recipePackageName, 'HelloWorld.stories.mdx'))?.toString();
    const codeSnippetContent = tree
      .read(path.join(recipesRoot, recipePackageName, 'code-snippets/HelloWorld.tsx'))
      ?.toString();
    const codeSnippetIndexContent = tree
      .read(path.join(recipesRoot, recipePackageName, 'code-snippets/index.ts'))
      ?.toString();

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
