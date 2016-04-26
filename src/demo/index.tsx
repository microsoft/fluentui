/* tslint:disable:no-unused-variable */
import * as React from 'react';
/* tslint:enable:no-unused-variable */
import * as ReactDOM from 'react-dom';
import App from './components/App/App';
import AppState from './components/App/AppState';
import { Router, Route } from '../utilities/router/index';
import GettingStarted from './pages/GettingStarted';
import { setBaseUrl } from '../utilities/resources';
import './index.scss';
import './ColorStyles.scss';

setBaseUrl('./dist/');

let rootElement;

function _onLoad() {
  rootElement = rootElement || document.getElementById('content');

  ReactDOM.render(
    <Router>
      <Route component={ App }>
        { _getAppRoutes() }
      </Route>
    </Router>,
    rootElement);
}

function _getAppRoutes() {
  let routes = [];

  AppState.examplePages.forEach(group => {
    group.links
      .filter(link => link.hasOwnProperty('component'))
      .forEach((link, linkIndex) => {
        let { component } = link;
        routes.push(<Route key={ linkIndex } path={ link.url } component={ component } />);
      });
  });

  // Default route.
  routes.push(
    <Route key='gettingstarted' component={ GettingStarted } />
  );

  return routes;
}

function _onUnload() {
  if (rootElement) {
    ReactDOM.unmountComponentAtNode(rootElement);
  }
}

let isReady = document.readyState === 'interactive' || document.readyState === 'complete';

if (isReady) {
  _onLoad();
} else {
  window.onload = _onLoad;
}

window.onunload = _onUnload;

