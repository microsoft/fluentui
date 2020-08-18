import * as _ from 'lodash';
import { ComponentSourceManagerLanguage } from '../../../docs/src/components/ComponentDoc/ComponentSourceManager';
import { imports } from '../../../docs/src/components/Playground/renderConfig';

const name = 'fluent-ui-example';
const description = 'An exported example from Fluent UI React, https://aka.ms/fluent-ui/';

function createDependencies(code: string) {
  // Will include only required packages intentionally like "react" or required by a current example
  const filteredPackages = _.pickBy(
    imports,
    (declaration, name) => declaration.required || new RegExp(`from ['|"]${name}['|"]`).exec(code),
  );

  return {
    ..._.mapValues(filteredPackages, pkg => pkg.version),
    // required to enable all features due old templates in https://github.com/codesandbox/codesandbox-importers
    // https://github.com/microsoft/fluent-ui-react/issues/1519
    'react-scripts': 'latest',
  };
}

export const createPackageJson = (mainFilename: string, code: string, language: ComponentSourceManagerLanguage) => ({
  content: JSON.stringify(
    {
      name,
      version: '1.0.0',
      description,
      main: mainFilename,
      dependencies: createDependencies(code),
    },
    null,
    2,
  ),
});
