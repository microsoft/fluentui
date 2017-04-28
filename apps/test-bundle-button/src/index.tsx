import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { PrimaryButton } from 'office-ui-fabric-react/lib/Button';

function start() {
  const div: HTMLElement = document.createElement('div');

  document.body.appendChild(div);
  ReactDOM.render((
    <PrimaryButton
      text='hi'
      iconProps={ { iconName: 'Snow=' } }
    />
  ), div);
}

if (document && document['body']) {
  start();
} else {
  window.onload = start;
}
