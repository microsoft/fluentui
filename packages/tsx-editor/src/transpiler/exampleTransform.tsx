export function transformExample(example: string, id: string) {
  const identifierPattern = /(?<=import { )(.*)(?= } from 'office-ui-fabric-react)/g;
  const importPattern = /(import.+?;)/g;
  let className = /(?<=var )(.*)(?= = \/\*\* @class \*\/ \(function \(_super)/.exec(example)![0];
  if (!className) {
    className = /(?<=var )(.*)(?= = function())/.exec(example)![0];
  }

  const identifiers: string[] = [];
  const imports: string[] = [];
  let temp;

  while ((temp = identifierPattern.exec(example))) {
    temp[0].split(', ').map((identifier: string) => identifiers.push(identifier));
  }

  while ((temp = importPattern.exec(example))) {
    imports.push(temp[0]);
  }

  imports.map(imp => {
    example = example.replace(imp, '');
  });

  example = example.replace('export ', '');
  example =
    'const {' +
    identifiers.map(identifier => ' ' + identifier) +
    ', Fabric } = window.Fabric;\n' +
    example +
    `
    ReactDOM.render(
      React.createElement(Fabric, null, React.createElement(${className}, null)),
      document.getElementById('${id}')
    );
    `;
  return example;
}
