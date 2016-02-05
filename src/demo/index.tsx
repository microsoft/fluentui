/* tslint:disable:no-unused-variable */
import * as React from 'react';
/* tslint:enable:no-unused-variable */
import * as ReactDOM from 'react-dom';
import App from './components/app/App';
import { Router, Route } from '../utilities/router';

// Examples
import LabelExample from './pages/examples/LabelExample';
import TextFieldExample from './pages/examples/TextFieldExample';
import ToggleExample from './pages/examples/ToggleExample';

// Getting Started
import GettingStarted from './pages/GettingStarted';

import "./index.scss";

let rootElement;

function onLoad() {
  rootElement = rootElement || document.getElementById('content');

  ReactDOM.render(
    <Router>
      <Route component={ App }>
        <Route path='#/examples/label' component={ LabelExample } />
        <Route path='#/examples/textfield' component={ TextFieldExample } />
        <Route path='#/examples/toggle' component={ ToggleExample } />
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

