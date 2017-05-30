import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { Fabric } from 'office-ui-fabric-react/lib/Fabric';
import { TextField } from 'office-ui-fabric-react/lib/components/TextField';

let _rootDiv: HTMLElement;

function start(): void {
  if (!_rootDiv) {
    _rootDiv = document.createElement('div');
    document.body.appendChild(_rootDiv);
  }

  ReactDOM.render(
    <Fabric>
      <h1>Component Demo</h1>
      <TextField label='Default TextField' />
    </Fabric>,
    _rootDiv);
}

// Start the application.
start();
