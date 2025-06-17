import * as React from 'react';
import { render, act } from '@testing-library/react';
import { MarqueeSelection } from './MarqueeSelection';
import { Selection } from '../../utilities/selection/index';
import { isConformant } from '../../common/isConformant';

/**
 * Helper for simulating mouse events on the document
 */
function simulateMouseEvent(eventName: string, options: MouseEventInit) {
  const event = new MouseEvent(eventName, options);
  document.body.dispatchEvent(event);
  return event;
}

/**
 * Helper to simulate a marquee selection drag operation
 */
function simulateMarqueeSelectionDrag(startPoint: { x: number; y: number }, endPoint: { x: number; y: number }) {
  // Start drag
  simulateMouseEvent('mousedown', { button: 0, buttons: 1, clientX: startPoint.x, clientY: startPoint.y });
  // End drag
  simulateMouseEvent('mousedown', { button: 0, buttons: 1, clientX: endPoint.x, clientY: endPoint.y });
}

// Mock getBoundingClientRect for testing
function mockElementBounds(
  element: HTMLElement,
  bounds: Pick<DOMRect, 'top' | 'left' | 'bottom' | 'right' | 'width' | 'height'>,
) {
  element.getBoundingClientRect = jest.fn().mockReturnValue(bounds as DOMRect);
}

describe('MarqueeSelection', () => {
  it('renders MarqueeSelection correctly', () => {
    const { container } = render(<MarqueeSelection selection={new Selection()} />);

    // Simulate clicking and dragging in order to add styling to the snapshot
    act(() => {
      simulateMarqueeSelectionDrag({ x: 0, y: 0 }, { x: 100, y: 100 });
    });

    // Run snapshot test
    expect(container.firstChild).toMatchSnapshot();
  });

  isConformant({
    Component: MarqueeSelection,
    displayName: 'MarqueeSelection',
    // Problem: Ref doesn't match DOM node and returns outermost wrapper div.
    // Solution: Ensure ref is passed correctly to the root element.
    disabledTests: ['component-handles-ref', 'component-has-root-ref'],
  });

  it('updates the selection when an item is selected', () => {
    // stub selection implementation to measure number of calls to setIndexSelected
    class SelectionStub extends Selection {
      public numSetIndexSelectedCalls = 0;
      public setIndexSelected(index: number, isSelected: boolean, shouldAnchor: boolean): void {
        this.numSetIndexSelectedCalls++;
      }
    }

    const selection = new SelectionStub();
    const { container } = render(
      <MarqueeSelection selection={selection}>
        <div className="itemToSelect" data-selection-index="0">
          0
        </div>
      </MarqueeSelection>,
    );

    // Find the item to select and mock its position
    const itemToSelect = container.querySelector('.itemToSelect') as HTMLElement;
    mockElementBounds(itemToSelect, {
      top: 10,
      left: 10,
      bottom: 90,
      right: 90,
      width: 80,
      height: 80,
    });

    // Simulate clicking and dragging to select the div
    act(() => {
      simulateMarqueeSelectionDrag({ x: 0, y: 0 }, { x: 100, y: 100 });
    });

    expect(selection.numSetIndexSelectedCalls).toEqual(1);
  });
});
