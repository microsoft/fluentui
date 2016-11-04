/* tslint:disable:no-unused-variable */
import * as React from 'react';
/* tslint:enable:no-unused-variable */
import * as ReactDOM from 'react-dom';
import { App }from './components/App/App';
import { AppState } from './components/App/AppState';
import { Router, Route } from '../utilities/router/index';
import { GettingStartedPage } from './pages/GettingStartedPage/GettingStartedPage';
import { setBaseUrl } from '../utilities/resources';
import { Fabric } from '../Fabric';
import * as Debugging from './utilities/debugging';

import './app.scss';
import './ColorStyles.scss';

setBaseUrl('./dist/');

/* tslint:disable:no-string-literal */
window['Debugging'] = Debugging;
/* tslint:enable:no-string-literal */

let rootElement;

// Return the anchor link from the URL without the hash
function _extractAnchorLink(path) {
  let index = path.lastIndexOf('#');
  if (index >= 0) {
    path = path.substr(index + 1, path.length - index);
  }
  return path;
}

function _scrollAnchorLink() {
  if ((window.location.hash.match(/#/g) || []).length > 1) {
    let anchor = _extractAnchorLink(window.location.hash);
    document.getElementById(anchor).scrollIntoView();
  }
}

function _onLoad() {
  rootElement = rootElement || document.getElementById('content');

  ReactDOM.render(
    <Fabric>
      <Router onNewRouteLoaded = { _scrollAnchorLink }>
        { _getRoutes() }
      </Router>
    </Fabric>,
    rootElement);
}

function _getRoutes() {
  let routes = AppState.testPages.map(page => <Route key={ page.key } path={ page.url } component={ page.component } />);
  let appRoutes = [];

  AppState.examplePages.forEach(group => {
    group.links
      .filter(link => link.hasOwnProperty('component'))
      .forEach((link, linkIndex) => {
        let { component } = link;
        appRoutes.push(<Route key={ link.key } path={ link.url } component={ component } />);
      });
  });

  // Default route.
  appRoutes.push(
    <Route key='gettingstarted' component={ GettingStartedPage } />
  );

  routes.push(
    <Route key='app' component={ App }>
      { appRoutes }
    </Route>
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
