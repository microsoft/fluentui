'use strict';

import { initializeIcons } from '@uifabric/icons/lib/index';

initializeIcons('dist/');

// Configure load-themed-styles to avoid registering styles.
let themeLoader = require('@microsoft/load-themed-styles');
themeLoader.configureLoadStyles((styles) => {
  // noop
});

// Set ssr mode to true, and rtl to false.
let library = require('office-ui-fabric-react/lib/Utilities');
library.setSSR(true);
library.setRTL(false);

// Assume a large screen.
let responsiveLib = require('office-ui-fabric-react/lib/utilities/decorators/withResponsiveMode');
responsiveLib.setResponsiveMode(responsiveLib.ResponsiveMode.large);

let React = require('react');
let ReactDOMServer = require('react-dom/server');
let AppDefinition = require('office-ui-fabric-react/lib/demo/AppDefinition').AppDefinition;

describe('Fabric components', () => {
  for (let i = 0; i < AppDefinition.examplePages.length; i++) {
    let links = AppDefinition.examplePages[i].links;
    for (let j = 0; j < links.length; j++) {
      let { key, component } = links[j];

      testRender(key, component);
    }
  }
});


function testRender(componentName, component) {
  it(`${componentName} can render in a server environment`, (done) => {
    let elem = React.createElement(component);

    try {
      ReactDOMServer.renderToString(elem);
      done();
    } catch (e) { done(new Error(e)) }
  });
}
