import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { Button, FluentProvider, webLightTheme } from '@fluentui/react-components';
import { ReactSelectorTreeComponentRenderer } from '../../../shared/react/ReactSelectorTree';
import { TestTree } from '../../../shared/react/TestTree';

const componentRenderer: ReactSelectorTreeComponentRenderer = (node, depth, index) => {
  return (
    <Button>
      {node.value.name}, {index}
    </Button>
  );
};

ReactDOM.render(
  <FluentProvider theme={webLightTheme}>
    <TestTree componentRenderer={componentRenderer} />
  </FluentProvider>,
  document.getElementById('root'),
);
