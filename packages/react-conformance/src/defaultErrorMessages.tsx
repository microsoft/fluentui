import { IsConformantOptions } from './types';
import { ComponentDoc } from 'react-docgen-typescript';

import chalk from 'chalk';
import os from 'os';
import * as _ from 'lodash';
import * as path from 'path';
import parseDocblock from './utils/parseDocblock';

/* eslint-disable @typescript-eslint/naming-convention */

/**
 * General structure of isConformant error messages:
 * 1. Call __defaultErrorMessage()__ and pass in the `testName`, `displayName`, and the `errorMessage`.
 *    It will return:
 *
 *    `testName`
 *
 *    It appears that `displayName` does not have a `errorMessage`
 *
 * 2. Call __resolveErrorMessages()__ and pass in a array of `resolveErrorMessages` to help solve the error.
 *    It will return:
 *
 *    To resolve this issue:
 *    [`resolveErrorMessages`]
 *
 * 3. Call __receivedErrorMessage__ and pass in the `error` caught from the isConformant test.
 *    It will return:
 *
 *    Here's the full error message:
 *
 *    `error`
 *
 * 4. Reference __errorMessageColors__ and color code the passed arguments for `errorMessage` and
 *    `resolveErrorMessages` array accordingly.
 */
export const defaultErrorMessages = {
  'has-docblock': (componentInfo: ComponentDoc, testInfo: IsConformantOptions, error: string) => {
    const { displayName, componentPath } = testInfo;
    const { testErrorName, testErrorInfo, testErrorPath, resolveInfo } = errorMessageColors;
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
          'docblock in the file: ' + paragraph() + testErrorPath(componentPath),
        ) +
          resolveErrorMessages([
            `Consider adding a descriptive` +
              resolveInfo(' 5 ') +
              'to' +
              resolveInfo(' 25 ') +
              'word docblock in ' +
              resolveInfo(fileName),
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
            testErrorInfo(docBlockLength) +
            paragraph() +
            'Here is ' +
            testErrorName(displayName + `'s`) +
            ' docblock: ' +
            paragraph() +
            testErrorInfo(docblock.description),
        ) +
          resolveErrorMessages([
            `Make sure that your docblock meets the required word count of ` +
              resolveInfo('5') +
              ' to ' +
              resolveInfo(`25`) +
              ' words.',
          ]),
        receivedErrorMessage(error),
      );
    }
    failedTests.push('has-docblock');
  },

  'exports-component': (componentInfo: ComponentDoc, testInfo: IsConformantOptions, error: string) => {
    const { componentPath, displayName } = testInfo;
    const { testErrorPath, resolveInfo } = errorMessageColors;
    const fileName = path.basename(componentPath);

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
        'export in: ' + paragraph() + testErrorPath(componentPath),
      ) +
        resolveErrorMessages([
          `Make sure that your component's ` +
            resolveInfo(fileName) +
            ' file contains an export for ' +
            resolveInfo(displayName) +
            '.',
          'Check to see if you component uses' +
            resolveInfo(' export default ') +
            'and consider enabling' +
            resolveInfo(' useDefaultExport ') +
            'in your isConformant test.',
        ]),
      receivedErrorMessage(error),
    );
    failedTests.push('exports-component');
  },

  'component-renders': (componentInfo: ComponentDoc, testInfo: IsConformantOptions, error: string) => {
    const { displayName, componentPath, requiredProps } = testInfo;
    const { testErrorInfo, testErrorPath, resolveInfo } = errorMessageColors;
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
      const formatRequiredProps = () => {
        return Object.entries(requiredProps)
          .map(([propName, propValue]) => `${propName}: ${propValue}`)
          .join(',\n');
      };

      console.log(
        defaultErrorMessage(
          `component-renders`,
          displayName,
          'valid return. It currently is receiving the requiredProps:' +
            paragraph() +
            testErrorInfo(formatRequiredProps()) +
            paragraph() +
            'Check to see if you are including all of the required props in your types file: ' +
            paragraph() +
            testErrorPath(typesFile),
        ) +
          resolveErrorMessages([
            `Make sure that your are including all of the required props to render in isConformant ` +
              resolveInfo('requiredProps') +
              '.',
            `Make sure that your component's ` +
              resolveInfo(displayName + '.base.tsx') +
              ' file contains a valid return statement.',
            'Check to see if your component works as expected with' +
              resolveInfo(' mount ') +
              'and' +
              resolveInfo(' safeMount') +
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
            testErrorPath(typesFile),
        ) +
          resolveErrorMessages([
            `Make sure that your are including all of the required props to render in isConformant ` +
              resolveInfo('requiredProps') +
              '.',
            `Make sure that your component's ` +
              resolveInfo(displayName + '.base.tsx') +
              ' file contains a valid return statement.',
            'Check to see if your component works as expected with' +
              resolveInfo(' mount ') +
              'and' +
              resolveInfo(' safeMount') +
              '.',
          ]),
        receivedErrorMessage(error),
      );
    }
    failedTests.push('component-renders');
  },

  'component-has-displayname': (componentInfo: ComponentDoc, testInfo: IsConformantOptions, error: string) => {
    const { componentPath, Component, displayName } = testInfo;
    const { testErrorInfo, testErrorPath, resolveInfo } = errorMessageColors;
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
          'display name in:' + paragraph() + testErrorPath(componentPath),
        ) +
          resolveErrorMessages([
            'Make sure that ' +
              resolveInfo(fileName) +
              ' contains ' +
              resolveInfo(displayName + '.displayName = ') +
              resolveInfo(`'` + displayName + `'`),
            'Check to see if something is removing ' + resolveInfo(displayName + `'s`) + ` displayName.`,
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
          'correct display name. It received: ' + testErrorInfo(componentDisplayName.replace('Styled', '')),
        ) +
          resolveErrorMessages([
            'Make sure that ' +
              resolveInfo(fileName) +
              ' contains ' +
              resolveInfo(displayName + '.displayName = ') +
              resolveInfo(`'` + displayName + `'`),
          ]) +
          receivedErrorMessage(error),
      );
    }
    failedTests.push('component-has-displayname');
  },

  'name-matches-filename': (componentInfo: ComponentDoc, testInfo: IsConformantOptions, error: string) => {
    const { displayName, componentPath } = testInfo;
    const { testErrorInfo, resolveInfo } = errorMessageColors;
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
          testErrorInfo(fileName) +
          ' instead of ' +
          testErrorInfo(displayName),
      ) +
        resolveErrorMessages([
          `Make sure that your component's filename matches the isConformant displayName: ` + resolveInfo(displayName),
        ]) +
        receivedErrorMessage(error),
    );
    failedTests.push('name-matches-filename');
  },

  'exported-top-level': (componentInfo: ComponentDoc, testInfo: IsConformantOptions, error: string) => {
    const { displayName, componentPath } = testInfo;
    const { testErrorPath, resolveInfo } = errorMessageColors;
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
        'top level export in:' + paragraph() + testErrorPath(indexFile),
      ) +
        resolveErrorMessages([
          `Make sure that your component's ` +
            resolveInfo('index.ts') +
            ' file contains ' +
            resolveInfo(`export * from './` + displayName + `';`),
          'Check if your component is internal and consider enabling' +
            resolveInfo(' isInternal ') +
            'in your isConformant test.',
        ]),
      receivedErrorMessage(error),
    );
    failedTests.push('exported-top-level');
  },

  'has-top-level-file': (componentInfo: ComponentDoc, testInfo: IsConformantOptions, error: string) => {
    const { displayName, componentPath } = testInfo;
    const { testErrorPath, resolveInfo } = errorMessageColors;
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
        'top level file in:' + paragraph() + testErrorPath(topLevelFile),
      ) +
        resolveErrorMessages([
          `Make sure that your component's folder and name match it's displayName: ` + resolveInfo(displayName),
          'Check if your component is internal and consider enabling' +
            resolveInfo(' isInternal ') +
            'in your isConformant test.',
        ]) +
        receivedErrorMessage(error),
    );
    failedTests.push('has-top-level-file');
  },

  'is-static-property-of-parent': (componentInfo: ComponentDoc, testInfo: IsConformantOptions, error: string) => {
    const { componentPath, displayName } = testInfo;
    const { testErrorInfo, resolveInfo } = errorMessageColors;
    const componentFolder = componentPath.replace(path.basename(componentPath) + path.extname(componentPath), '');
    const dirName = path.basename(componentFolder).replace(path.extname(componentFolder), '');

    // Message Description: Handles scenario where the child component is not a static property of the parent..
    //
    // It appears that "displayName" doesn't have a existing static property in: "dirName"
    // To Resolve this issue:
    // 1. Include the child component: "displayName" as a static property of the parent: "dirName".
    // 2.Check to see if "displayName" is a parent component but contained in a directory with a different name.
    console.log(
      defaultErrorMessage(
        `is-static-property-of-parent`,
        displayName,
        'existing static property in: ' + testErrorInfo(dirName),
      ) +
        resolveErrorMessages([
          'Include the child component: ' +
            resolveInfo(displayName) +
            ' as a static property of the parent: ' +
            resolveInfo(dirName) +
            '.',
          'Check to see if ' +
            resolveInfo(displayName) +
            ` is a parent component but contained in a directory with a different name.`,
        ]) +
        receivedErrorMessage(error),
    );
    failedTests.push('is-static-property-of-parent');
  },

  'kebab-aria-attributes': (componentInfo: ComponentDoc, testInfo: IsConformantOptions, error: string) => {
    const { displayName } = testInfo;
    const { testErrorName, testErrorInfo, resolveInfo } = errorMessageColors;
    const props = Object.keys(componentInfo.props);
    const ariaProps = [];
    const kebabAriaProps = [];
    const ariaPropsDif = [];

    for (const prop of props) {
      if (prop.startsWith('aria') && !/^aria-[a-z]+$/.test(prop)) {
        ariaProps.push(prop);
        kebabAriaProps.push(prop.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase());
      }
    }

    for (let i = 0; i < ariaProps.length; i++) {
      ariaPropsDif.push(ariaProps[i] + ' → ' + testErrorInfo(kebabAriaProps[i]));
    }

    // Message Description: Handles scenario where an aria prop doesn't match kebab-casing.
    //
    // It appears that "displayName" doesn't have a aria attribute that uses kebab-casing.
    // The received aria attributes should be renamed to: "ariaPropsDif"
    // To Resolve this issue:
    // 1. Make sure that Sliders aria attribute props are using kebab-case.
    console.log(
      defaultErrorMessage(
        `kebab-aria-attributes`,
        displayName,
        'aria attribute that uses kebab-casing.' +
          paragraph() +
          'The received aria attributes should be renamed to:' +
          paragraph() +
          testErrorName(formatObject(ariaPropsDif)),
      ) +
        resolveErrorMessages([
          'Make sure that ' + resolveInfo(displayName + 's') + ` aria attribute props are using kebab-case.`,
        ]) +
        receivedErrorMessage(error),
    );
    failedTests.push('kebab-aria-attributes');
  },

  'consistent-callback-names': (componentInfo: ComponentDoc, testInfo: IsConformantOptions, error: string) => {
    const { displayName, testOptions = {} } = testInfo;
    const { testErrorInfo, resolveInfo } = errorMessageColors;
    const propNames = Object.keys(componentInfo.props);
    const ignoreProps = testOptions['consistent-callback-names']?.ignoreProps || [];
    const callbackNames = [];

    for (const propName of propNames) {
      if (!ignoreProps.includes(propName) && /^on(?!Render[A-Z])[A-Z]/.test(propName)) {
        const words = propName.slice(2).match(/[A-Z][a-z]+/g);
        if (words) {
          const lastWord = words[words.length - 1];
          if (!lastWord.endsWith('ed')) {
            callbackNames.push(propName);
          }
        }
      }
    }

    // Message Description: Handles scenario where the second word in a callback ends with 'ed'.
    //
    // It appears that "displayName" doesn't have a consistent callback name.
    // The received callback needs to be renamed: "callbackNames"
    // To Resolve this issue:
    // 1. Rename "displayName"'s callback props that don't end with "ed".
    // 2. Include the prop in TestOptions ignoreProps.
    console.log(
      defaultErrorMessage(
        `consistent-callback-names`,
        displayName,
        'consistent callback name.' +
          paragraph() +
          'The received callback needs to be renamed:' +
          paragraph() +
          testErrorInfo(formatObject(callbackNames)),
      ) +
        resolveErrorMessages([
          'Rename ' + resolveInfo(displayName + `'s`) + ` callback props to include "ed".`,
          `Include the prop in TestOptions` + resolveInfo(' ignoreProps') + '.',
        ]) +
        receivedErrorMessage(error),
    );
    failedTests.push('consistent-callback-names');
  },

  'as-renders-fc': (componentInfo: ComponentDoc, testInfo: IsConformantOptions, error: string) => {
    const { displayName } = testInfo;
    const { resolveInfo } = errorMessageColors;

    // Message Description: Receives an error when attempting to render as a functional component
    // or pass as to the next component.
    //
    // It appears that "displayName" doesn't have a valid return.
    // To Resolve this issue:
    // 1. Check if you are missing any requiredProps within the isConformant in your test file.
    // 2. If your component handles a forwardRef you will need to enable isConformant's asPropHandlesRef.
    // 3. Make sure that your component's "displayName".base.tsx file contains a valid return statement.
    // 4. Check to see if your component works as expected with mount and safe mount.
    console.log(
      defaultErrorMessage(`as-renders-fc`, displayName, `valid return.`) +
        resolveErrorMessages([
          'Check if you are missing any' + resolveInfo(' requiredProps ') + `within the test's isConformant. `,
          `If your component handles a forwardRef you will need to enable isConformant's ` +
            resolveInfo('asPropHandlesRef') +
            '.',
          `Make sure that your component's ` +
            resolveInfo(displayName + '.base.tsx') +
            ' file contains a valid return statement.',
          'Check to see if your component works as expected with' +
            resolveInfo(' mount ') +
            'and' +
            resolveInfo(' safeMount') +
            '.',
        ]) +
        receivedErrorMessage(error),
    );
    failedTests.push('as-renders-fc');
  },

  'as-renders-react-class': (componentInfo: ComponentDoc, testInfo: IsConformantOptions, error: string) => {
    const { displayName } = testInfo;
    const { resolveInfo } = errorMessageColors;

    // Message Description: Receives an error when attempting to render as a class component
    // or pass as to the next component.
    //
    // It appears that "displayName" doesn't have a valid return.
    // To Resolve this issue:
    // 1. Check if you are missing any requiredProps within the isConformant in your test file.
    // 2. If your component handles a forwardRef you will need to enable isConformant's asPropHandlesRef.
    // 3. Make sure that your component's "displayName".base.tsx file contains a valid return statement.
    // 4. Check to see if your component works as expected with mount and safe mount.
    console.log(
      defaultErrorMessage(`as-renders-react-class`, displayName, `valid return.`) +
        resolveErrorMessages([
          'Check if you are missing any' + resolveInfo(' requiredProps ') + `within the test's isConformant. `,
          `If your component handles a forwardRef you will need to enable isConformant's ` +
            resolveInfo('asPropHandlesRef') +
            '.',
          `Make sure that your component's ` +
            resolveInfo(displayName + '.base.tsx') +
            ' file contains a valid return statement.',
          'Check to see if your component works as expected with' +
            resolveInfo(' mount ') +
            'and' +
            resolveInfo(' safeMount') +
            '.',
        ]) +
        receivedErrorMessage(error),
    );
    failedTests.push('as-renders-react-class');
  },

  'as-passes-as-value': (componentInfo: ComponentDoc, testInfo: IsConformantOptions, error: string) => {
    const { displayName } = testInfo;
    const { resolveInfo } = errorMessageColors;

    // Message Description: Receives an error when attempting to render as a functional component
    // or pass as to the next component.
    //
    // It appears that "displayName" doesn't have a valid return.
    // To Resolve this issue:
    // 1. Check if you are missing any requiredProps within the isConformant in your test file.
    // 2. If your component handles a forwardRef you will need to enable isConformant's asPropHandlesRef.
    // 3. Make sure that your component's "displayName".base.tsx file contains a valid return statement.
    // 4. Check to see if your component works as expected with mount and safe mount.
    console.log(
      defaultErrorMessage(`as-passes-as-value`, displayName, `valid return.`) +
        resolveErrorMessages([
          'Check if you are missing any' + resolveInfo(' requiredProps ') + `within the test's isConformant. `,
          `If your component handles a forwardRef you will need to enable isConformant's ` +
            resolveInfo('asPropHandlesRef') +
            '.',
          `Make sure that your component's ` +
            resolveInfo(displayName + '.base.tsx') +
            ' file contains a valid return statement.',
          'Check to see if your component works as expected with' +
            resolveInfo(' mount ') +
            'and' +
            resolveInfo(' safeMount') +
            '.',
        ]) +
        receivedErrorMessage(error),
    );
    failedTests.push('as-passes-as-value');
  },

  'as-renders-html': (componentInfo: ComponentDoc, testInfo: IsConformantOptions, error: string) => {
    const { displayName } = testInfo;
    const { resolveInfo } = errorMessageColors;

    // Message Description: Receives an error when attempting to render as a functional component
    // or pass as to the next component.
    //
    // It appears that "displayName" doesn't have a 'as' property that can render HTML tags.
    // To Resolve this issue:
    // 1. Make sure that your component can correctly render as HTML tags.
    // 2. Check if you are missing any requiredProps within the isConformant in your test file.
    // 3. Make sure that your component's "displayName".base.tsx file contains a valid return statement.
    // 4. Check to see if your component works as expected with mount and safe mount.
    console.log(
      defaultErrorMessage(`as-renders-html`, displayName, `'as' property that can render HTML tags.`) +
        resolveErrorMessages([
          'Make sure that your component can correctly render as' + resolveInfo(' HTML tags') + '.',
          'Check if you are missing any' +
            resolveInfo(' requiredProps ') +
            'within the isConformant in your test file. ',
          `Make sure that your component's ` +
            resolveInfo(displayName + '.base.tsx') +
            ' file contains a valid return statement.',
          'Check to see if your component works as expected with' +
            resolveInfo(' mount ') +
            'and' +
            resolveInfo(' safeMount') +
            '.',
        ]) +
        receivedErrorMessage(error),
    );
    failedTests.push('as-renders-html');
  },

  'display-failed-tests': (componentInfo: ComponentDoc, testInfo: IsConformantOptions) => {
    const { displayName } = testInfo;
    const { failedText, failedDisplayname, sectionBackground } = errorMessageColors;

    if (failedTests.length > 0) {
      console.log(
        paragraph() +
          failedDisplayname(displayName) +
          failedText(' failed during the following isConformant tests:') +
          paragraph() +
          sectionBackground(formatObject(failedTests)),
      );
    }
  },
};

// An array of all the failed isConformant tests for the component.
const failedTests: string[] = [];

// Console message colors used in the test.
const errorMessageColors = {
  // Colors for the defaultErrorMessage section.
  testErrorText: chalk.yellow,
  testErrorName: chalk.white,
  testErrorInfo: chalk.green,
  testErrorPath: chalk.green.italic,
  // Colors for the resolveErrorMessages section.
  resolveText: chalk.cyan,
  resolveInfo: chalk.hex('#e00000'),
  // Colors for the receivedErrorMessage section.
  receivedErrorHeader: chalk.white.bold.bgRed,
  // Colors for the display-failed-tests section.
  failedText: chalk.white.bold,
  failedDisplayname: chalk.red.bold.underline,
  // Color for section headers.
  sectionBackground: chalk.white.bold.italic.bgHex('#2e2e2e'),
};

/** Generates the message for resolving the test error.
 *  @param resolveMessages Why the test is failing.
 */
function resolveErrorMessages(resolveMessages: string[]) {
  const { resolveText, sectionBackground } = errorMessageColors;
  const resolveMessage = [];

  if (resolveMessages.length > 1) {
    for (let i = 0; i < resolveMessages.length; i++) {
      resolveMessage.push(paragraph() + resolveText(i + 1 + '. ' + resolveMessages[i]));
    }
  } else {
    resolveMessage.push(paragraph() + resolveText(resolveMessages[0]));
  }

  return paragraph() + sectionBackground('To resolve this issue:') + resolveMessage.join('') + paragraph();
}

/**
 * Generates the starting default error message: ( "It appears that __displayName__ doesn't have a __errorMessage__." )
 * @param testName The conformance test's name.
 * @param displayName The component's name.
 * @param errorMessage Why the test is failing.
 */
function defaultErrorMessage(testName: string, displayName: string, errorMessage: string) {
  const { testErrorText, testErrorName, sectionBackground } = errorMessageColors;

  return (
    paragraph() +
    sectionBackground(testName) +
    paragraph() +
    testErrorText(`It appears that `) +
    testErrorName(displayName) +
    testErrorText(` doesn't have a ` + errorMessage) +
    paragraph()
  );
}

/** Generates caught error message in defaultTests.
 *  @param error The caught error message in defaultTests.
 */
function receivedErrorMessage(error: string) {
  const { receivedErrorHeader } = errorMessageColors;

  return paragraph() + receivedErrorHeader(`Here's the full error message:`) + paragraph() + error + paragraph(2);
}

/** Generates a paragraph.
 *  @param numberOfParagraphs The number of paragraphs to generate.
 */
const paragraph = (numberOfParagraphs?: number) => {
  return os.EOL.repeat(numberOfParagraphs || 2);
};

/** Formats a given object to be displayed in the console.
 *  @param obj The object to format.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function formatObject(obj: any) {
  if (obj) {
    const results = [];
    if (obj.length > 1) {
      for (const libName of Object.keys(obj)) {
        results.push(parseInt(libName, 10) + 1 + `: ${obj[libName]} `);
      }
    } else {
      results.push(`${obj[0]}`);
    }
    return results.join('\n');
  } else {
    return 'received undefined';
  }
}
