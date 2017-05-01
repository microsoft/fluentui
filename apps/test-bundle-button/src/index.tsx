import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Toggle } from 'office-ui-fabric-react/lib/Toggle';

function start(): void {
  const div: HTMLElement = document.createElement('div');

  document.body.appendChild(div);
  ReactDOM.render((
    <Toggle
      label='hi'
    />
  ), div);
}

// tslint:disable-next-line:no-string-literal
if (document && document['body']) {
  start();
} else {
  window.onload = start;
}
