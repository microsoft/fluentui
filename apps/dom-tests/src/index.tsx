require('es6-promise/auto');

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Router, Route } from 'office-ui-fabric-react/lib/utilities/router/index';
import { setBaseUrl } from 'office-ui-fabric-react/lib/Utilities';
import { Fabric } from 'office-ui-fabric-react/lib/Fabric';

setBaseUrl('./dist/');

let rootElement: HTMLElement | null;

function _onLoad(): void {
  rootElement = rootElement || document.getElementById('content');

  ReactDOM.render(
    <Fabric>
      <Router>{_getRoutes()}</Router>
    </Fabric>,
    rootElement
  );
}

function _getRoutes(): JSX.Element[] {
  return [
    {
      component: (require('./FocusZone.example1') as any).default,
      key: 'example1',
      name: 'example1',
      url: '#/example1'
    }
  ].map((page: any) => <Route key={page.key} path={page.url} component={page.component} />);
}

function _onUnload(): void {
  if (rootElement) {
    ReactDOM.unmountComponentAtNode(rootElement);
  }
}

const isReady = document.readyState === 'interactive' || document.readyState === 'complete';

if (isReady) {
  _onLoad();
} else {
  window.onload = _onLoad;
}

window.onunload = _onUnload;
