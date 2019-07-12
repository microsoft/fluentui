export function transformExample(example: string, id: string) {
  const classNamePattern = /(?<=var )(.*)(?= = \/\*\* @class \*\/ \(function \(_super)/g;
  const identifierPattern = /(?<=import { )(.*)(?= } from 'office-ui-fabric-react)/g;
  const constNamePattern = /(?<=var )(.*)(?= = function())/g;
  const importPattern = /(import.+?;)/g;
  const identifiers: string[] = [];
  const imports: string[] = [];
  let temp;
  let className;

  while ((temp = classNamePattern.exec(example))) {
    className = temp[0];
  }
  if (className === undefined) {
    while ((temp = constNamePattern.exec(example))) {
      className = temp[0];
    }
  }

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
      document.getElementById('${id.replace(' ', '')}')
    );
    `;
  return example;
}
