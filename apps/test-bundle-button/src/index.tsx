import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { DefaultButton } from 'office-ui-fabric-react/lib/Button';

function start(): void {
  const div: HTMLElement = document.createElement('div');

  document.body.appendChild(div);
  ReactDOM.render((
    <DefaultButton
      text='hi'
    />
  ), div);
}

// tslint:disable-next-line:no-string-literal
if (document && document['body']) {
  start();
} else {
  window.onload = start;
}
