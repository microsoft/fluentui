import * as React from 'react';
import { makeLabel } from './utils';
export const Supported = () => /*#__PURE__*/ React.createElement('span', null, 'Supported');
export const Unsupported = () => /*#__PURE__*/ React.createElement('span', null, makeLabel());
Supported.parameters = {};
Supported.parameters.fullSourceIsRunnable = true;
Supported.parameters.fullSource =
  'import * as React from "react";\n\nexport const Supported = () => <span>Supported</span>;\n';
Unsupported.parameters = {};
Unsupported.parameters.fullSourceIsRunnable = false;
Unsupported.parameters.fullSource =
  'import * as React from "react";\n\nexport const Unsupported = () => <span>{makeLabel()}</span>;\n';
Unsupported.parameters.fullSourceUnsupportedImports = ['./utils'];
