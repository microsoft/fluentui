import * as React from 'react';
import * as renderer from 'react-test-renderer';
import { mount } from 'enzyme';
import { MarqueeSelection } from './MarqueeSelection';
import { Selection } from 'office-ui-fabric-react/lib/MarqueeSelection';

describe('MarqueeSelection', () => {
  it('renders MarqueeSelection correctly', () => {
    // It is necessary to use `mount` here so that mouse events can be properly simulated.
    const component = mount(
      <MarqueeSelection selection={ new Selection() } />
    );

    // Simulate clicking and dragging in order to add styling to the snapshot.
    const top = window.document.body;
    const dragStart = new MouseEvent('mousedown', { button: 0, buttons: 1, clientX: 0, clientY: 0 });
    top.dispatchEvent(dragStart);
    const dragEnd = new MouseEvent('mousedown', { button: 0, buttons: 1, clientX: 100, clientY: 100 });
    top.dispatchEvent(dragEnd);

    // Create a React element to use for snapshot testing.
    const tree = renderer.create(React.createElement(component.html()));
    expect(tree).toMatchSnapshot();
  });
});
