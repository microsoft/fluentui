import { fireEvent } from '@testing-library/react';
import { renderHook } from '@testing-library/react-hooks';
import { useKeyboardModality } from './useKeyboardModality';

const pointerDown = () => fireEvent.mouseDown(document.body, { buttons: 1, clientX: 1, clientY: 1 });

describe('useKeyboardModality', () => {
  it('returns undefined before any interaction', () => {
    const { result } = renderHook(() => useKeyboardModality());

    expect(result.current()).toBeUndefined();
  });

  it('tracks keyboard and pointer interactions', () => {
    const onChange = jest.fn();
    const { result } = renderHook(() => useKeyboardModality(onChange));

    fireEvent.keyDown(document.body, { key: 'Tab' });
    expect(result.current()).toBe(true);
    expect(onChange).toHaveBeenLastCalledWith(true);

    pointerDown();
    expect(result.current()).toBe(false);
    expect(onChange).toHaveBeenLastCalledWith(false);

    fireEvent.keyDown(document.body, { key: 'ArrowDown' });
    fireEvent.touchStart(document.body);
    expect(result.current()).toBe(false);

    expect(onChange).toHaveBeenCalledTimes(4);
  });

  it('does not call onChange when the modality does not change', () => {
    const onChange = jest.fn();
    renderHook(() => useKeyboardModality(onChange));

    fireEvent.keyDown(document.body, { key: 'a' });
    fireEvent.keyDown(document.body, { key: 'b' });

    expect(onChange).toHaveBeenCalledTimes(1);
  });

  it('keeps the keyboard modality for virtual clicks dispatched by screen readers', () => {
    const { result } = renderHook(() => useKeyboardModality());

    fireEvent.keyDown(document.body, { key: 'Enter' });
    fireEvent.mouseDown(document.body, { buttons: 0 });
    fireEvent.mouseDown(document.body, { buttons: 1, clientX: 0, clientY: 0, screenX: 0, screenY: 0 });

    expect(result.current()).toBe(true);
  });

  it('shares document listeners between hook instances', () => {
    const addEventListener = jest.spyOn(document, 'addEventListener');
    const removeEventListener = jest.spyOn(document, 'removeEventListener');

    const first = renderHook(() => useKeyboardModality());
    const second = renderHook(() => useKeyboardModality());

    expect(addEventListener).toHaveBeenCalledTimes(3);

    fireEvent.keyDown(document.body, { key: 'Tab' });
    expect(first.result.current()).toBe(true);
    expect(second.result.current()).toBe(true);

    first.unmount();
    expect(removeEventListener).not.toHaveBeenCalled();

    second.unmount();
    expect(removeEventListener).toHaveBeenCalledTimes(3);

    addEventListener.mockRestore();
    removeEventListener.mockRestore();
  });
});
