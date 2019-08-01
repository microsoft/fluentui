import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { IAppLink, IAppLinkGroup, IAppProps, IAppDefinition, App as AppBase } from '../index';
import { Router, Route } from './router/index';
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

interface IDemoAppProps {
  getRoutes: (isNextVersion: boolean, toggleNextVersion: (value: boolean) => void) => JSX.Element[];
  scrollAnchorLink: () => void;
}

const DemoApp = (props: IDemoAppProps): JSX.Element => {
  const [isNextVersion, setNextVersion] = React.useState(false);

  const _toggleNextVersion = (value: boolean): void => {
    setNextVersion(value);
  };

  const { getRoutes, scrollAnchorLink } = props;

  return (
    <Fabric>
      <Router onNewRouteLoaded={scrollAnchorLink}>{getRoutes(isNextVersion, _toggleNextVersion)}</Router>
    </Fabric>
  );
};

export function createDemoApp(
  appDefinition: IAppDefinition,
  gettingStartedPage: React.StatelessComponent,
  appDefinitionNext?: IAppDefinition
) {
  let rootElement: HTMLElement | null;

  function _scrollAnchorLink(): void {
    jumpToAnchor();
  }

  function _onLoad(): void {
    rootElement = rootElement || document.getElementById('content');

    ReactDOM.render(<DemoApp getRoutes={_getRoutes} scrollAnchorLink={_scrollAnchorLink} />, rootElement);
  }

  function _getRoutes(isNextVersion: boolean, toggleNextVersion: (value: boolean) => void): JSX.Element[] {
    const routes = (appDefinitionNext && isNextVersion ? appDefinitionNext : appDefinition).testPages.map((page: IAppLink) => (
      <Route key={page.key} path={page.url} component={page.component} />
    ));

    const appRoutes: JSX.Element[] = [];
    if (appDefinitionNext && isNextVersion) {
      appDefinitionNext.examplePages.forEach((group: IAppLinkGroup) => {
        appRoutes.push(..._getRoutesFromLinks(group.links));
      });
    } else {
      appDefinition.examplePages.forEach((group: IAppLinkGroup) => {
        appRoutes.push(..._getRoutesFromLinks(group.links));
      });
    }

    // Default route.
    appRoutes.push(<Route key="gettingstarted" component={gettingStartedPage} />);

    const App: React.StatelessComponent<IAppProps> = props => (
      <AppBase
        appDefinition={appDefinitionNext && isNextVersion ? appDefinitionNext : appDefinition}
        isNextVersion={isNextVersion}
        toggleNextVersion={toggleNextVersion}
        {...props}
      />
    );

    routes.push(
      <Route key="app" component={App}>
        {appRoutes}
      </Route>
    );

    return routes;
  }

  function _getRoutesFromLinks(links: IAppLink[]): JSX.Element[] {
    const routes: JSX.Element[] = [];
    for (const link of links) {
      if (link.component || link.getComponent) {
        routes.push(<Route key={link.key} path={link.url} component={link.component} getComponent={link.getComponent} />);
        if (link.links) {
          routes.push(..._getRoutesFromLinks(link.links));
        }
      }
    }
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
