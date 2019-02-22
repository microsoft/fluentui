import './styles/styles.scss';
import './version';
import 'whatwg-fetch';

import { Fabric } from 'office-ui-fabric-react/lib/Fabric';
import { initializeIcons } from 'office-ui-fabric-react/lib/Icons';
import { setBaseUrl } from 'office-ui-fabric-react/lib/Utilities';
import { Route, Router } from 'office-ui-fabric-react/lib/utilities/router/index';
import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { App } from './components/App/App';
import { AppState } from './components/App/AppState';
import FluentMessageBar from './components/FluentMessageBar/FluentMessageBar';
import { HomePage } from './pages/HomePage/HomePage';
import WindowWidthUtility from './utilities/WindowWidthUtility';
import { isLocal, hasUHF } from './utilities/location';

import { handleRedirects } from './redirects';

// Handle redirects of deprecated URLs to new
handleRedirects();

require('es6-promise').polyfill();
/* tslint:disable:no-unused-variable */
/* tslint:enable:no-unused-variable */
const corePackageData = require('../node_modules/office-ui-fabric-core/package.json');
const corePackageVersion: string = (corePackageData && corePackageData.version) || '9.2.0';

initializeIcons();

let isProduction = process.argv.indexOf('--production') > -1;

declare let Flight; // Contains flight & CDN configuration loaded by manifest
declare let __webpack_public_path__;

// Final bundle location can be dynamic, so we need to update the public path at runtime to point to the right CDN URL
if (!isLocal && Flight.baseCDNUrl) {
  __webpack_public_path__ = Flight.baseCDNUrl;
}

if (!isProduction) {
  setBaseUrl('./dist/');
} else {
  setBaseUrl(__webpack_public_path__);
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
    case 'LG':
      return 240;
    default:
      return 200;
  }
}

function _hasAnchorLink(path: string): boolean {
  return (path.match(/#/g) || []).length > 1;
}

function _extractAnchorLink(path): string {
  let split = path.split('#');
  let cleanedSplit = split.filter(value => {
    if (value === '') {
      return false;
    } else {
      return true;
    }
  });
  return cleanedSplit[cleanedSplit.length - 1];
}

function _onLoad(): void {
  // Don't load the TopNav if viewed on the Office Dev Portal, which uses the UHF.
  if (!hasUHF) {
    require.ensure([], require => {
      let _topNav = require<any>('./components/TopNav/TopNav').TopNav;
      _renderApp(_topNav);
    });
  } else {
    _renderApp();
  }
}

function _renderApp(TopNav?) {
  // Load the app into this element.
  rootElement = rootElement || document.getElementById('main');
  _getBreakpoint();

  ReactDOM.render(
    <Fabric>
      {TopNav && <TopNav pages={AppState.pages} />}
      <FluentMessageBar />
      <Router onNewRouteLoaded={_routerDidMount}>
        <Route component={App}>{_getAppRoutes()}</Route>
      </Router>
    </Fabric>,
    rootElement
  );
}

function _createRoutes(pages: {}[]): {}[] {
  let routes = [];

  // tslint:disable-next-line:no-any
  pages.forEach((page: any, pageIndex: number) => {
    routes.push(<Route key={pageIndex} path={page.url} component={page.component} getComponent={page.getComponent} />);
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
  routes.push(<Route key="home" component={HomePage} />);

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

function addCSSToHeader(fileName: string): void {
  let headEl = document.head;
  let linkEl = document.createElement('link');

  linkEl.type = 'text/css';
  linkEl.rel = 'stylesheet';
  linkEl.href = fileName;
  headEl.appendChild(linkEl);
}

addCSSToHeader('https://static2.sharepointonline.com/files/fabric/office-ui-fabric-core/' + corePackageVersion + '/css/fabric.min.css');
