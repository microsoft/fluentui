import { useAccordion } from './useAccordion';
import { renderHook, act } from '@testing-library/react-hooks';
import { createRef } from 'react';
import { createAccordionContextValue } from './AccordionContext';

describe('useAccordionContextValue', () => {
  const ref = createRef<HTMLElement>();
  it('should return Accordion internal Context', () => {
    const {
      result: { current: context },
    } = renderHook(() => createAccordionContextValue(useAccordion({}, ref)));
    expect(context).toBeDefined();
    expect(context.openItems).toBeInstanceOf(Array);
    expect(context.requestToggle).toBeInstanceOf(Function);
  });

  describe('AccordionContextValue', () => {
    it('should respect accordion behavior', () => {
      const { result } = renderHook(() => createAccordionContextValue(useAccordion({ defaultIndex: [0, 1, 2] }, ref)));
      expect(result.current.openItems.length).toEqual(1);
      expect(result.current.openItems.includes(0)).toBeTruthy();
      act(() => result.current.requestToggle(undefined!, { index: 1 }));
      expect(result.current.openItems.length).toEqual(1);
      expect(result.current.openItems.includes(1)).toBeTruthy();
    });
    it('should respect multiple behavior', () => {
      const { result } = renderHook(() => createAccordionContextValue(useAccordion({ multiple: true }, ref)));
      expect(result.current.openItems.length).toEqual(1);
      expect(result.current.openItems.includes(0)).toBeTruthy();
      act(() => result.current.requestToggle(undefined!, { index: 1 }));
      expect(result.current.openItems.length).toEqual(2);
      expect(result.current.openItems.includes(0)).toBeTruthy();
      expect(result.current.openItems.includes(1)).toBeTruthy();
    });
    it('should respect collapsible behavior', () => {
      const { result } = renderHook(() => createAccordionContextValue(useAccordion({ collapsible: true }, ref)));
      expect(result.current.openItems.length).toEqual(0);
      act(() => result.current.requestToggle(undefined!, { index: 0 }));
      expect(result.current.openItems.length).toEqual(1);
      expect(result.current.openItems.includes(0)).toBeTruthy();
      act(() => result.current.requestToggle(undefined!, { index: 1 }));
      expect(result.current.openItems.length).toEqual(1);
      expect(result.current.openItems.includes(1)).toBeTruthy();
    });
    it('should respect collapsible and multiple behavior', () => {
      const { result } = renderHook(() =>
        createAccordionContextValue(useAccordion({ multiple: true, collapsible: true }, ref)),
      );
      expect(result.current.openItems.length).toEqual(0);
      act(() => result.current.requestToggle(undefined!, { index: 0 }));
      expect(result.current.openItems.length).toEqual(1);
      expect(result.current.openItems.includes(0)).toBeTruthy();
      act(() => result.current.requestToggle(undefined!, { index: 1 }));
      expect(result.current.openItems.length).toEqual(2);
      expect(result.current.openItems.includes(0)).toBeTruthy();
      expect(result.current.openItems.includes(1)).toBeTruthy();
    });
  });
});
