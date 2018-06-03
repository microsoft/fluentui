import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { initializeIcons } from '@uifabric/icons';

import TodoApp from './TodoApp';

let _rootDiv: HTMLElement;

function start(): void {
  initializeIcons();

  if (!_rootDiv) {
    _rootDiv = document.createElement('div');
    document.body.appendChild(_rootDiv);
  }

  ReactDOM.render(
    <TodoApp />,

    _rootDiv);
}

// Start the application.
start();
