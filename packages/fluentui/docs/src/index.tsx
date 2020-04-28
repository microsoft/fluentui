import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { hot } from 'react-hot-loader/root';
import App from './app';

const mountNode = document.createElement('div');
document.body.appendChild(mountNode);

const AppHot = hot(App);

ReactDOM.render(
  <AppContainer>
    <AppHot />
  </AppContainer>,
  mountNode,
);
