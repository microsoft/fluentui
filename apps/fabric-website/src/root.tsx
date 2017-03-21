/* tslint:disable:no-unused-variable */
import * as React from 'react';
/* tslint:enable:no-unused-variable */
import * as ReactDOM from 'react-dom';
import { App } from './components/App/App';
import { AppState } from './components/App/AppState';
import { Route, Router } from 'office-ui-fabric-react/lib/utilities/router/index';
import { setBaseUrl } from '@uifabric/utilities/lib/resources';
import { HomePage } from './pages/HomePage/HomePage';
import WindowWidthUtility from './utilities/WindowWidthUtility';
import './styles/styles.scss';

let isProduction = process.argv.indexOf('--production') > -1;

if (!isProduction) {
  setBaseUrl('./dist/');
} else {
  setBaseUrl('https://static2.sharepointonline.com/files/fabric/fabric-website/dist/');
}

let rootElement;
let currentBreakpoint;
let scrollDistance;

function _routerDidMount() {
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

function _getBreakpoint() {
  currentBreakpoint = WindowWidthUtility.currentFabricBreakpoint();
  scrollDistance = _setScrollDistance();
}

function _setScrollDistance() {
  switch (currentBreakpoint) {
    case ('LG'):
      return 240;
    default:
      return 200;
  }
}

function _hasAnchorLink(path) {
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

function _onLoad() {

  // Load the app into this element.
  rootElement = rootElement || document.getElementById('main');
  _getBreakpoint();

  ReactDOM.render(
    <Router onNewRouteLoaded={ _routerDidMount }>
      <Route component={ App }>
        { _getAppRoutes() }
      </Route>
    </Router>,
    rootElement);
}

function _getAppRoutes() {
  let routes = [];

  // Create a route for each top level page, and all of its sub pages
  AppState.pages.forEach((page, pageIndex) => {
    routes.push(<Route key={ pageIndex } path={ page.url } getComponent={ page.getComponent } />);

    if (page.pages) {
      page.pages.forEach((childPage, childPageIndex) => {
        routes.push(<Route key={ childPageIndex } path={ childPage.url } getComponent={ childPage.getComponent } />);

        // Third level of nav
        // @todo: This is the same logic as above, and could be placed in function
        //        to allow for unlimited levels of nav.
        if (childPage.pages) {
          childPage.pages.forEach((grandchildPage, grandchildPageIndex) => {
            routes.push(<Route key={ grandchildPageIndex } path={ grandchildPage.url } getComponent={ grandchildPage.getComponent } />);
          });
        }
      });
    }
  });

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