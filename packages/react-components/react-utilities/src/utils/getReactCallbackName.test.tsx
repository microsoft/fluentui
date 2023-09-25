import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { getReactCallbackName } from './getReactCallbackName';
import type { ReactCallbackName } from './getReactCallbackName';

const callbacks: ReactCallbackName[] = [
  'onCopy',
  'onCut',
  'onPaste',
  'onCompositionEnd',
  'onCompositionStart',
  'onCompositionUpdate',
  'onKeyDown',
  'onKeyUp',
  'onFocus',
  'onBlur',
  'onInput',
  'onInvalid',
  'onReset',
  'onSubmit',
  'onClick',
  'onContextMenu',
  'onDrag',
  'onDragEnd',
  'onDragEnter',
  'onDragExit',
  'onDragLeave',
  'onDragOver',
  'onDragStart',
  'onDrop',
  'onMouseDown',
  'onMouseMove',
  'onMouseEnter',
  'onMouseLeave',
  'onMouseOut',
  'onMouseOver',
  'onMouseUp',
  'onPointerDown',
  'onPointerMove',
  'onPointerUp',
  'onPointerCancel',
  'onGotPointerCapture',
  'onLostPointerCapture',
  'onPointerOver',
  'onPointerOut',
];

/**
 * React has special handling for some events, this means that they should be called on proper elements.
 */
const specialElements: Partial<Record<ReactCallbackName, keyof JSX.IntrinsicElements>> = {
  onBlur: 'button',
  onFocus: 'button',
  onInvalid: 'input',
  onReset: 'form',
  onSubmit: 'form',
};

/**
 * Some callbacks require special handling, for example focus/blur and change as React uses "onInput".
 */
const specialSimulators: Partial<Record<ReactCallbackName, (element: HTMLElement) => void>> = {
  onFocus: element => element.focus(),
  onBlur: element => {
    element.focus();
    element.blur();
  },
  onChange: element => {
    element.dispatchEvent(new Event('input', { bubbles: true }));
  },
  onMouseEnter: element => {
    element.dispatchEvent(new MouseEvent('mouseover', { bubbles: true }));
  },
  onMouseLeave: element => {
    element.dispatchEvent(new MouseEvent('mouseover', { bubbles: true }));
    element.dispatchEvent(new MouseEvent('mouseout', { bubbles: true }));
  },
};

const callbacksWithoutCapture: ReactCallbackName[] = [
  // The onMouseEnter and onMouseLeave events propagate from the element being left to the one being entered instead of
  // ordinary bubbling and do not have a capture phase.
  // https://reactjs.org/docs/events.html#mouse-events
  'onMouseEnter',
  'onMouseLeave',
];

describe('getReactCallbackName', () => {
  it.each(callbacks)('handles "%s"', callbackName => {
    const callbackHasCapturePhase = !callbacksWithoutCapture.includes(callbackName);
    const eventName = callbackName.slice(2).toLowerCase();

    const bubbleEventSpy = jest.fn();
    const captureEventSpy = jest.fn();

    const element = document.createElement('div');
    document.body.appendChild(element);

    const Component: React.FC = () =>
      React.createElement(specialElements[callbackName] || 'div', {
        id: 'test-el',
        [callbackName]: (e: React.SyntheticEvent) => {
          bubbleEventSpy(getReactCallbackName(e));
        },
        ...(callbackHasCapturePhase && {
          [callbackName + 'Capture']: (e: React.SyntheticEvent) => {
            captureEventSpy(getReactCallbackName(e) + 'Capture');
          },
        }),
      });

    ReactDOM.render(<Component />, element);
    const testElement = document.querySelector<HTMLElement>('#test-el')!;

    if (specialSimulators[callbackName]) {
      specialSimulators[callbackName]?.(testElement);
    } else {
      testElement.dispatchEvent(new Event(eventName, { bubbles: true }));
    }

    ReactDOM.unmountComponentAtNode(element);
    document.body.removeChild(element);

    expect(bubbleEventSpy).toHaveBeenCalledTimes(1);
    expect(bubbleEventSpy).toHaveBeenCalledWith(callbackName);

    if (callbackHasCapturePhase) {
      expect(captureEventSpy).toHaveBeenCalledTimes(1);
      expect(captureEventSpy).toHaveBeenCalledWith(callbackName + 'Capture');
    }
  });
});
