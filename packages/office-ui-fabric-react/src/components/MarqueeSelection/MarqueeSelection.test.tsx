import * as React from 'react';
import { mount } from 'enzyme';
import { MarqueeSelection } from './MarqueeSelection';
import { Selection } from '../../utilities/selection/index';

describe('MarqueeSelection', () => {
  it('renders MarqueeSelection correctly', () => {
    // It is necessary to use `mount` here so that mouse events can be properly simulated.
    const component = mount(<MarqueeSelection selection={new Selection()} />);

    // Simulate clicking and dragging in order to add styling to the snapshot.
    const top = window.document.body;
    const dragStart = new MouseEvent('mousedown', { button: 0, buttons: 1, clientX: 0, clientY: 0 });
    top.dispatchEvent(dragStart);
    const dragEnd = new MouseEvent('mousedown', { button: 0, buttons: 1, clientX: 100, clientY: 100 });
    top.dispatchEvent(dragEnd);
    component.update();

    // Run snapshot test.
    expect(component.getDOMNode()).toMatchSnapshot();
  });
});
