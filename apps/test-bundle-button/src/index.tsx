import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { CompactPeoplePicker } from 'office-ui-fabric-react';

function start(): void {
  const div: HTMLElement = document.createElement('div');

  document.body.appendChild(div);
  ReactDOM.render(<CompactPeoplePicker />, div);
}

// tslint:disable-next-line:no-string-literal
if (document && document['body']) {
  start();
} else {
  window.onload = start;
}
