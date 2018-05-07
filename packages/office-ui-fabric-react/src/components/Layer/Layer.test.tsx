/* tslint:disable:no-unused-variable */
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as PropTypes from 'prop-types';
/* tslint:enable:no-unused-variable */
import * as renderer from 'react-test-renderer';

import { Layer } from './Layer';
import { LayerHost } from './LayerHost';

describe('Layer', () => {
  it('renders Layer correctly', () => {
    const component = renderer.create(<Layer>Content</Layer>);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('can render in a targeted LayerHost and pass context through', () => {

    class Child extends React.Component<{}, {}> {
      public static contextTypes = {
        foo: PropTypes.string.isRequired
      };

      public context: any;

      public render(): JSX.Element {
        return (
          <div id='child'>{ this.context.foo }</div>
        );
      }
    }

    class Parent extends React.Component<{}, {}> {
      public static childContextTypes = {
        foo: PropTypes.string
      };

      public getChildContext() {
        return {
          foo: 'foo'
        };
      }

      public render(): JSX.Element {
        return (
          <div id='parent'>
            <Layer hostId='foo'>
              <Child />
            </Layer>
          </div>
        );
      }
    }

    class App extends React.Component<{}, {}> {

      public render(): JSX.Element {
        return (
          <div id='app'>
            <Parent />
            <LayerHost id='foo' />
          </div>
        );
      }
    }

    const appElement = document.createElement('div');

    try {
      document.body.appendChild(appElement);
      ReactDOM.render(<App />, appElement);

      const parentElement = appElement.querySelector('#parent');

      expect(parentElement).toBeDefined();
      expect(parentElement!.ownerDocument).toBeDefined();

      const childElement = appElement.querySelector('#child') as Element;

      expect(childElement.textContent).toEqual('foo');
    } finally {
      ReactDOM.unmountComponentAtNode(appElement);
      appElement.remove();
    }
  });

});