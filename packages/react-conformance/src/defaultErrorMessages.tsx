import { IsConformantOptions } from './types';
import { ComponentDoc } from 'react-docgen-typescript';

import chalk from 'chalk';
import * as _ from 'lodash';
import * as path from 'path';
import parseDocblock from './utils/parseDocblock';

/* eslint-disable @typescript-eslint/naming-convention */

export const defaultErrorMessages = {
  'has-docblock': (componentInfo: ComponentDoc, testInfo: IsConformantOptions, error: string) => {
    const { displayName, componentPath } = testInfo;
    const fileName = path.basename(componentPath);
    const docblock = parseDocblock(componentInfo.description);
    const docBlockLength = _.words(docblock.description).length.toString();

    // Message Description: Handles scenario where there is no existing docblock in the componentPath.
    //
    // It appears that "displayName" doesn't have a docblock in the file:: "componentPath".
    // To Resolve this issue:
    // 1. Consider adding a descriptive 5 to 25 word docblock in "fileName".
    if (_.words(docblock.description).length === 0) {
      console.log(
        defaultErrorMessage(
          `has-docblock`,
          displayName,
          'docblock in the file: ' + paragraph() + chalk.green.italic(componentPath),
        ) +
          resolveErrorMessages([
            `Consider adding a descriptive` +
              chalk.hex('#e00000')(' 5 ') +
              'to' +
              chalk.hex('#e00000')(' 25 ') +
              'word docblock in ' +
              chalk.hex('#e00000')(fileName),
          ]),
        receivedErrorMessage(error),
      );
    }

    // Message Description: Handles scenario where a docblock is received but doesn't meet the min and max requirements.
    //
    // It appears that "displayName" doesn't have a docblock between 5 and 25 words.
    // It has a word count of: "docBlockLength"
    // Here is "displayName"'s docblock: "docblock.description"
    // To Resolve this issue:
    // 1. Make sure that your docblock meets the required word count of 5 to 25 words.
    else {
      console.log(
        defaultErrorMessage(
          `has-docblock`,
          displayName,
          'docblock between 5 and 25 words. It has a word count of: ' +
            chalk.green.italic(docBlockLength) +
            paragraph() +
            'Here is ' +
            chalk.white(displayName) +
            chalk.white(`'s`) +
            ' docblock: ' +
            paragraph() +
            chalk.green.italic(docblock.description),
        ) +
          resolveErrorMessages([
            `Make sure that your docblock meets the required word count of ` +
              chalk.hex('#e00000')('5') +
              ' to ' +
              chalk.hex('#e00000')(`25`) +
              ' words.',
          ]),
        receivedErrorMessage(error),
      );
    }
  },

  'exports-component': (componentInfo: ComponentDoc, testInfo: IsConformantOptions, error: string) => {
    const { componentPath, displayName } = testInfo;
    const fileName = path.basename(componentPath);
    const componentFile = require(componentPath);

    // Message Description: There are no matching exported components that match the displayName.
    //
    // It appears that "Component" doesn't have a export in: "componentPath"
    // Here are the available exported component's from your file: "componentFile"
    // To Resolve this issue:
    // 1. Make sure that your component's "fileName" file contains an export for "displayName".
    // 2. Check to see if you component uses export default and consider enabling useDefaultExport in your
    // isConformant test.
    console.log(
      defaultErrorMessage(
        `exports-component`,
        displayName,
        'export in: ' +
          paragraph() +
          chalk.green.italic(componentPath) +
          paragraph() +
          `Here are the available exported component's from your file:` +
          paragraph() +
          chalk.green(formatObject(componentFile)),
      ) +
        resolveErrorMessages([
          `Make sure that your component's ` +
            chalk.hex('#e00000')(fileName) +
            ' file contains an export for ' +
            chalk.hex('#e00000')(displayName) +
            '.',
          'Check to see if you component uses export default and consider enabling' +
            chalk.hex('#e00000')(' useDefaultExport ') +
            'in your isConformant test.',
        ]),
      receivedErrorMessage(error),
    );
  },

  'component-renders': (componentInfo: ComponentDoc, testInfo: IsConformantOptions, error: string) => {
    const { displayName, componentPath, requiredProps } = testInfo;
    const typesFile = componentPath.replace('tsx', 'types.ts');

    // Message Description: Handles scenario where a invalid return is received and the user provides requiredProps.
    //
    // It appears that displayName doesn't have a valid return.
    // It currently is receiving the requiredProps: "requiredProps"
    // Check to see if you are including all of the required props in your types file: "typesFile"
    // To Resolve this issue:
    // 1. Make sure that your are including all of the required props to render in isConformant.
    // 2. Make sure that your component's "displayName".base.tsx file contains a valid return statement.
    // 3. Check to see if your component works as expected with mount and safeMount.
    if (requiredProps) {
      console.log(
        defaultErrorMessage(
          `component-renders`,
          displayName,
          'valid return. It currently is receiving the requiredProps:' +
            paragraph() +
            chalk.green(formatObject(requiredProps)) +
            paragraph() +
            'Check to see if you are including all of the required props in your types file: ' +
            paragraph() +
            chalk.green.italic(typesFile),
        ) +
          resolveErrorMessages([
            `Make sure that your are including all of the required props to render in isConformant ` +
              chalk.hex('#f7ae65').bold('requiredProps') +
              '.',
            `Make sure that your component's ` +
              chalk.hex('#e00000')(displayName + '.base.tsx') +
              ' file contains a valid return statement.',
            'Check to see if your component works as expected with' +
              chalk.hex('#e00000')(' mount ') +
              'and' +
              chalk.hex('#e00000')(' safeMount') +
              '.',
          ]),
        receivedErrorMessage(error),
      );
    }

    // Message Description: Handles scenario where an invalid return is received and there are no requiredProps.
    //
    // It appears that "displayName" doesn't have a valid return and is not receiving any requiredProps.
    // Check to see if you are missing any required props in your component's types file: "typesFile"
    // To Resolve this issue:
    // 1. Make sure that your are including all of the required props to render in isConformant requiredProps.
    // 2. Make sure that your component's "displayName".base.tsx file contains a valid return statement.
    // 3. Check to see if your component works as expected with mount and safeMount.
    else {
      console.log(
        defaultErrorMessage(
          `component-renders`,
          displayName,
          'valid return and is not receiving any requiredProps.' +
            paragraph() +
            `Check to see if you are missing any required props in your component's types file:` +
            paragraph() +
            chalk.green.italic(typesFile),
        ) +
          resolveErrorMessages([
            `Make sure that your are including all of the required props to render in isConformant ` +
              chalk.hex('#e00000')('requiredProps') +
              '.',
            `Make sure that your component's ` +
              chalk.hex('#e00000')(displayName + '.base.tsx') +
              ' file contains a valid return statement.',
            'Check to see if your component works as expected with' +
              chalk.hex('#e00000').bold(' mount ') +
              'and' +
              chalk.hex('#c70000').bold(' safeMount') +
              '.',
          ]),
        receivedErrorMessage(error),
      );
    }
  },

  'name-matches-filename': (componentInfo: ComponentDoc, testInfo: IsConformantOptions, error: string) => {
    const { displayName, componentPath } = testInfo;
    const fileName = path.basename(componentPath, path.extname(componentPath));

    // Message Description: Handles scenario where the displayName doesn't match the component's filename.
    //
    // It appears that "displayName" doesn't have a matching filename.
    // It received a filename called "filename" instead of "displayName".
    // To Resolve this issue:
    // 1. Make sure that your component's filename matches the isConformant displayName: "displayName".
    console.log(
      defaultErrorMessage(
        `name-matches-filename`,
        displayName,
        'matching filename.' +
          paragraph() +
          'It received a filename called ' +
          chalk.green(fileName) +
          ' instead of ' +
          chalk.green(displayName),
      ) +
        resolveErrorMessages([
          `Make sure that your component's filename matches the isConformant displayName: ` +
            chalk.hex('#e00000')(displayName),
        ]) +
        receivedErrorMessage(error),
    );
  },

  'exported-top-level': (componentInfo: ComponentDoc, testInfo: IsConformantOptions, error: string) => {
    const { displayName, componentPath } = testInfo;
    const rootPath = componentPath.replace(/[\\/]src[\\/].*/, '');
    const indexFile = path.join(rootPath, 'src', 'index');

    // Message Description: Handles scenario where the displayName doesn't exist in the index file.
    //
    // It appears that "displayName" doesn't have a top level export in: "indexFile".
    // To Resolve this issue:
    // 1. Make sure that your component's index'.ts file contains "export * from './"displayName"';
    // 2.Check if your component is internal and consider enabling isInternal in your isConformant test.
    console.log(
      defaultErrorMessage(
        `exported-top-level`,
        displayName,
        'top level export in:' + paragraph() + chalk.green.italic(indexFile),
      ) +
        resolveErrorMessages([
          `Make sure that your component's ` +
            chalk.hex('#e00000')('index.ts') +
            ' file contains ' +
            chalk.hex('#e00000')(`export * from './` + displayName + `';`),
          'Check if your component is internal and consider enabling' +
            chalk.hex('#e00000')(' isInternal ') +
            'in your isConformant test.',
        ]),
      receivedErrorMessage(error),
    );
  },

  'has-top-level-file': (componentInfo: ComponentDoc, testInfo: IsConformantOptions, error: string) => {
    const { displayName, componentPath } = testInfo;
    const rootPath = componentPath.replace(/[\\/]src[\\/].*/, '');
    const topLevelFile = path.join(rootPath, 'src', displayName);

    // Message Description: Handles scenario where the displayName doesn't match the component's filename.
    //
    // It appears that "displayName" doesn't have a top level file in: "topLevelFile"
    // To Resolve this issue:
    // 1. Make sure that your component's index'.ts file contains "export * from './"displayName"';
    // 2.Check if your component is internal and consider enabling isInternal in your isConformant test.
    console.log(
      defaultErrorMessage(
        `has-top-level-file`,
        displayName,
        'top level file in:' + paragraph() + chalk.green.italic(topLevelFile),
      ) +
        resolveErrorMessages([
          `Make sure that your component's folder and name match it's displayName: ` +
            chalk.hex('#e00000').bold(displayName),
          'Check if your component is internal and consider enabling' +
            chalk.hex('#e00000')(' isInternal ') +
            'in your isConformant test.',
        ]) +
        receivedErrorMessage(error),
    );
  },

  'component-has-displayname': (componentInfo: ComponentDoc, testInfo: IsConformantOptions, error: string) => {
    const { componentPath, Component, displayName } = testInfo;
    const constructorName = Component.prototype?.constructor.name;
    const componentDisplayName = Component.displayName || constructorName;
    const fileName = path.basename(componentPath);

    // Message Description: Handles scenario where the component's display name is undefined.
    //
    // It appears that "displayName" doesn't have a display name in: "componentPath"
    // To Resolve this issue:
    // 1. Make sure that "fileName" contains "displayName".displayName = '"displayName"'
    // 2. Check to see if something is removing "displayName"'s displayName.
    if (componentDisplayName === (null || 'Styledundefined')) {
      console.log(
        defaultErrorMessage(
          `component-has-displayname`,
          displayName,
          'display name in:' + paragraph() + chalk.green.italic(componentPath),
        ) +
          resolveErrorMessages([
            'Make sure that ' +
              chalk.hex('#e00000')(fileName) +
              ' contains ' +
              chalk.hex('#e00000')(displayName + '.displayName = ') +
              chalk.hex('#e00000')(displayName) +
              `'`,
            'Check to see if something is removing ' + chalk.hex('#e00000')(displayName) + `s displayName.`,
          ]) +
          receivedErrorMessage(error),
      );
    }

    // Message Description: Handles scenario where the component's display name doesn't match isConformant's displayName
    //
    // It appears that "displayName" doesn't have a correct display name. It received: "componentDisplayName"
    // To Resolve this issue:
    // 1. Make sure that "fileName" contains "displayName".displayName = '"displayName"'
    else {
      console.log(
        defaultErrorMessage(
          `component-has-displayname`,
          displayName,
          'correct display name. It received:' + chalk.green.bold(componentDisplayName.replace('Styled', '')),
        ) +
          resolveErrorMessages([
            'Make sure that ' +
              chalk.hex('#e00000')(fileName) +
              ' contains ' +
              chalk.hex('#e00000')(displayName + '.displayName = ') +
              chalk.hex('#e00000')(displayName) +
              `'`,
          ]) +
          receivedErrorMessage(error),
      );
    }
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

  return paragraph() + chalk.yellow.bold('To resolve this issue:') + resolveMessage.join('') + paragraph();
}

/** Generates the starting default error message: ( "It appears that __displayName__ doesn't have a __errorMessage__." )
 *  @param testName The conformance test's name.
 *  @param displayName The component's name.
 *  @param errorMessage Why the test is failing.
 */
function defaultErrorMessage(testName: string, displayName: string, errorMessage: string) {
  return (
    paragraph() +
    chalk.white.bold.italic.bgHex('#2e2e2e')(testName) +
    paragraph() +
    chalk.yellow(`It appears that `) +
    chalk.white(displayName) +
    chalk.yellow(` doesn't have a ` + errorMessage) +
    paragraph()
  );
}

/** Generates caught error message in defaultTests.
 *  @param error The caught error message in defaultTests.
 */
function receivedErrorMessage(error: string) {
  return paragraph() + chalk.white.bold.bgRed(`Here's the full error message:`) + paragraph() + error + paragraph(2);
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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function formatObject(obj: any) {
  const results = [];

  for (const libName of Object.keys(obj)) {
    results.push(`${libName}: ${obj[libName] + ','}`);
  }

  return results.join('\n');
}
