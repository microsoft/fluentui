import { createReactKeyboardEvent } from './createReactKeyboardEvent';

describe('createReactKeyboardEvent', () => {
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
    expect(event.isDefaultPrevented()).toBe(false);
    expect(event.isPropagationStopped()).toBe(false);
    expect(event.persist()).toBeUndefined();

    event.preventDefault();
    event.stopPropagation();

    expect(nativeEvent.defaultPrevented).toBe(true);
    expect(event.isDefaultPrevented()).toBe(true);
    expect(event.isPropagationStopped()).toBe(true);

    release();

    expect(event.currentTarget).toBeNull();
  });
});
