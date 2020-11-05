import * as React from 'react';
import { mount } from 'enzyme';
import { MarqueeSelection } from './MarqueeSelection';
import { Selection } from '../../utilities/selection/index';
import { isConformant } from '../../common/isConformant';

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

  isConformant({
    Component: MarqueeSelection,
    displayName: 'MarqueeSelection',
    // Problem: Ref doesn't match DOM node and returns outermost wrapper div.
    // Solution: Ensure ref is passed correctly to the root element.
    disabledTests: ['component-handles-ref', 'component-has-root-ref'],
  });

  it('updates the selection when an item is selected', () => {
    // stub selection implementation to measure number of calls to setIndexSelected.
    class SelectionStub extends Selection {
      public numSetIndexSelectedCalls = 0;
      public setIndexSelected(index: number, isSelected: boolean, shouldAnchor: boolean): void {
        this.numSetIndexSelectedCalls++;
      }
    }

    const selection = new SelectionStub();
    // It is necessary to use `mount` here so that mouse events can be properly simulated.
    const component = mount(
      <MarqueeSelection selection={selection}>
        <div className={'itemToSelect'} data-selection-index="0">
          0
        </div>
      </MarqueeSelection>,
    );

    const element = component.getDOMNode();
    const itemToSelect = element.querySelector('.itemToSelect') as HTMLElement;
    itemToSelect.getBoundingClientRect = () => {
      return {
        top: 10,
        left: 10,
        bottom: 90,
        right: 90,
        width: 80,
        height: 80,
      } as DOMRect;
    };

    // Simulate clicking and dragging to select the div.
    const top = window.document.body;
    const dragStart = new MouseEvent('mousedown', { button: 0, buttons: 1, clientX: 0, clientY: 0 });
    top.dispatchEvent(dragStart);
    const dragEnd = new MouseEvent('mousedown', { button: 0, buttons: 1, clientX: 100, clientY: 100 });
    top.dispatchEvent(dragEnd);

    component.update();

    expect(selection.numSetIndexSelectedCalls).toEqual(1);
  });
});
