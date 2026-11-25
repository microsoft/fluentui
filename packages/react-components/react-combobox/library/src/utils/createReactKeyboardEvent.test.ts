import { createReactKeyboardEvent } from './createReactKeyboardEvent';
import * as React from 'react';
import { fireEvent, render } from '@testing-library/react';

describe('createReactKeyboardEvent', () => {
  it('matches React target for a composed keydown inside a shadow root', () => {
    const host = document.createElement('div');
    document.body.append(host);
    const container = document.createElement('div');
    host.attachShadow({ mode: 'open' }).append(container);
    const onKeyDown = jest.fn();
    const { getByRole, unmount } = render(React.createElement('button', { onKeyDown }, 'Trigger'), { container });
    const trigger = getByRole('button');
    let adaptedTarget: EventTarget | null = null;
    const onNativeKeyDown = (nativeEvent: KeyboardEvent) => {
      expect(nativeEvent.target).toBe(host);
      adaptedTarget = createReactKeyboardEvent(nativeEvent, trigger).event.target;
    };
    window.addEventListener('keydown', onNativeKeyDown, { capture: true, once: true });

    try {
      fireEvent(trigger, new KeyboardEvent('keydown', { key: 'Tab', bubbles: true, composed: true }));

      expect(onKeyDown).toHaveBeenCalledTimes(1);
      expect(onKeyDown.mock.calls[0][0].target).toBe(trigger);
      expect(adaptedTarget).toBe(trigger);
    } finally {
      window.removeEventListener('keydown', onNativeKeyDown, true);
      unmount();
      host.remove();
    }
  });

  it.each([9, 0])('matches React keydown legacy fields when native keyCode is %s', keyCode => {
    const onKeyDown = jest.fn();
    const { getByRole } = render(React.createElement('button', { onKeyDown }, 'Trigger'));
    const trigger = getByRole('button');
    // These deprecated fields remain part of the existing consumer callback contract.
    /* eslint-disable @typescript-eslint/no-deprecated */
    const nativeEvent = new KeyboardEvent('keydown', {
      key: 'Tab',
      code: 'Tab',
      bubbles: true,
      keyCode,
      charCode: 42,
    });
    fireEvent(trigger, nativeEvent);

    const reactEvent: React.KeyboardEvent<HTMLElement> = onKeyDown.mock.calls[0][0];
    const { event } = createReactKeyboardEvent(nativeEvent, trigger);
    expect(nativeEvent.keyCode).toBe(keyCode);
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
    trigger.dispatchEvent(nativeEvent);

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
