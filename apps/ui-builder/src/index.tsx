import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { App } from './App';

let _rootDiv: HTMLElement;

function start(): void {
  if (!_rootDiv) {
    _rootDiv = document.createElement('div');
    document.body.appendChild(_rootDiv);
  }
  ReactDOM.render(<App />, _rootDiv);
}

// Start the application.
start();
