import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { initializeIcons, DefaultButton, ThemeProvider } from '@fluentui/react';
import { ReactSelectorTreeComponentRenderer } from '../../../shared/react/ReactSelectorTree';
import { TestTree } from '../../../shared/react/TestTree';

initializeIcons();

const componentRenderer: ReactSelectorTreeComponentRenderer = (node, depth, index) => {
  return <DefaultButton text={`${node.value.name}, ${index}`} />;
};

ReactDOM.render(
  <ThemeProvider>
    <TestTree componentRenderer={componentRenderer} />
  </ThemeProvider>,
  document.getElementById('root'),
);
