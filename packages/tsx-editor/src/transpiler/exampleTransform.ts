/**
 * classNamePattern - pattern to find the name of the class that should render
 * constNamePattern - pattern to find the name of the const that should render
 * identifierPattern - pattern to get all identifiers from the imports
 * importPattern - pattern to get all imports even if they have multilines
 */
export const classNamePattern = new RegExp('(?![var ])(.*)(?= = \\/\\*\\* @class \\*\\/ \\(function \\(_super\\))', 'g');
export const constNamePattern = new RegExp('(?![export var ])(.*)(?= = function)', 'g');
export const identifierPattern = new RegExp('(?![import {])([\\s\\S]*)(?=})');
export const importPattern = new RegExp("(?:import)([\\s\\S]+?)';", 'g');

export interface ITransformedExample {
  output?: string;
  error?: string;
}

interface IExampleData {
  [key: string]: string;
  exampleData: string;
  TestImages: string;
  PeopleExampleData: string;
}

const exampleDataFiles: IExampleData = {
  exampleData: require('!raw-loader!office-ui-fabric-react/lib/utilities/exampleData'),
  TestImages: require('!raw-loader!office-ui-fabric-react/lib/common/TestImages'),
  PeopleExampleData: require('!raw-loader!office-ui-fabric-react/lib/components/ExtendedPicker/examples/PeopleExampleData')
};

export function transformExample(example: string, id: string) {
  // RegExp need to reset because of global flag
  classNamePattern.lastIndex = 0;
  constNamePattern.lastIndex = 0;
  identifierPattern.lastIndex = 0;
  importPattern.lastIndex = 0;

  const identifiers: string[] = [];
  const imports: string[] = [];
  let temp;
  let className;
  const output: ITransformedExample = { output: undefined, error: undefined };

  example = example.replace("import * as React from 'react';", '');

  /**
   * Getting class name that should render, it will find all class names but will only
   * use the last one since the examples have the class that should render at the end.
   * If there is no such class then it will check for the last const which should be
   * the const that should be the one to render.
   */
  while ((temp = classNamePattern.exec(example))) {
    className = temp[0];
  }
  if (className === undefined) {
    while ((temp = constNamePattern.exec(example))) {
      className = temp[0];
    }
    if (className !== undefined) {
      className = className.replace('var ', '');
    }
  }

  /**
   * Getting all the imports from fabric and pushing them into an array.
   * If there are imports that do not come from OUFR then it will add an
   * error since the import is not supported.
   */
  while ((temp = importPattern.exec(example))) {
    let foundExampleImport = false;
    for (const filename of Object.keys(exampleDataFiles)) {
      if (temp[0].indexOf('/' + filename) !== -1) {
        example += `\n${exampleDataFiles[filename]}`;
        example = example.replace(temp[0], '');
        foundExampleImport = true;
      }
    }
    if (!/office-ui-fabric-react/.test(temp[0]) && !foundExampleImport) {
      output.error = `Error while transforming example: Unsupported import - ${temp[0]}.`;
    } else if (!foundExampleImport) {
      imports.push(temp[0]);
    }
  }

  /**
   * This will loop through all imports getting and saving the identifiers,
   * if no identifiers were found then it will just eliminate the import.
   * If identifiers were found, the string will be split, spaces will be removed,
   * and next line characters will also be removed.
   */
  imports.forEach((imp: string) => {
    temp = identifierPattern.exec(imp);
    if (temp !== null) {
      temp[0].split(',').forEach((ident: string) => {
        identifiers.push(ident.replace(/\s/g, ''));
      });
    }
    example = example.replace(imp, '');
  });

  // If there are exports in the code then they will be removed since they are not supported.
  example = example.replace(/^export /gm, '');

  /**
   * adding line to render React and adding identifiers.
   */
  example = `const { ${identifiers.join(', ')}, Fabric } = window.Fabric;\n
    ${example}
    ReactDOM.render(
      React.createElement(Fabric, null, React.createElement(${className}, null)),
      document.getElementById('${id}')
    );
    `;
  output.output = example;
  return output;
}
