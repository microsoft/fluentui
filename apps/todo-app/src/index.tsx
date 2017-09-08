import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { Fabric } from 'office-ui-fabric-react/lib/Fabric';
import Todo from './components/Todo';
import DataProvider from './DataProvider';
import { ITodoProps } from './types/index';

let _rootDiv: HTMLElement;
let _dataProvider = new DataProvider();

function start(): void {
  if (!_rootDiv) {
    _rootDiv = document.createElement('div');
    document.body.appendChild(_rootDiv);
  }

  ReactDOM.render(
    <Fabric>
      <Todo
        dataProvider={ _dataProvider }
        />
    </Fabric>,
    _rootDiv);
}

// Start the application.
start();
