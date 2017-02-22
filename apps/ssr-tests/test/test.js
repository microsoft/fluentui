'use strict';

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
let AppDefinition = require('fabric-examples/lib/AppDefinition').AppDefinition;

describe('Fabric components', () => {
  for (let i = 0; i < AppDefinition.examplePages.length; i++) {
    let links = AppDefinition.examplePages[i].links;

    for (let j = 0; j < links.length; j++) {
      let componentName = links[j].key;

      testRender(componentName);
    }
  }
});

function testRender(componentName) {
  it(`${componentName} can render in a server environment`, (done) => {
    let componentPath = `fabric-examples/lib/pages/${componentName}Page/${componentName}Page`;
    let component = require(componentPath)[componentName + 'Page'];
    let elem = React.createElement(component);

    try {
      ReactDOMServer.renderToString(elem);
      done();
    } catch (e) { done(new Error(e)) }
  });
}
