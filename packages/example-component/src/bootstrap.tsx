/* tslint:disable:no-unused-variable */
import * as React from 'react';
/* tslint:enable:no-unused-variable */
import * as ReactDOM from 'react-dom';
import { App, IAppDefinition } from '@uifabric/example-app-base';
import { Router, Route } from 'office-ui-fabric-react/lib/utilities/router/index';
import { setBaseUrl } from 'office-ui-fabric-react/lib/Utilities';
import { Fabric } from 'office-ui-fabric-react/lib/Fabric';

import { ExampleGroup, IExample } from './base';

export function createApp(examples: ExampleGroup | ExampleGroup[], hideChrome?: boolean) {
  let rootElement: HTMLElement | null;
  let groups: ExampleGroup[] = !Array.isArray(examples) ? [ examples ]: examples;

  function _onLoad() {
    rootElement = document.createElement('div');
    document.body.appendChild(rootElement);

    setBaseUrl('./dist/');

    let routes = groups.map((group, groupIndex) => group.examples.map(
        (example: IExample, index: number) => (
          <Route
            key={ example.key }
            path={ '#component=' + example.key }
            component={ example.onRender }
          />
        )));

    ReactDOM.render(
      <Fabric>
        <Router>
          <Route key='minimal' path='?minimal' component={ (props) => <div { ...props } /> }>
            { routes }
          </Route>
          <Route key={ 'app' } component={ (props) => <App appDefinition={ _getDefinition(groups) } { ...props } /> }>
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
