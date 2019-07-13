require('es6-promise/auto');

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Router, Route, IRouteProps } from '@uifabric/example-app-base';
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
  return require('./pages/pageList')
    .map(
      (page: string): IRouteProps => {
        return {
          component: require(`./pages/${page}`).default,
          key: page,
          path: `#/${page}`
        };
      }
    )
    .map((page: IRouteProps) => <Route key={page.key} {...page} />);
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
