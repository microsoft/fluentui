import * as React from 'react';
import { fireEvent } from '@testing-library/react';
import { renderHook } from '@testing-library/react-hooks';
import { Provider_unstable as FluentProvider } from '@fluentui/react-shared-contexts';
import { setKeyboardModality, useKeyboardModality } from './useKeyboardModality';
import { useIsomorphicLayoutEffect } from './useIsomorphicLayoutEffect';

const pointerDown = () => fireEvent.mouseDown(document.body, { buttons: 1, clientX: 1, clientY: 1 });
const DocumentProvider = ({
  targetDocument,
  children,
}: {
  targetDocument: Document | undefined;
  children?: React.ReactNode;
}) => React.createElement(FluentProvider, { value: { targetDocument, dir: 'ltr' } }, children);

describe('useKeyboardModality', () => {
  it('returns undefined before any interaction', () => {
    const { result } = renderHook(() => useKeyboardModality());

    expect(result.current()).toBeUndefined();
  });

  it.each([
    ['keyboard', () => fireEvent.keyDown(document.body, { key: 'Tab' }), true],
    ['mouse', pointerDown, false],
    ['touch', () => fireEvent.touchStart(document.body), false],
  ] as const)('reads existing %s modality before its passive effect subscribes', (_, interact, expected) => {
    renderHook(() => useKeyboardModality());
    interact();
    const onLayout = jest.fn();
    const onChange = jest.fn();

    renderHook(() => {
      const getModality = useKeyboardModality(onChange);
      useIsomorphicLayoutEffect(() => {
        onLayout(getModality());
      }, [getModality]);
    });

    expect(onLayout).toHaveBeenCalledWith(expected);
    expect(onChange).not.toHaveBeenCalled();
  });

  it('keeps a stable getter and reads the current document before passive effects on document changes', () => {
    const otherDocument = document.implementation.createHTMLDocument();
    const first = renderHook(() => useKeyboardModality());
    const second = renderHook(() => useKeyboardModality(), {
      wrapper: ({ children }: { children?: React.ReactNode }) =>
        React.createElement(DocumentProvider, { targetDocument: otherDocument }, children),
    });
    pointerDown();
    fireEvent(otherDocument, new KeyboardEvent('keydown', { key: 'Tab' }));
    const onLayout = jest.fn();
    let targetDocument: Document | undefined = document;
    const { result, rerender } = renderHook(
      () => {
        const getModality = useKeyboardModality();
        useIsomorphicLayoutEffect(() => {
          onLayout(getModality());
        });
        return getModality;
      },
      {
        wrapper: ({ children }: { children?: React.ReactNode }) =>
          React.createElement(DocumentProvider, { targetDocument }, children),
      },
    );
    const getModality = result.current;
    expect(onLayout).toHaveBeenLastCalledWith(false);

    targetDocument = otherDocument;
    rerender();
    expect(result.current).toBe(getModality);
    expect(onLayout).toHaveBeenLastCalledWith(true);
    expect(getModality()).toBe(true);

    targetDocument = undefined;
    rerender();
    expect(result.current).toBe(getModality);
    expect(onLayout).toHaveBeenLastCalledWith(undefined);
    expect(getModality()).toBeUndefined();
    expect(first.result.current()).toBe(false);
    expect(second.result.current()).toBe(true);
  });

  it('does not subscribe without a target document', () => {
    const addEventListener = jest.spyOn(document, 'addEventListener');
    try {
      const { result } = renderHook(() => useKeyboardModality(), {
        wrapper: ({ children }: { children?: React.ReactNode }) =>
          React.createElement(DocumentProvider, { targetDocument: undefined }, children),
      });

      expect(result.current()).toBeUndefined();
      expect(addEventListener).not.toHaveBeenCalled();
    } finally {
      addEventListener.mockRestore();
    }
  });

  it('forgets modality when the last subscriber unmounts', () => {
    const first = renderHook(() => useKeyboardModality());
    pointerDown();
    first.unmount();

    const onLayout = jest.fn();
    const second = renderHook(() => {
      const getModality = useKeyboardModality();
      useIsomorphicLayoutEffect(() => {
        onLayout(getModality());
      }, [getModality]);
      return getModality;
    });

    expect(onLayout).toHaveBeenCalledWith(undefined);
    expect(second.result.current()).toBeUndefined();
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

  it('synchronizes imperative changes with all subscribers and resumes native tracking', () => {
    const onChange = jest.fn();
    const first = renderHook(() => useKeyboardModality(onChange));
    const second = renderHook(() => useKeyboardModality());
    pointerDown();
    onChange.mockClear();

    setKeyboardModality(document, true);
    setKeyboardModality(document, true);
    expect(first.result.current()).toBe(true);
    expect(second.result.current()).toBe(true);
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenLastCalledWith(true);

    fireEvent.mouseDown(document.body, { buttons: 0 });
    expect(first.result.current()).toBe(true);

    pointerDown();
    expect(first.result.current()).toBe(false);
    expect(onChange).toHaveBeenLastCalledWith(false);

    fireEvent.keyDown(document.body, { key: 'Tab' });
    setKeyboardModality(document, false);
    expect(first.result.current()).toBe(false);
    expect(second.result.current()).toBe(false);
  });

  it('only synchronizes the specified document', () => {
    const otherDocument = document.implementation.createHTMLDocument();
    const first = renderHook(() => useKeyboardModality());
    const second = renderHook(() => useKeyboardModality(), {
      wrapper: ({ children }: { children?: React.ReactNode }) =>
        React.createElement(DocumentProvider, { targetDocument: otherDocument }, children),
    });

    setKeyboardModality(document, true);
    setKeyboardModality(otherDocument, false);
    expect(first.result.current()).toBe(true);
    expect(second.result.current()).toBe(false);
  });

  it('preserves imperative changes until the first consumer mounts', () => {
    const addEventListener = jest.spyOn(document, 'addEventListener');
    try {
      setKeyboardModality(undefined, true);
      expect(addEventListener).not.toHaveBeenCalled();

      setKeyboardModality(document, true);
      expect(addEventListener).toHaveBeenCalledTimes(3);

      const onLayout = jest.fn();
      const next = renderHook(() => {
        const getModality = useKeyboardModality();
        useIsomorphicLayoutEffect(() => {
          onLayout(getModality());
        }, [getModality]);
        return getModality;
      });

      expect(onLayout).toHaveBeenCalledWith(true);
      expect(next.result.current()).toBe(true);
    } finally {
      addEventListener.mockRestore();
    }
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
