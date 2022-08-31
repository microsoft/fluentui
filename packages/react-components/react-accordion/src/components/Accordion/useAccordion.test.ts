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

  describe('multiple', () => {
    it('should only have zero open items before having any items', () => {
      const { result } = renderHook(() => useAccordion_unstable({ multiple: true }, React.createRef()));
      expect(result.current.openItems.length).toEqual(0);
      act(() => result.current.requestToggle(undefined!, { value: 0 }));
      expect(result.current.openItems.length).toEqual(1);
      act(() => result.current.requestToggle(undefined!, { value: 0 }));
      expect(result.current.openItems.length).toEqual(1);
    });
    it('should not have less than 1 open item', () => {
      const { result } = renderHook(() =>
        useAccordion_unstable({ multiple: true, defaultOpenItems: [0] }, React.createRef()),
      );

      expect(result.current.openItems.length).toEqual(1);

      act(() => result.current.requestToggle(undefined!, { value: 0 }));
      expect(result.current.openItems.length).toEqual(1);
      expect(result.current.openItems.includes(0)).toBeTruthy();
    });
    it('should open multiple panels', () => {
      const { result } = renderHook(() => useAccordion_unstable({ multiple: true }, React.createRef()));
      expect(result.current.openItems.length).toEqual(0);
      act(() => result.current.requestToggle(undefined!, { value: 0 }));
      expect(result.current.openItems.includes(0)).toBeTruthy();
      act(() => result.current.requestToggle(undefined!, { value: 1 }));
      expect(result.current.openItems.includes(1)).toBeTruthy();
      expect(result.current.openItems.length).toEqual(2);
    });
  });
  describe('collapsible', () => {
    it('should have zero panels opened', () => {
      const { result } = renderHook(() => useAccordion_unstable({ collapsible: true }, React.createRef()));
      expect(result.current.openItems.length).toEqual(0);
      act(() => result.current.requestToggle(undefined!, { value: 0 }));
      expect(result.current.openItems.length).toEqual(1);
      act(() => result.current.requestToggle(undefined!, { value: 0 }));
      expect(result.current.openItems.length).toEqual(0);
    });
    it('should not open more than one panel', () => {
      const { result } = renderHook(() => useAccordion_unstable({ collapsible: true }, React.createRef()));
      expect(result.current.openItems.length).toEqual(0);
      act(() => result.current.requestToggle(undefined!, { value: 0 }));
      expect(result.current.openItems.length).toEqual(1);
      expect(result.current.openItems.includes(0)).toBeTruthy();
      act(() => result.current.requestToggle(undefined!, { value: 1 }));
      expect(result.current.openItems.length).toEqual(1);
      expect(result.current.openItems.includes(1)).toBeTruthy();
      expect(result.current.openItems.includes(0)).toBeFalsy();
    });
  });
});
