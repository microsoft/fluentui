/* tslint:disable:no-unused-variable */
import * as React from 'react';
/* tslint:enable:no-unused-variable */
import * as ReactDOM from 'react-dom';
import { App } from './components/App/App';
import { AppState } from './components/App/AppState';
import { Fabric } from 'office-ui-fabric-react/lib/Fabric';
import { Route, Router } from 'office-ui-fabric-react/lib/utilities/router/index';
import { setBaseUrl } from '@uifabric/utilities/lib/resources';
import { HomePage } from './pages/HomePage/HomePage';
import WindowWidthUtility from './utilities/WindowWidthUtility';
import './styles/styles.scss';
import { initializeIcons } from '@uifabric/icons';

initializeIcons();

let isProduction = process.argv.indexOf('--production') > -1;

if (!isProduction) {
  setBaseUrl('./dist/');
} else {
  setBaseUrl('https://static2.sharepointonline.com/files/fabric/fabric-website/dist/');
}

let rootElement;
let currentBreakpoint;
let scrollDistance;

function _routerDidMount(): void {
  if (_hasAnchorLink(window.location.hash)) {
    let hash = _extractAnchorLink(window.location.hash);
    let el = document.getElementById(hash);
    let elRect = el.getBoundingClientRect();
    let bodySTop = document.body.scrollTop;
    let currentScrollPosition;
    currentScrollPosition = bodySTop + elRect.top;
    document.body.scrollTop = currentScrollPosition - scrollDistance;
  }
}

function _getBreakpoint(): void {
  currentBreakpoint = WindowWidthUtility.currentFabricBreakpoint();
  scrollDistance = _setScrollDistance();
}

function _setScrollDistance(): number {
  switch (currentBreakpoint) {
    case ('LG'):
      return 240;
    default:
      return 200;
  }
}

function _hasAnchorLink(path: string): boolean {
  return (path.match(/#/g) || []).length > 1;
}

function _extractAnchorLink(path) {
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

function _onLoad(): void {

  // Load the app into this element.
  rootElement = rootElement || document.getElementById('main');
  _getBreakpoint();

  ReactDOM.render(
    <Fabric>
      <Router onNewRouteLoaded={ _routerDidMount }>
        <Route component={ App }>
          { _getAppRoutes() }
        </Route>
      </Router>
    </Fabric>,
    rootElement);
}

function _createRoutes(pages: {}[]): {}[] {
  let routes = [];
  let pageRoutes = [];

  // tslint:disable-next-line:no-any
  pages.forEach((page: any, pageIndex: number) => {
    routes.push(
      <Route
        key={ pageIndex }
        path={ page.url }
        component={ page.component }
        getComponent={ page.getComponent }
      />
    );
    if (page.pages) {
      routes = routes.concat(_createRoutes(page.pages));
    }
  });
  return routes;
}

function _getAppRoutes() {
  let routes = [];
  routes = _createRoutes(AppState.pages);

  // Add the default route
  routes.push(
    <Route key='home' component={ HomePage } />
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

function addCSSToHeader(fileName: string) {
  let headEl = document.head;
  let linkEl = document.createElement('link');

  linkEl.type = 'text/css';
  linkEl.rel = 'stylesheet';
  linkEl.href = fileName;
  headEl.appendChild(linkEl);
}

addCSSToHeader('https://static2.sharepointonline.com/files/fabric/office-ui-fabric-core/7.1.0/css/fabric.min.css');
