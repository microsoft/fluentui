import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { FluentProvider, webLightTheme } from '@fluentui/react-components';
import { ReactTest } from '../../../shared/react/ReactTest';
import { getTestOptions } from '../../../shared/utils/testOptions';

const { fixtureName, rendererName, r } = getTestOptions();
document.title += ' | ' + r ?? rendererName;
ReactDOM.render(
  <FluentProvider theme={webLightTheme}>
    <ReactTest target="v9" fixtureName={fixtureName} rendererName={rendererName ?? r} />
  </FluentProvider>,
  document.getElementById('root'),
);
