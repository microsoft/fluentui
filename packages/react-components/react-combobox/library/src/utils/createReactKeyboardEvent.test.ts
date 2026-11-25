import { createReactKeyboardEvent } from './createReactKeyboardEvent';
import * as React from 'react';
import { fireEvent, render } from '@testing-library/react';

describe('createReactKeyboardEvent', () => {
  it.each([9, 0])('matches React keydown legacy fields when native keyCode is %s', keyCode => {
    const onKeyDown = jest.fn();
    const { getByRole } = render(React.createElement('button', { onKeyDown }, 'Trigger'));
    const trigger = getByRole('button');
    const nativeEvent = new KeyboardEvent('keydown', { key: 'Tab', code: 'Tab', bubbles: true });
    Object.defineProperties(nativeEvent, {
      keyCode: { value: keyCode },
      charCode: { value: 42 },
      which: { value: 42 },
    });
    fireEvent(trigger, nativeEvent);

    const reactEvent: React.KeyboardEvent<HTMLElement> = onKeyDown.mock.calls[0][0];
    const { event } = createReactKeyboardEvent(nativeEvent, trigger);
    // These deprecated fields remain part of the existing consumer callback contract.
    /* eslint-disable @typescript-eslint/no-deprecated */
    expect(event.charCode).toBe(reactEvent.charCode);
    expect(event.keyCode).toBe(reactEvent.keyCode);
    expect(event.which).toBe(reactEvent.which);
    /* eslint-enable @typescript-eslint/no-deprecated */
  });

  it('adapts a native keyboard event for a React callback', () => {
    const trigger = document.createElement('button');
    const nativeEvent = new KeyboardEvent('keydown', {
      bubbles: true,
      cancelable: true,
      code: 'Tab',
      key: 'Tab',
      shiftKey: true,
    });
    Object.defineProperty(nativeEvent, 'target', { value: trigger });

    const { event, release } = createReactKeyboardEvent(nativeEvent, trigger);

    expect(event.nativeEvent).toBe(nativeEvent);
    expect('nativeEvent' in event).toBe(true);
    expect('isDefaultPrevented' in event).toBe(true);
    expect('isPropagationStopped' in event).toBe(true);
    expect('persist' in event).toBe(true);
    expect(event.target).toBe(trigger);
    expect(event.currentTarget).toBe(trigger);
    expect(event.key).toBe('Tab');
    expect(event.code).toBe('Tab');
    expect(event.shiftKey).toBe(true);
    expect(event.getModifierState('Shift')).toBe(true);
    expect(event.defaultPrevented).toBe(false);
    expect(event.isDefaultPrevented()).toBe(false);
    expect(event.isPropagationStopped()).toBe(false);
    expect(event.persist()).toBeUndefined();

    event.preventDefault();
    event.stopPropagation();

    expect(nativeEvent.defaultPrevented).toBe(true);
    expect(event.defaultPrevented).toBe(true);
    expect(event.isDefaultPrevented()).toBe(true);
    expect(event.isPropagationStopped()).toBe(true);

    release();

    expect(event.currentTarget).toBeNull();
  });
});
