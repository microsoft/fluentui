const express = require('express');
const compression = require('compression');
const React = require('react');
const ReactDOMServer = require('react-dom/server');
const { renderStatic } = require('@uifabric/merge-styles/lib-commonjs/server');
const { configureLoadStyles } = require('@microsoft/load-themed-styles');
const { initializeIcons } = require('@uifabric/icons');

const ReactMinScripts =
  `<script type="text/javascript" src="//cdnjs.cloudflare.com/ajax/libs/react/16.8.6/umd/react.production.min.js"></script>` +
  `<script type="text/javascript" src="//cdnjs.cloudflare.com/ajax/libs/react-dom/16.8.6/umd/react-dom.production.min.js"></script>`;

const ReactScripts =
  `<script type="text/javascript" src="//cdnjs.cloudflare.com/ajax/libs/react/16.8.6/umd/react.development.js"></script>` +
  `<script type="text/javascript" src="//cdnjs.cloudflare.com/ajax/libs/react-dom/16.8.6/umd/react-dom.development.js"></script>`;

const AppScript = `<script type="text/javascript" src="test-app.min.js"></script>`;

initializeIcons();

// Store registered styles in a variable used later for injection.
let _allStyles = '';

// Push styles into variables for injecting later.
configureLoadStyles(styles => {
  _allStyles += styles;
});

const app = express();
const TodoApp = require('../lib-commonjs/TodoApp').default;

app.use(compression());
app.use(express.static('./dist'));

app.get('/', (req, res) => {
  res.send(
    //     renderClientOnly()
    renderIsomorphic()
  );
});

function renderIsomorphic() {
  const { html, css } = renderStatic(() => {
    return ReactDOMServer.renderToString(React.createElement(TodoApp, {}));
  }, 'server');

  return (
    `<!doctype html>` +
    `<head>` +
    `<title>Server side rendering test</title>` +
    `<style>${css}</style>` +
    `</head>` +
    `<body>` +
    `<div id='content'>${html}</div>` +
    ReactMinScripts +
    AppScript +
    `</body>` +
    `</head>`
  );
}

function renderClientOnly() {
  return (
    `<!doctype html>` +
    `<head>` +
    `<title>Server side rendering test</title>` +
    ReactMinScripts +
    `</head>` +
    `<body>` +
    `<div id='content'></div>` +
    `<script type='text/javascript' src='test-app.min.js'></script>` +
    `</body>`
  );
}

function hydrateButton() {
  return (
    `<button id='rehydrate'>Rehydrate!</button>` +
    `<script type='text/javascript'>` +
    `var rehydrate = document.querySelector('#rehydrate');` +
    `rehydrate.addEventListener('click', function() {` +
    `var script = document.createElement('script');` +
    `script.setAttribute('type', 'text/javascript');` +
    `script.setAttribute('src', 'test-app.min.js');` +
    `document.head.appendChild(script);` +
    `});` +
    `</script>`
  );
}

app.listen(3003, () => console.log('listening on 3003'));
