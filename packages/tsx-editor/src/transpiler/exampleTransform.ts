export interface ITransformedExample {
  output?: string;
  error?: string;
}

export function transformExample(example: string, id: string) {
  const classNamePattern = new RegExp('(?<=var )(.*)(?= = /\\*\\* @class \\*/ \\(function \\(_super)', 'g');
  const constNamePattern = new RegExp('(?<=var )(.*)(?= = function())', 'g');
  const identifierPattern = new RegExp('(?<=import {)([\\s\\S]*)(?=} from)', 'g');
  const importPattern = new RegExp("(?:import)([\\s\\S]*?)(?:';)", 'g');
  const identifiers: string[] = [];
  const imports: string[] = [];
  let temp;
  let className;
  const output: ITransformedExample = { output: undefined, error: undefined };

  example = example.replace("import * as React from 'react';", '');

  // Getting classname
  while ((temp = classNamePattern.exec(example))) {
    className = temp[0];
  }
  if (className === undefined) {
    while ((temp = constNamePattern.exec(example))) {
      className = temp[0];
    }
  }

  while ((temp = importPattern.exec(example))) {
    if (!/office-ui-fabric-react/.test(temp[0])) {
      output.error = 'error: unsupported imports';
    } else {
      imports.push(temp[0]);
    }
  }

  imports.map((imp: string) => {
    temp = identifierPattern.exec(imp);
    if (temp !== null) {
      temp[0].split(',').map((ident: string) => {
        ident.replace('\n', '');
        ident.replace(' ', '');
        identifiers.push(ident);
      });
    }
    example = example.replace(imp, '');
  });

  while (/export/.test(example)) {
    example = example.replace('export', '');
  }

  example =
    'const {' +
    identifiers.map(identifier => identifier) +
    ', Fabric } = window.Fabric;\n' +
    example +
    `
    ReactDOM.render(
      React.createElement(Fabric, null, React.createElement(${className}, null)),
      document.getElementById('${id}')
    );
    `;

  output.output = example;
  return output;
}
