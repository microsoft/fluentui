import * as React from 'react';
import * as renderer from 'react-test-renderer';
import { VirtualizedListBasicExample } from './examples/VirtualizedList.Basic.Example';

describe('VirtualizedList', () => {
  let component: renderer.ReactTestRenderer | undefined;

  afterEach(() => {
    if (component) {
      component.unmount();
      component = undefined;
    }
  });

  it('renders', () => {
    component = renderer.create(<VirtualizedListBasicExample />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
