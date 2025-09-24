import * as React from 'react';
import { render, act } from '@testing-library/react';
import { renderHook } from '@testing-library/react-hooks';
import { useApplyScrollbarWidth } from './useApplyScrollbarWidth';
import { measureScrollbarWidth } from '../utils/measureScrollBarWidth';

jest.mock('../utils/measureScrollBarWidth');

const mockMeasureScrollbarWidth = measureScrollbarWidth as jest.MockedFunction<typeof measureScrollbarWidth>;

describe('useApplyScrollbarWidth', () => {
  let mockDocument: Document;
  let mockElement: HTMLElement;

  beforeEach(() => {
    mockDocument = document;
    mockElement = document.createElement('div');
    mockMeasureScrollbarWidth.mockReturnValue(17);
    jest.clearAllMocks();
  });

  it('returns a callback function', () => {
    const { result } = renderHook(() => useApplyScrollbarWidth());

    expect(typeof result.current).toBe('function');
  });

  it('applies scrollbar width to element when ref callback is called', () => {
    const { result } = renderHook(() => useApplyScrollbarWidth());

    act(() => {
      result.current(mockElement);
    });

    expect(mockMeasureScrollbarWidth).toHaveBeenCalledWith(mockDocument);

    act(() => {
      result.current(mockElement);
    });

    expect(mockMeasureScrollbarWidth).toHaveBeenCalledWith(mockDocument);
    expect(mockElement.style.getPropertyValue('width')).toBe('17px');
  });

  it('uses custom CSS property when specified', () => {
    const { result } = renderHook(() =>
      useApplyScrollbarWidth({
        property: 'padding-right',
      }),
    );

    act(() => {
      result.current(mockElement);
    });

    expect(mockElement.style.getPropertyValue('padding-right')).toBe('17px');
    expect(mockElement.style.getPropertyValue('width')).toBe('');
  });

  it('does not apply styles when element is null', () => {
    const { result } = renderHook(() => useApplyScrollbarWidth());

    act(() => {
      result.current(null);
    });

    expect(mockMeasureScrollbarWidth).not.toHaveBeenCalled();
  });

  it('works with real JSX components', () => {
    const TestComponent = () => {
      const scrollbarRef = useApplyScrollbarWidth({ force: true });

      return <div ref={scrollbarRef} data-testid="scrollbar-element" />;
    };

    mockMeasureScrollbarWidth.mockClear();
    const { getByTestId } = render(<TestComponent />);
    const element = getByTestId('scrollbar-element');

    expect(mockMeasureScrollbarWidth).toHaveBeenCalledTimes(1);
    expect(mockMeasureScrollbarWidth).toHaveBeenCalledWith(expect.any(Object));
    expect(element.style.getPropertyValue('width')).toBe('17px');
  });

  it('works with custom properties in JSX', () => {
    const TestComponent = () => {
      const scrollbarRef = useApplyScrollbarWidth({
        property: 'padding-right',
        force: true,
      });

      return <div ref={scrollbarRef} data-testid="custom-property-element" />;
    };

    mockMeasureScrollbarWidth.mockClear();
    const { getByTestId } = render(<TestComponent />);
    const element = getByTestId('custom-property-element');

    expect(element.style.getPropertyValue('padding-right')).toBe('17px');
    expect(element.style.getPropertyValue('width')).toBe('');
  });

  it('works with different element types', () => {
    const TestComponent = () => {
      const divRef = useApplyScrollbarWidth({ force: true });
      const spanRef = useApplyScrollbarWidth({
        property: 'margin-left',
        force: true,
      });

      return (
        <>
          <div ref={divRef} data-testid="div-element" />
          <span ref={spanRef} data-testid="span-element" />
        </>
      );
    };

    mockMeasureScrollbarWidth.mockClear();
    const { getByTestId } = render(<TestComponent />);
    const divElement = getByTestId('div-element');
    const spanElement = getByTestId('span-element');

    // Both elements should have the scrollbar width applied
    expect(divElement.style.getPropertyValue('width')).toBe('17px');
    expect(spanElement.style.getPropertyValue('margin-left')).toBe('17px');
  });

  it('handles conditional rendering', () => {
    const TestComponent: React.FC<{ show: boolean }> = ({ show }) => {
      const scrollbarRef = useApplyScrollbarWidth({ force: true });

      return show ? <div ref={scrollbarRef} data-testid="conditional-element" /> : null;
    };

    mockMeasureScrollbarWidth.mockClear();
    // First render - element is shown
    const { getByTestId, rerender } = render(<TestComponent show={true} />);
    const element = getByTestId('conditional-element');
    expect(element.style.getPropertyValue('width')).toBe('17px');

    // Re-render - element is hidden
    rerender(<TestComponent show={false} />);

    // Re-render - element is shown again
    rerender(<TestComponent show={true} />);
    const elementAfterRerender = getByTestId('conditional-element');

    // Element should still have the scrollbar width applied
    expect(elementAfterRerender.style.getPropertyValue('width')).toBe('17px');
  });
});
