// Used to dynamically change the base url for resolve and fetch chunks from a remote source (e.g. CDN)
// Used by the bootstrapper to load different doc site bundles for different versions
// If this value is undefined => probably only one version of the docsite is running
// Make sure this is set before any imports
// @ts-ignore
__webpack_public_path__ = window.__RESOURCE_BASE_URL__;

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import App from './app';

const mountNode = document.createElement('div');
document.body.appendChild(mountNode);
console.log('PATH', __webpack_public_path__);

ReactDOM.render(
  <AppContainer>
    <App />
  </AppContainer>,
  mountNode,
);
