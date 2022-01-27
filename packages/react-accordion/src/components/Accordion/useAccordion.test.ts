import { act, renderHook } from '@testing-library/react-hooks';
import * as React from 'react';

import { useAccordion_unstable } from './useAccordion';

describe('useAccordion_unstable', () => {
  it('handle toggle behavior', () => {
    const { result } = renderHook(() => useAccordion_unstable({ defaultOpenItems: [0, 1, 2] }, React.createRef()));

    expect(result.current.openItems.length).toEqual(1);
    expect(result.current.openItems.includes(0)).toBeTruthy();

    act(() => result.current.requestToggle(undefined!, { value: 1 }));

    expect(result.current.openItems.length).toEqual(1);
    expect(result.current.openItems.includes(1)).toBeTruthy();
  });

  // TODO: fix this state, right now we can't ensure collapsible on first render
  it('should respect "multiple" behavior', () => {
    const { result } = renderHook(() => useAccordion_unstable({ multiple: true }, React.createRef()));

    expect(result.current.openItems.length).toEqual(1);
    expect(result.current.openItems.includes(0)).toBeTruthy();

    act(() => result.current.requestToggle(undefined!, { value: 1 }));

    expect(result.current.openItems.length).toEqual(2);
    expect(result.current.openItems.includes(0)).toBeTruthy();
    expect(result.current.openItems.includes(1)).toBeTruthy();
  });

  it('should respect collapsible behavior', () => {
    const { result } = renderHook(() => useAccordion_unstable({ collapsible: true }, React.createRef()));

    expect(result.current.openItems.length).toEqual(0);

    act(() => result.current.requestToggle(undefined!, { value: 0 }));

    expect(result.current.openItems.length).toEqual(1);
    expect(result.current.openItems.includes(0)).toBeTruthy();

    act(() => result.current.requestToggle(undefined!, { value: 1 }));

    expect(result.current.openItems.length).toEqual(1);
    expect(result.current.openItems.includes(1)).toBeTruthy();
  });
  it('should respect collapsible and multiple behavior', () => {
    const { result } = renderHook(() =>
      useAccordion_unstable({ multiple: true, collapsible: true }, React.createRef()),
    );

    expect(result.current.openItems.length).toEqual(0);

    act(() => result.current.requestToggle(undefined!, { value: 0 }));

    expect(result.current.openItems.length).toEqual(1);
    expect(result.current.openItems.includes(0)).toBeTruthy();

    act(() => result.current.requestToggle(undefined!, { value: 1 }));

    expect(result.current.openItems.length).toEqual(2);
    expect(result.current.openItems.includes(0)).toBeTruthy();
    expect(result.current.openItems.includes(1)).toBeTruthy();
  });
});
