import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { Fabric } from '@fluentui/react/lib/Fabric';
import { initializeIcons } from '@fluentui/react/lib/Icons';
import Todo from './components/Todo';
import DataProvider from './DataProvider';

import './version';

let _rootDiv: HTMLElement;
let _dataProvider = new DataProvider();

function start(): void {
  initializeIcons();

  if (!_rootDiv) {
    _rootDiv = document.createElement('div');
    document.body.appendChild(_rootDiv);
  }

  ReactDOM.render(
    <Fabric>
      <Todo dataProvider={_dataProvider} />
    </Fabric>,
    _rootDiv,
  );
}

// Start the application.
start();
