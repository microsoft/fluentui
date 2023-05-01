import * as path from 'path';

import { findGitRoot } from '@fluentui/scripts-monorepo';
import * as fs from 'fs-extra';
import { Actions } from 'node-plop';
import { NodePlopAPI } from 'plop';

const root = findGitRoot();

interface Answers {
  recipeName: string;
}
interface Data extends Answers {
  folderDir: string;
  packageName: string;
  fileName: string;
}

module.exports = (plop: NodePlopAPI) => {
  plop.setWelcomeMessage('This utility is a helper to create recipes for Fluent UI React v9');

  plop.setGenerator('recipe', {
    description: 'New recipe',

    prompts: [
      {
        type: 'input',
        name: 'recipeName',
        message: 'New recipe name (ex: My Recipe Name):',
        validate: (input: string) =>
          /^([A-Z][a-z]+)([\ ][A-Z][a-z]+)+/m.test(input) ||
          'Must enter a Capitalized per word recipe name (ex: My Recipe Name)',
      },
    ],

    actions: (answers: Answers): Actions => {
      const data: Data = {
        ...answers,
        folderDir: path.resolve(root, './apps/recipes-react-components/src/recipes'),
        packageName: answers.recipeName.toLowerCase().replace(' ', '-'),
        fileName: answers.recipeName.replace(' ', ''),
      };

      return [
        () => checkIfRecipeAlreadyExists(data),
        {
          type: 'addMany',
          data,
          globOptions: { dot: true },
          destination: data.folderDir,
          templateFiles: './plop-templates/**/*',
        },
      ];
    },
  });
};

const checkIfRecipeAlreadyExists = (data: Data): string => {
  const { folderDir, packageName } = data;

  if (fs.existsSync(path.resolve(folderDir, packageName))) {
    throw new Error(`The recipe ${packageName} already exists`);
  }
  return `Recipe ${packageName} does not exist yet`;
};
