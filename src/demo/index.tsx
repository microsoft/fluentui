/* tslint:disable:no-unused-variable */
import * as React from 'react';
/* tslint:enable:no-unused-variable */
import * as ReactDOM from 'react-dom';
import App from './components/app/App';
import { Router, Route } from '../utilities/router/index';
import AppState from './components/app/AppState';
import GettingStarted from './pages/GettingStarted';
import "./index.scss";
import "./ColorStyles.scss";
import { setBaseUrl } from '../utilities/resources';

setBaseUrl('./dist/');

let rootElement;

function _onLoad() {
  rootElement = rootElement || document.getElementById('content');
  let exampleRoutes = _getAppRoutes();

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
      .filter(link => !!link.component)
      .forEach((link, linkIndex) => {
        routes.push(<Route key={ linkIndex } path={ link.url } component={ link.component } />);
      });
  });

  // Default route.
  routes.push(
    <Route key='gettingstarted' component={ GettingStarted } />
  );

  return routes;
}

function _onUnload() {
  console.log('unloading');
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

