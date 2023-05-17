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
    expect(storyContent).toMatchInlineSnapshot(`
      "import LinkTo from '@storybook/addon-links/react';
      import { Example } from '../../templates';
      import { Meta } from '@storybook/addon-docs';
      import { HelloWorldSnippetExample } from './code-snippets';

      <Meta title=\\"Concepts/Recipes/Hello World\\" />

      ---

      # Hello World recipe

      ### **Overview**

      <!--
      Add a description of the recipe here. This should be a short description and what it does.
      -->

      ### **Ingredients**

      <!--
      Add a list of ingredients here. This should be a list of required/needed dependencies such as: @fluentui/react-button.
      -->

      ## **Steps**

      <!--
      Add a list of steps here. This should be an explanation of how to achieve the outcome.
      Note: Code snippets in this section should be minimal and only include the important parts of the component.
      -->

      This is an example of a code snippet:

      <TemplateExample>
        <HelloWorldSnippetExample />
      </TemplateExample>

      \`\`\`tsx
      <Button>This is a Button</Button>
      \`\`\`

      ## **Variants**

      <!--
      Add a list of variants here, not all recipes will have variants.
      When adding examples, make sure to add a description of the variant and preferably explain the main idea over providing code snippets.
      -->

      ## **Best practices**

      <!--
      Add a list of best practices here. This list could have do's and don'ts or just general guidelines.
      -->
      "
    `);
  });
});
