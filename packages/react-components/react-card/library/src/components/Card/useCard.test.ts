import * as React from 'react';
import { renderHook } from '@testing-library/react-hooks';
import { useFocusableGroup, useFocusFinders, useFocusWithin } from '@fluentui/react-tabster';

import { useCard_unstable, useCardBase_unstable } from './useCard';

jest.mock('@fluentui/react-tabster', () => ({
  useFocusWithin: jest.fn(),
  useFocusFinders: jest.fn(),
  useFocusableGroup: jest.fn(),
}));

const mockFocusWithinRef = React.createRef<HTMLDivElement>();
const mockFindAllFocusable = jest.fn().mockReturnValue([]);

beforeEach(() => {
  (useFocusWithin as jest.Mock).mockReturnValue(mockFocusWithinRef);
  (useFocusFinders as jest.Mock).mockReturnValue({ findAllFocusable: mockFindAllFocusable });
  (useFocusableGroup as jest.Mock).mockReturnValue({ 'data-tabster': '{"groupper":{}}' });
  mockFindAllFocusable.mockReturnValue([]);
});

// ---------------------------------------------------------------------------
// useCardBase_unstable — interactive is now computed from event props only,
// without any @fluentui/react-tabster dependency.
// ---------------------------------------------------------------------------

describe('useCardBase_unstable', () => {
  it('returns interactive: false when no pointer/mouse event props are provided', () => {
    const { result } = renderHook(() => useCardBase_unstable({}, React.createRef()));
    expect(result.current.interactive).toBe(false);
  });

  it('returns interactive: true when onClick is provided', () => {
    const { result } = renderHook(() => useCardBase_unstable({ onClick: jest.fn() }, React.createRef()));
    expect(result.current.interactive).toBe(true);
  });

  it('returns interactive: true for other pointer event props', () => {
    const { result: r1 } = renderHook(() => useCardBase_unstable({ onPointerDown: jest.fn() }, React.createRef()));
    expect(r1.current.interactive).toBe(true);

    const { result: r2 } = renderHook(() => useCardBase_unstable({ onMouseUp: jest.fn() }, React.createRef()));
    expect(r2.current.interactive).toBe(true);
  });

  it('returns interactive: false when disabled even if onClick is provided', () => {
    const { result } = renderHook(() =>
      useCardBase_unstable({ onClick: jest.fn(), disabled: true }, React.createRef()),
    );
    expect(result.current.interactive).toBe(false);
  });
});

// ---------------------------------------------------------------------------
// useCard_unstable — focus management (tabIndex, focusable-group attrs) moved
// here from useCardBase_unstable; applied only when appropriate.
// ---------------------------------------------------------------------------

describe('useCard_unstable', () => {
  it('applies tabIndex: 0 and focusable-group attrs when interactive and not selectable', () => {
    const { result } = renderHook(() => useCard_unstable({ onClick: jest.fn() }, React.createRef()));
    expect(result.current.root.tabIndex).toBe(0);
    expect((result.current.root as Record<string, unknown>)['data-tabster']).toBe('{"groupper":{}}');
  });

  it('does not apply focus attrs when disabled', () => {
    const { result } = renderHook(() => useCard_unstable({ onClick: jest.fn(), disabled: true }, React.createRef()));
    expect(result.current.root.tabIndex).toBeUndefined();
    expect((result.current.root as Record<string, unknown>)['data-tabster']).toBeUndefined();
  });

  it('does not apply focus attrs when focusMode is off', () => {
    const { result } = renderHook(() => useCard_unstable({ onClick: jest.fn(), focusMode: 'off' }, React.createRef()));
    expect(result.current.root.tabIndex).toBeUndefined();
    expect((result.current.root as Record<string, unknown>)['data-tabster']).toBeUndefined();
  });

  it('does not apply focus attrs when card is selectable', () => {
    const { result } = renderHook(() => useCard_unstable({ onSelectionChange: jest.fn() }, React.createRef()));
    expect(result.current.root.tabIndex).toBeUndefined();
    expect((result.current.root as Record<string, unknown>)['data-tabster']).toBeUndefined();
  });
});
