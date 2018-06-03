import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { initializeIcons } from '@uifabric/icons';

import TodoApp from './TodoApp';

let _rootDiv: HTMLElement;

function start(): void {
  initializeIcons();

  _rootDiv = document.querySelector('#content');

  ReactDOM.render(
    <TodoApp />,

    _rootDiv);
}

// Start the application.
start();
