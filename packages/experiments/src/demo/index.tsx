/* tslint:disable:no-unused-variable */
import * as React from 'react';
/* tslint:enable:no-unused-variable */
import * as ReactDOM from 'react-dom';
import { App, AppDefinition } from './AppDefinition';
import { IAppLink, IAppLinkGroup } from '@uifabric/example-app-base';
import { Router, Route } from 'office-ui-fabric-react/lib/utilities/router/index';
import { GettingStartedPage } from './GettingStartedPage';
import { setBaseUrl } from 'office-ui-fabric-react/lib/Utilities';
import { Fabric } from 'office-ui-fabric-react/lib/Fabric';

import './index.scss';
import './ColorStyles.scss';

setBaseUrl('./dist/');

let rootElement: HTMLElement | null;

// Return the anchor link from the URL without the hash
function _extractAnchorLink(path: string): string {
  let index = path.lastIndexOf('#');
  if (index >= 0) {
    path = path.substr(index + 1, path.length - index);
  }
  return path;
}

function _scrollAnchorLink(): void {
  if ((window.location.hash.match(/#/g) || []).length > 1) {
    let anchor = _extractAnchorLink(window.location.hash);
    document.getElementById(anchor)!.scrollIntoView();
  }
}

function _onLoad(): void {
  rootElement = rootElement || document.getElementById('content');

  ReactDOM.render(
    <Fabric>
      <Router onNewRouteLoaded={ _scrollAnchorLink }>
        { _getRoutes() }
      </Router>
    </Fabric>,
    rootElement);
}

function _getRoutes(): JSX.Element[] {
  let routes = AppDefinition.testPages.map((page: IAppLink) => <Route key={ page.key } path={ page.url } component={ page.component } />);
  let appRoutes: JSX.Element[] = [];

  AppDefinition.examplePages.forEach((group: IAppLinkGroup) => {
    group.links
      .filter((link: IAppLink) => link.hasOwnProperty('component') || link.hasOwnProperty('getComponent'))
      .forEach((link: IAppLink, linkIndex: number) => {
        const { component, getComponent } = link;

        appRoutes.push(
          <Route
            key={ link.key }
            path={ link.url }
            component={ component }
            getComponent={ getComponent }
          />);
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

function _onUnload(): void {
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
