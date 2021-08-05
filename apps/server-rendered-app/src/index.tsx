import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { initializeIcons } from '@fluentui/font-icons-mdl2';

import TodoApp from './TodoApp';

let _rootDiv: HTMLElement;

function start(): void {
  initializeIcons();

  _rootDiv = document.querySelector('#content');

  ReactDOM.hydrate(<TodoApp />, _rootDiv);
}

// Start the application.
start();
