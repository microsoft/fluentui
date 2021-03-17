import { useAccordion } from './useAccordion';
import { renderHook, act } from '@testing-library/react-hooks';
import { createRef } from 'react';

describe('useCreateAccordionContext', () => {
  const ref = createRef<HTMLElement>();
  it('should return Accordion internal Context', () => {
    const {
      result: {
        current: { context },
      },
    } = renderHook(() => useAccordion({}, ref));
    expect(context).toBeDefined();
    expect(context.openItems).toBeInstanceOf(Array);
    expect(context.requestToggle).toBeInstanceOf(Function);
  });

  describe('AccordionContext', () => {
    it('should respect accordion behavior', () => {
      const { result } = renderHook(() => useAccordion({ defaultIndex: [0, 1, 2] }, ref));
      expect(result.current.context.openItems.length).toEqual(1);
      expect(result.current.context.openItems.includes(0)).toBeTruthy();
      act(() => result.current.context.requestToggle(undefined!, 1));
      expect(result.current.context.openItems.length).toEqual(1);
      expect(result.current.context.openItems.includes(1)).toBeTruthy();
    });
    it('should respect multiple behavior', () => {
      const { result } = renderHook(() => useAccordion({ multiple: true }, ref));
      expect(result.current.context.openItems.length).toEqual(1);
      expect(result.current.context.openItems.includes(0)).toBeTruthy();
      act(() => result.current.context.requestToggle(undefined!, 1));
      expect(result.current.context.openItems.length).toEqual(2);
      expect(result.current.context.openItems.includes(0)).toBeTruthy();
      expect(result.current.context.openItems.includes(1)).toBeTruthy();
    });
    it('should respect collapsible behavior', () => {
      const { result } = renderHook(() => useAccordion({ collapsible: true }, ref));
      expect(result.current.context.openItems.length).toEqual(0);
      act(() => result.current.context.requestToggle(undefined!, 0));
      expect(result.current.context.openItems.length).toEqual(1);
      expect(result.current.context.openItems.includes(0)).toBeTruthy();
      act(() => result.current.context.requestToggle(undefined!, 1));
      expect(result.current.context.openItems.length).toEqual(1);
      expect(result.current.context.openItems.includes(1)).toBeTruthy();
    });
    it('should respect collapsible and multiple behavior', () => {
      const { result } = renderHook(() => useAccordion({ collapsible: true, multiple: true }, ref));
      expect(result.current.context.openItems.length).toEqual(0);
      act(() => result.current.context.requestToggle(undefined!, 0));
      expect(result.current.context.openItems.length).toEqual(1);
      expect(result.current.context.openItems.includes(0)).toBeTruthy();
      act(() => result.current.context.requestToggle(undefined!, 1));
      expect(result.current.context.openItems.length).toEqual(2);
      expect(result.current.context.openItems.includes(0)).toBeTruthy();
      expect(result.current.context.openItems.includes(1)).toBeTruthy();
    });
  });
});
