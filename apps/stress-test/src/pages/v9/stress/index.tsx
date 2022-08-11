import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { FluentProvider, webLightTheme, Button } from '@fluentui/react-components';
import { Tree } from '../../../shared/Tree';

ReactDOM.render(
  <FluentProvider theme={webLightTheme}>
    <Tree breadth={2} depth={10}>
      <Button>Click me!</Button>
    </Tree>
  </FluentProvider>,
  document.getElementById('root'),
);
