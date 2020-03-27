import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Fabric } from 'office-ui-fabric-react/lib/Fabric';
import { initializeIcons } from '@uifabric/icons';
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
