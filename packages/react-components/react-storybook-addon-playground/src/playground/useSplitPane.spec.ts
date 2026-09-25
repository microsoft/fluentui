import type * as React from 'react';
import { act, renderHook } from '@testing-library/react';

import { SPLIT_DEFAULT_PERCENT, SPLIT_MAX_PERCENT, SPLIT_MIN_PERCENT, useSplitPane } from './useSplitPane';

function keyDown(key: string): React.KeyboardEvent<HTMLElement> {
  return { key, preventDefault: jest.fn() } as unknown as React.KeyboardEvent<HTMLElement>;
}

describe('useSplitPane', () => {
  const containerRef = { current: null };

  it('starts with an even split and exposes separator a11y attributes', () => {
    const { result } = renderHook(() => useSplitPane(containerRef));

    expect(result.current.percent).toBe(SPLIT_DEFAULT_PERCENT);
    expect(result.current.dragging).toBe(false);
    expect(result.current.separatorProps).toMatchObject({
      role: 'separator',
      'aria-orientation': 'vertical',
      'aria-valuemin': SPLIT_MIN_PERCENT,
      'aria-valuemax': SPLIT_MAX_PERCENT,
      'aria-valuenow': SPLIT_DEFAULT_PERCENT,
      tabIndex: 0,
    });
  });

  it('resizes with the keyboard within the allowed range', () => {
    const { result } = renderHook(() => useSplitPane(containerRef));

    act(() => result.current.separatorProps.onKeyDown(keyDown('ArrowLeft')));
    expect(result.current.percent).toBe(SPLIT_DEFAULT_PERCENT - 5);

    act(() => result.current.separatorProps.onKeyDown(keyDown('ArrowRight')));
    act(() => result.current.separatorProps.onKeyDown(keyDown('ArrowRight')));
    expect(result.current.percent).toBe(SPLIT_DEFAULT_PERCENT + 5);

    act(() => result.current.separatorProps.onKeyDown(keyDown('End')));
    expect(result.current.percent).toBe(SPLIT_MAX_PERCENT);
    act(() => result.current.separatorProps.onKeyDown(keyDown('ArrowRight')));
    expect(result.current.percent).toBe(SPLIT_MAX_PERCENT);

    act(() => result.current.separatorProps.onKeyDown(keyDown('Home')));
    expect(result.current.percent).toBe(SPLIT_MIN_PERCENT);
    act(() => result.current.separatorProps.onKeyDown(keyDown('ArrowLeft')));
    expect(result.current.percent).toBe(SPLIT_MIN_PERCENT);

    act(() => result.current.separatorProps.onKeyDown(keyDown('Enter')));
    expect(result.current.percent).toBe(SPLIT_DEFAULT_PERCENT);
  });

  it('ignores unrelated keys', () => {
    const { result } = renderHook(() => useSplitPane(containerRef));
    const event = keyDown('a');

    act(() => result.current.separatorProps.onKeyDown(event));

    expect(result.current.percent).toBe(SPLIT_DEFAULT_PERCENT);
    expect(event.preventDefault).not.toHaveBeenCalled();
  });

  it('resets on double click', () => {
    const { result } = renderHook(() => useSplitPane(containerRef));

    act(() => result.current.separatorProps.onKeyDown(keyDown('End')));
    act(() => result.current.separatorProps.onDoubleClick({} as React.MouseEvent<HTMLElement>));

    expect(result.current.percent).toBe(SPLIT_DEFAULT_PERCENT);
  });
});
