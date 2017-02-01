'use strict';

let React = require('react');
let build = require('@microsoft/web-library-build');
let buildConfig = build.getConfig();
let library = require('./' + buildConfig.libFolder);
let responsiveLib = require('./' + buildConfig.libFolder + '/utilities/decorators/withResponsiveMode');
let AppState = require('./' + buildConfig.libFolder + '/demo/components/App/AppState').AppState;
let ReactDOMServer = require('react-dom/server');

describe('Fabric components', () => {
  // set required settings
  library.setSSR(true);
  library.setRTL(false);
  responsiveLib.setResponsiveMode(responsiveLib.ResponsiveMode.large);

  for (let i = 0; i < AppState.examplePages.length; i++) {
    let links = AppState.examplePages[i].links;

    for (let j = 0; j < links.length; j++) {
      let componentName = links[j].key;

      testRender(componentName);
    }
  }
});

function testRender(componentName) {
  it(`${componentName} can render in a server environment`, () => {
    let componentPath = './' + buildConfig.libFolder + `/demo/pages/${componentName}Page/${componentName}Page`;
    let component = require(componentPath)[componentName + 'Page'];
    let elem = React.createElement(component);

    ReactDOMServer.renderToString(elem);
  });
}