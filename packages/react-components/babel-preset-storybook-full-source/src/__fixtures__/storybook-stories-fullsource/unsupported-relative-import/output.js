import * as React from 'react';
import { makeLabel } from './utils';
export const Default = () => /*#__PURE__*/ React.createElement('span', null, makeLabel());
Default.parameters = {};
Default.parameters.fullSource =
  'import * as React from "react";\n\nexport const Default = () => <span>{makeLabel()}</span>;\n';
Default.parameters.fullSourceUnsupportedImports = ['./utils'];
