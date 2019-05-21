/* tslint:disable:no-unused-variable */
import * as React from 'react';
/* tslint:enable:no-unused-variable */
import * as ReactDOM from 'react-dom';
import { IAppLink, IAppLinkGroup, IAppProps, IAppDefinition, App as AppBase } from '../index';
import { Router, Route } from 'office-ui-fabric-react/lib/utilities/router/index';
import { setBaseUrl, Fabric, initializeIcons, mergeStyles } from 'office-ui-fabric-react';
import { jumpToAnchor } from './jumpToAnchor';

setBaseUrl('./dist/');

// Initialize all icons.
initializeIcons();

mergeStyles({
  selectors: {
    ':global(html), :global(body)': {
      WebkitTapHighlightColor: 'transparent'
    }
  }
});

export function createDemoApp(appDefinition: IAppDefinition, gettingStartedPage: React.StatelessComponent) {
  let rootElement: HTMLElement | null;

  function _scrollAnchorLink(): void {
    jumpToAnchor();
  }

  function _onLoad(): void {
    rootElement = rootElement || document.getElementById('content');

    ReactDOM.render(
      <Fabric>
        <Router onNewRouteLoaded={_scrollAnchorLink}>{_getRoutes()}</Router>
      </Fabric>,
      rootElement
    );
  }

  function _getRoutes(): JSX.Element[] {
    const routes = appDefinition.testPages.map((page: IAppLink) => <Route key={page.key} path={page.url} component={page.component} />);
    const appRoutes: JSX.Element[] = [];

    appDefinition.examplePages.forEach((group: IAppLinkGroup) => {
      group.links
        .filter((link: IAppLink) => link.hasOwnProperty('component') || link.hasOwnProperty('getComponent'))
        .forEach((link: IAppLink) => {
          const { component, getComponent } = link;

          appRoutes.push(<Route key={link.key} path={link.url} component={component} getComponent={getComponent} />);
        });
    });

    // Default route.
    appRoutes.push(<Route key="gettingstarted" component={gettingStartedPage} />);

    const App: React.StatelessComponent<IAppProps> = props => <AppBase appDefinition={appDefinition} {...props} />;

    routes.push(
      <Route key="app" component={App}>
        {appRoutes}
      </Route>
    );

    return routes;
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
}
