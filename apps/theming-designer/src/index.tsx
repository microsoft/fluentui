import * as React from 'react';
import * as ReactDOM from 'react-dom';

// import { Fabric } from 'office-ui-fabric-react/lib/Fabric';
// import ThemingDesigner from './components/ThemingDesigner';
let _rootDiv: HTMLElement;

function start(): void {
  if (!_rootDiv) {
    _rootDiv = document.createElement('div');
    document.body.appendChild(_rootDiv);
  }
  ReactDOM.render(<h1>Hello, world!</h1>, document.getElementById('root'));
}

// Start the application.
start();
