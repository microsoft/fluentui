import * as _ from 'lodash'

import { imports } from '../../../Playground/renderConfig'
import { ComponentSourceManagerLanguage } from '../../ComponentSourceManager'

const name = 'fluent-ui-example'
const description =
  'An exported example from Fluent UI React, https://microsoft.github.io/fluent-ui-react/'
const dependencies = {
  ..._.mapValues(imports, pkg => pkg.version),
  // required to enable all features due old templates in https://github.com/codesandbox/codesandbox-importers
  // https://github.com/microsoft/fluent-ui-react/issues/1519
  'react-scripts': 'latest',
}

const createPackageJson = (mainFilename: string, language: ComponentSourceManagerLanguage) => ({
  content: JSON.stringify(
    {
      name,
      version: '1.0.0',
      description,
      main: mainFilename,
      dependencies,
    },
    null,
    2,
  ),
})

export default createPackageJson
