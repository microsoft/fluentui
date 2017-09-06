/* tslint:disable:no-unused-variable */
import * as React from 'react';
/* tslint:enable:no-unused-variable */
import * as ReactDOM from 'react-dom';
import { VisualTestState } from './VisualTestState';
import { Route, Router } from './utilities/router/index';
import { setBaseUrl } from './Utilities';

setBaseUrl('./dist/');

let rootElement: HTMLElement;
let currentBreakpoint;
let scrollDistance: number;
let requireContext = require.context('./components', true, /Page.visualtest$/);

// This is mostly taken from the react-website project.

function _routerDidMount() {
  if (_hasAnchorLink(window.location.hash)) {
    let hash = _extractAnchorLink(window.location.hash);
    let el = document.getElementById(hash);
    let elRect = el!.getBoundingClientRect();
    let bodySTop = document.body.scrollTop;
    let currentScrollPosition;
    currentScrollPosition = bodySTop + elRect.top;
    document.body.scrollTop = currentScrollPosition - scrollDistance;
  }
}

function _hasAnchorLink(path: string) {
  return (path.match(/#/g) || []).length > 1;
}

function _extractAnchorLink(path: string) {
  let split = path.split('#');
  let cleanedSplit = split.filter((value) => {
    if (value === '') {
      return false;
    } else {
      return true;
    }
  });
  return cleanedSplit[cleanedSplit.length - 1];
}

function _onLoad() {

  // Load the app into this element.
  rootElement = rootElement || document.getElementById('content');

  ReactDOM.render(
    <div style={ { display: 'inline-block' } }>
      <Router onNewRouteLoaded={ _routerDidMount }>
        { _getAppRoutes() }
      </Router>
    </div>,
    rootElement);
}

function _getAppRoutes(): JSX.Element[] {
  let routes: JSX.Element[] = [];

  // Create a route for each top level page, and all of its sub pages
  VisualTestState.componentPath.forEach((path, pathIndex) => {
    let componentNameIndex = path.lastIndexOf('/');
    let name = path.substr(componentNameIndex + 1);
    let url = name.substr(0, name.lastIndexOf('Page.visualtest'));
    routes.push(
      <Route
        key={ pathIndex }
        path={ '#/' + url }
        getComponent={ getPath(path) }
      />);
  });
  return routes;
}

function getPath(path: string) {
  return ((cb: any) => require.ensure([], () => cb((requireContext(path) as any).default)));
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