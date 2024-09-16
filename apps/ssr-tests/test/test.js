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
let AppDefinition = require('@fluentui/public-docsite-resources/lib/AppDefinition').AppDefinition;

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
 * @param {React.ComponentClass | (() => JSX.Element)} component
 */
function testRender(componentName, component) {
  it(`${componentName} can render in a server environment`, done => {
    let elem = React.createElement(component);

    try {
      ReactDOMServer.renderToString(elem);
      done();
    } catch (/** @type {any} */ e) {
      done(new Error(e));
    }
  });
}
