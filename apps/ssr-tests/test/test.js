'use strict';

// Configure load-themed-styles to avoid registering styles.
let themeLoader = require('@microsoft/load-themed-styles');
themeLoader.configureLoadStyles(styles => {
  // noop
});

// Set rtl to false.
let library = require('@fluentui/react/lib/Utilities');
library.setRTL(false);

// Assume a large screen.
let responsiveLib = require('@fluentui/react/lib/ResponsiveMode');
responsiveLib.setResponsiveMode(responsiveLib.ResponsiveMode.large);

// Initialize icons.
const { initializeIcons } = require('@fluentui/react/lib/Icons');
initializeIcons('dist/', { disableWarnings: true });

let assert = require('assert');
let React = require('react');
let ReactDOMServer = require('react-dom/server');
let { AppDefinition } = require('@fluentui/public-docsite-resources/lib/AppDefinition');

describe('Fabric components', () => {
  for (let i = 0; i < AppDefinition.examplePages.length; i++) {
    if (AppDefinition.examplePages[i].name === 'Charting') {
      // Charting controls do not support SSR currently. Tracking issue https://github.com/microsoft/fluentui/issues/29742
      continue;
    }
    let links = AppDefinition.examplePages[i].links;
    for (let j = 0; j < links.length; j++) {
      let { key, component } = links[j];
      if (!key) {
        throw new Error(`Component key (current value "${key}") is missing for ${component}`);
      }
      if (!component) {
        throw new Error(`Component (current value "${component}") is missing for ${key}`);
      }

      testRender(key, component);
    }
  }
});

describe('Utilities', () => {
  describe('getWindow', () => {
    it('returns undefined in server environment', () => {
      assert.equal(library.getWindow(), undefined);
    });
  });

  describe('getDocument', () => {
    it('returns undefined in server environment', () => {
      assert.equal(library.getDocument(), undefined);
    });
  });
});

/**
 *
 * @param {string} componentName
 * @param {React.ComponentClass | (() => React.ReactElement)} component
 */
function testRender(componentName, component) {
  it(`${componentName} can render in a server environment`, function () {
    // Increase timeout for components that may take longer (like Calendar)
    this.timeout(10000);

    let elem;
    try {
      elem = React.createElement(component);
    } catch (/** @type {any} */ e) {
      throw new Error(`${componentName} failed to create element: ${e.message || e}`);
    }

    try {
      const result = ReactDOMServer.renderToString(elem);

      // Basic sanity check that something was rendered
      if (typeof result !== 'string') {
        throw new Error(`${componentName} rendered a non-string result: ${typeof result}`);
      }

      if (result.length === 0) {
        throw new Error(`${componentName} rendered an empty string`);
      }
    } catch (/** @type {any} */ e) {
      // Re-throw with better context
      const message = e.message || String(e);
      console.error(`${componentName} failed to render: ${message}`);
      throw new Error(e);
    }
  });
}
