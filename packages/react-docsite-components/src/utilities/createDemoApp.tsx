import * as React from 'react';
import * as ReactDOMClient from 'react-dom/client';
import { IAppLink, IAppLinkGroup, IAppProps, IAppDefinition, App as AppBase } from '../index';
import { Router, Route } from './router/index';
import { Fabric, initializeIcons, mergeStyles } from '@fluentui/react';
import { jumpToAnchor } from './jumpToAnchor';

// Initialize all icons.
initializeIcons();

mergeStyles({
  selectors: {
    ':global(html), :global(body)': {
      WebkitTapHighlightColor: 'transparent',
    },
  },
});

export function createDemoApp(appDefinition: IAppDefinition, gettingStartedPage: React.FunctionComponent): void {
  let rootElement: HTMLElement | null;
  let root: ReactDOMClient.Root | null = null;

  function _scrollAnchorLink(): void {
    jumpToAnchor();
  }

  function _onLoad(): void {
    rootElement = rootElement || document.getElementById('content');

    root = ReactDOMClient.createRoot(rootElement!);

    root.render(
      <Fabric>
        {/* eslint-disable-next-line react/jsx-no-bind */}
        <Router onNewRouteLoaded={_scrollAnchorLink}>{_getRoutes()}</Router>
      </Fabric>,
    );
  }

  function _getRoutes(): React.ReactElement[] {
    const routes = appDefinition.testPages.map((page: IAppLink) => (
      <Route key={page.key} path={page.url} component={page.component} />
    ));
    const appRoutes: React.ReactElement[] = [];

    appDefinition.examplePages.forEach((group: IAppLinkGroup) => {
      appRoutes.push(..._getRoutesFromLinks(group.links));
    });

    // Default route.
    appRoutes.push(<Route key="gettingstarted" component={gettingStartedPage} />);

    const App: React.FunctionComponent<IAppProps> = props => (
      <AppBase {...props} appDefinition={props.appDefinition || appDefinition} />
    );

    routes.push(
      // eslint-disable-next-line react/jsx-no-bind
      <Route key="app" component={App}>
        {appRoutes}
      </Route>,
    );

    return routes;
  }

  function _getRoutesFromLinks(links: IAppLink[]): React.ReactElement[] {
    const routes: React.ReactElement[] = [];
    for (const link of links) {
      if (link.component || link.getComponent) {
        routes.push(
          <Route key={link.key} path={link.url} component={link.component} getComponent={link.getComponent} />,
        );
        if (link.links) {
          routes.push(..._getRoutesFromLinks(link.links));
        }
      }
    }
    return routes;
  }

  function _onUnload(): void {
    if (root) {
      root.unmount();
      root = null;
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
