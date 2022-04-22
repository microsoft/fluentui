import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { initializeIcons } from '@fluentui/font-icons-mdl2';
import { ThemingDesigner } from './components/ThemingDesigner';

initializeIcons();

let _rootDiv: HTMLElement;

function start(): void {
  if (!_rootDiv) {
    _rootDiv = document.createElement('div');
    document.body.appendChild(_rootDiv);
  }
  ReactDOM.render(<ThemingDesigner />, _rootDiv);
}

// Start the application.
start();
