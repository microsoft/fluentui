import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { initializeIcons, ThemeProvider } from '@fluentui/react';
import { getTestOptions } from '../../../shared/utils/testOptions';
import { ReactTest } from '../../../shared/react/ReactTest';

initializeIcons();

const { fixtureName, rendererName } = getTestOptions();

ReactDOM.render(
  <ThemeProvider>
    <ReactTest target="v8" fixtureName={fixtureName} rendererName={rendererName} />
  </ThemeProvider>,
  document.getElementById('root'),
);
