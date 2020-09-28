import { IsConformantOptions } from './types';
import { ComponentDoc } from 'react-docgen-typescript';

import chalk from 'chalk';

import * as _ from 'lodash';
import * as path from 'path';

/* eslint-disable @typescript-eslint/naming-convention */

export const defaultErrorMessages = {
  'component-has-displayname': (componentInfo: ComponentDoc, testInfo: IsConformantOptions) => {
    const { componentPath, Component, displayName } = testInfo;
    const constructorName = Component.prototype?.constructor.name;
    const componentDisplayName = Component.displayName || constructorName;
    const fileName = path.basename(componentPath);

    // If the component doesn't receive a display name.
    if (componentDisplayName === (null || 'Styledundefined')) {
      console.log(
        chalk.yellow(
          defaultErrorMessage(displayName, 'display name in:' + paragraph() + chalk.green.italic(componentPath)) +
            resolveErrorMessages([
              'Make sure that ' +
                chalk.red.bold(fileName) +
                ' contains ' +
                chalk.red.bold(displayName + '.displayName = COMPONENT_NAME') +
                '.',
            ]),
        ),
      );
    }

    // If the component receives a display name but it isn't correct.
    else {
      console.log(
        chalk.yellow(
          defaultErrorMessage(
            displayName,
            'correct display name. It received: ' + chalk.red.bold(componentDisplayName.replace('Styled', '')),
          ) +
            resolveErrorMessages([
              'Make sure that ' + fileName + ' contains ' + chalk.red.bold('{ import ./version }') + '.',
              'Make sure that your version.ts file is configured correctly.',
            ]),
        ),
      );
    }
  },

  'exported-top-level': (componentInfo: ComponentDoc, testInfo: IsConformantOptions) => {
    const { displayName, componentPath } = testInfo;
    const rootPath = componentPath.replace(/[\\/]src[\\/].*/, '');
    const indexFile = path.join(rootPath, 'src', 'index');

    // If wrong values are received when checking if there is a top level index.ts file.
    console.log(
      chalk.yellow(
        defaultErrorMessage(displayName, 'top level export in:' + paragraph() + chalk.green.italic(indexFile)) +
          resolveErrorMessages([
            `Make sure that your component's ` +
              chalk.red.bold('index.ts') +
              ' file contains ' +
              chalk.red.bold(`export * from './` + displayName + `';`),
            'Check if your component is internal and consider enabling' +
              chalk.red.bold(' isInternal ') +
              'in your isConformant test.',
          ]),
      ),
    );
  },

  'has-top-level-file': (componentInfo: ComponentDoc, testInfo: IsConformantOptions) => {
    const { displayName, componentPath } = testInfo;
    const rootPath = componentPath.replace(/[\\/]src[\\/].*/, '');
    const topLevelFile = path.join(rootPath, 'src', displayName);

    // If wrong values are received when checking if the top level file exists.
    console.log(
      chalk.yellow(
        defaultErrorMessage(displayName, 'top level file in:' + paragraph() + chalk.green.italic(topLevelFile)) +
          resolveErrorMessages([
            `Make sure that your components folder matches it's displayName: ` + chalk.red.bold(displayName),
            'Check if your component is internal and consider enabling' +
              chalk.red.bold(' isInternal ') +
              'in your isConformant test.',
          ]),
      ),
    );
  },
};

/** Generates the message for resolving the test error.
 *  @param resolveMessages Why the test is failing.
 */
function resolveErrorMessages(resolveMessages: string[]) {
  const resolveMessage = [];

  for (let i = 0; i < resolveMessages.length; i++) {
    resolveMessage.push(paragraph() + chalk.cyan(i + 1 + '. ' + resolveMessages[i]));
  }

  return paragraph() + chalk.yellow.bold('To resolve this issue:') + resolveMessage.join('');
}

/** Generates the starting default error message.
 *  @param displayName The component's displayName.
 *  @param errorMessage Why the test is failing.
 */
function defaultErrorMessage(displayName: string, errorMessage: string) {
  return `It appears that ` + chalk.red.bold(displayName) + ` doesn't have a ` + errorMessage + ' ';
}

/** Generates a paragraph.
 *  @param numberOfParagraphs The number of paragraphs to generate.
 */
function paragraph(numberOfParagraphs?: number) {
  if (numberOfParagraphs) {
    const paragraphs = [];
    for (let i = -1; i < numberOfParagraphs; i++) {
      paragraphs.push(`
`);
    }
    return paragraphs.join('');
  } else {
    return `

`;
  }
}

/** Formats a provided object to make it appear readable in the console.
 *  @param obj The object to format.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
// function formatObject(obj: any) {
//   const results = [];

//   for (const libName of Object.keys(obj)) {
//     results.push(`${libName}: ${obj[libName].join(', ')}`);
//   }

//   return results.join('\n');
// }
