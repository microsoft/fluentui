import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { App, IAppDefinition, IAppLink } from '../components/App/index';
import { Router, Route } from './router/index';
import { Fabric } from '@fluentui/react/lib/Fabric';

import { ExampleGroup, IExample } from './examplesOf';

/**
 * Creates a <div> on the page and renders a demo app for React components organized into example groups.
 * @param examples A set of pages, organized into groups, that are used to demo React components.
 * @param defaultRouteComponent A function that returns the contents that will be displayed on the home page.
 * @param appTitle A title for the application that will be displayed in the header.
 * @param headerLinks A set of links to put in the header of the application.
 */
export function createApp(
  examples: ExampleGroup | ExampleGroup[],
  defaultRouteComponent: () => JSX.Element | null = () => null,
  appTitle?: string,
  headerLinks?: IAppLink[],
): void {
  let rootElement: HTMLElement | null;
  const groups: ExampleGroup[] = !Array.isArray(examples) ? [examples] : examples;

  function _onLoad(): void {
    rootElement = document.createElement('div');
    document.body.appendChild(rootElement);

    const routes: (JSX.Element | JSX.Element[])[] = groups.map(group =>
      group.examples.map(example => {
        return <Route key={example.key} path={'#component=' + example.key} component={example.onRender} />;
      }),
    );

    // Add the default route
    routes.push(<Route key="default" component={defaultRouteComponent} />);

    const appDefinition = _getDefinition(groups);

    if (appTitle) {
      appDefinition.appTitle = appTitle;
    }

    if (headerLinks) {
      appDefinition.headerLinks = headerLinks;
    }

    const renderApp = (props: {}) => <App appDefinition={appDefinition} {...props} />;

    ReactDOM.render(
      <Fabric>
        <Router>
          <Route key="minimal" path="?minimal" component={_getComponent}>
            {routes}
          </Route>
          {/* eslint-disable-next-line react/jsx-no-bind */}
          <Route key="app" component={renderApp}>
            {routes}
          </Route>
        </Router>
      </Fabric>,
      rootElement,
    );
  }

  function _onUnload(): void {
    if (rootElement) {
      ReactDOM.unmountComponentAtNode(rootElement);
      rootElement = null;
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

function _getComponent<TProps extends React.Props<{}>>(props: TProps): JSX.Element {
  return <div {...(props as React.HTMLAttributes<HTMLDivElement>)} />;
}

function _getDefinition(groups: ExampleGroup[]): IAppDefinition {
  return {
    appTitle: 'Fabric Examples',
    testPages: [],
    examplePages: groups.map((group: ExampleGroup, groupIndex: number) => ({
      name: group.title,
      links: group.examples.map((example: IExample, exampleIndex: number) => ({
        component: example.onRender,
        key: example.key,
        name: example.title,
        url: '#component=' + example.key,
      })),
    })),
    headerLinks: [
      {
        name: 'Getting started',
        url: '#/',
      },
      {
        name: 'Fabric',
        url: 'https://developer.microsoft.com/en-us/fluentui',
      },
      {
        name: 'GitHub',
        url: 'https://github.com/microsoft/fluentui',
      },
    ],
  };
}
