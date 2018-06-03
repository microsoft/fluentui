const express = require('express');
const React = require('react');
const ReactDOMServer = require('react-dom/server');
const { renderStatic } = require('@uifabric/merge-styles/lib-commonjs/server');
const { configureLoadStyles } = require('@microsoft/load-themed-styles');
const { initializeIcons } = require('@uifabric/icons');

initializeIcons();

// Store registered styles in a variable used later for injection.
let _allStyles = '';

// Push styles into variables for injecting later.
configureLoadStyles((styles) => {
  _allStyles += styles;
});


const app = express();

const TodoApp = require('../lib-commonjs/TodoApp').default;

app.use(express.static('./dist'));
app.get('/', (req, res) => {

  const { html, css } = renderStatic(() => {
    return ReactDOMServer.renderToString(React.createElement(TodoApp, {}));
  });

  res.send(
    `<style>${css}</style>` +
    `<div id='content'>${html}</div>` +
    `<script type='text/javascript' src='test-app.min.js'></script>`
  );
});

app.listen(3000, () => console.log('listening on 3000'));
