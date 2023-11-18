import 'react-hot-loader';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './app';

const mountNode = document.createElement('div');
document.body.appendChild(mountNode);

ReactDOM.render(<App />, mountNode);
