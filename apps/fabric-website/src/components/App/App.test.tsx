/* tslint:disable:no-unused-variable */
import * as React from 'react';
/* tslint:enable:no-unused-variable */

import * as ReactDOM from 'react-dom';
import * as ReactTestUtils from 'react-addons-test-utils';
import { Route, Router } from 'office-ui-fabric-react/lib/utilities/router/index';
import { Fabric } from 'office-ui-fabric-react/lib/Fabric';

let { expect } = chai;

import { App } from './App';

describe('App', () => {
  it('Has header.', () => {
    let exception;
    let threwException = false;
    let app;
    try {
      app = ReactTestUtils.renderIntoDocument<App>(
        <App />
      );
    } catch (e) {
      exception = e;
      threwException = true;
    }
    expect(threwException).to.be.false;

    let renderedDOM = ReactDOM.findDOMNode(app as React.ReactInstance);
    let headerElement = renderedDOM.querySelector('.od-Header');

    expect(headerElement).to.not.be.undefined;

  });
});