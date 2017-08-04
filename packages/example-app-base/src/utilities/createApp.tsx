/* tslint:disable:no-unused-variable */
import * as React from 'react';
/* tslint:enable:no-unused-variable */
import * as ReactDOM from 'react-dom';
import { App, IAppDefinition, IAppLink } from '../components/App/App';
import { Router, Route } from 'office-ui-fabric-react/lib/utilities/router/index';
import { setBaseUrl } from 'office-ui-fabric-react/lib/Utilities';
import { Fabric } from 'office-ui-fabric-react/lib/Fabric';

import { ExampleGroup, IExample } from './examplesOf';

/**
 * Creates a <div> on the page and renders a demo app for React components organized into example groups.
 * @param examples A set of pages, organized into groups, that are used to demo React components.
 * @param defaultRouteComponent A function that returns the contents that will be displayed on the home page.
 * @param appTitle A title for the application that will be displayed in the header.
 * @param headerLinks A set of links to put in the header of the application.
 */
export function createApp(examples: ExampleGroup | ExampleGroup[], defaultRouteComponent: () => (JSX.Element | null) = () => null, appTitle?: string, headerLinks?: IAppLink[]) {
  let rootElement: HTMLElement | null;
  let groups: ExampleGroup[] = !Array.isArray(examples) ? [examples] : examples;

  function _onLoad() {
    rootElement = document.createElement('div');
    document.body.appendChild(rootElement);

    setBaseUrl('./dist/');

    let routes: (JSX.Element | JSX.Element[])[] = groups.map((group, groupIndex) => group.examples.map(
      (example: IExample, index: number) => (
        <Route
          key={ example.key }
          path={ '#component=' + example.key }
          component={ example.onRender }
        />
      )));

    // Add the default route
    routes.push(
      <Route key='default' component={ defaultRouteComponent } />
    );

    let appDefinition = _getDefinition(groups);

    if (appTitle) {
      appDefinition.appTitle = appTitle;
    }

    if (headerLinks) {
      appDefinition.headerLinks = headerLinks;
    }

    ReactDOM.render(
      <Fabric>
        <Router>
          <Route key='minimal' path='?minimal' component={ (props: any) => <div { ...props } /> }>
            { routes }
          </Route>
          <Route key={ 'app' } component={ (props: any) => <App appDefinition={ appDefinition } { ...props } /> }>
            { routes }
          </Route>
        </Router>
      </Fabric>
      ,
      rootElement);
  }

  function _onUnload() {
    if (rootElement) {
      ReactDOM.unmountComponentAtNode(rootElement);
      rootElement = null;
    }
  }

  let isReady = document.readyState === 'interactive' || document.readyState === 'complete';

  if (isReady) {
    _onLoad();
  } else {
    window.onload = _onLoad;
  }

  window.onunload = _onUnload;
}

function _getDefinition(groups: ExampleGroup[]): IAppDefinition {
  return {
    appTitle: 'Fabric Examples',
    testPages: [],
    examplePages: groups.map((group, groupIndex) => (
      {
        name: group.title,
        links: group.examples.map((example, exampleIndex) => (
          {
            component: example.onRender,
            key: example.key,
            name: example.title,
            url: '#component=' + example.key
          }
        ))
      }
    )),
    headerLinks: [
      {
        name: 'Getting started',
        url: '#/'
      },
      {
        name: 'Fabric',
        url: 'http://dev.office.com/fabric'
      },
      {
        name: 'Github',
        url: 'http://www.github.com/officedev'
      }
    ]
  };
}
