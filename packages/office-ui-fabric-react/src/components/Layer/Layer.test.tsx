/* tslint:disable:no-unused-variable */
import * as React from 'react';
import * as ReactDOM from 'react-dom';
/* tslint:enable:no-unused-variable */

import * as ReactTestUtils from 'react-addons-test-utils';
import { Layer } from './Layer';
import { LayerHost } from './LayerHost';

let { expect } = chai;

describe('Layer', () => {

  it('can pass context through', () => {

    class Child extends React.Component<{}, {}> {
      public static contextTypes = {
        foo: React.PropTypes.string.isRequired
      };

      public context: any;

      public render() {
        return (
          <div id='child'>{ this.context.foo }</div>
        );
      }
    }

    class Parent extends React.Component<{}, {}> {
      public static childContextTypes = {
        foo: React.PropTypes.string
      };

      public getChildContext() {
        return {
          foo: 'foo'
        };
      }

      public render() {
        return (
          <div id='parent'>
            <Layer>
              <Child />
            </Layer>
          </div>
        );
      }
    }

    class App extends React.Component<{}, {}> {

      public render() {
        return (
          <div id='app'>
            <LayerHost>
              <Parent />
            </LayerHost>
          </div>
        );
      }
    }

    let app = ReactTestUtils.renderIntoDocument(<App />) as React.ReactInstance;
    let appElement = ReactDOM.findDOMNode(app);
    let parentElement = appElement.querySelector('#parent');

    expect(parentElement).is.not.empty;
    expect(parentElement.ownerDocument).is.not.empty;

    let childElement = appElement.querySelector('#child');

    expect(childElement.textContent).equals('foo');
  });

});