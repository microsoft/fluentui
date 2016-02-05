/* tslint:disable:no-unused-variable */
import * as React from 'react';
/* tslint:enable:no-unused-variable */
import * as ReactDOM from 'react-dom';
import App from './components/app/App';
import { Router, Route } from '../utilities/router';
import ToggleExample from './pages/examples/ToggleExample';
import LabelExample from './pages/examples/LabelExample';
import GettingStarted from './pages/GettingStarted';

import "./index.scss";

let rootElement;

function onLoad() {
  rootElement = rootElement || document.getElementById('content');

  ReactDOM.render(
    <Router>
      <Route component={ App }>
        <Route path='#/examples/toggle' component={ ToggleExample } />
        <Route path='#/examples/label' component={ LabelExample } />
        <Route component={ GettingStarted } />
      </Route>
    </Router>,
    rootElement);
}

function onUnload() {
  console.log('unloading');
  if (rootElement) {
    ReactDOM.unmountComponentAtNode(rootElement);
  }
}

let isReady = document.readyState === 'interactive' || document.readyState === 'complete';

if (isReady) {
  onLoad();
} else {
  window.onload = onLoad;
}

window.onunload = onUnload;

