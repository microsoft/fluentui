import * as React from 'react';
import { renderHook } from '@testing-library/react-hooks';
import { SwatchPickerProvider } from '../../contexts/swatchPicker';
import { useEmptySwatch_unstable } from './useEmptySwatch';

describe('useEmptySwatch', () => {
  it('returns the default state', () => {
    const ref = React.createRef<HTMLButtonElement>();
    const { result } = renderHook(() => useEmptySwatch_unstable({}, ref));

    expect(result.current.root.role).toBe('radio');
    expect(result.current.root['aria-checked']).toBe(false);
    expect(result.current.size).toBe('medium');
    expect(result.current.shape).toBe('square');
  });

  it('uses state from context', () => {
    const ref = React.createRef<HTMLButtonElement>();
    const { result } = renderHook(() => useEmptySwatch_unstable({}, ref), {
      wrapper: ({ children }: { children: React.ReactNode }) => (
        <SwatchPickerProvider
          value={{
            isGrid: true,
            requestSelectionChange: jest.fn(),
            selectedValue: undefined,
            shape: 'circular',
            size: 'large',
            spacing: 'small',
          }}
        >
          {children}
        </SwatchPickerProvider>
      ),
    });

    expect(result.current.root.role).toBe('gridcell');
    expect(result.current.root['aria-checked']).toBeUndefined();
    expect(result.current.size).toBe('large');
    expect(result.current.shape).toBe('circular');
  });

  it('prefers props over context', () => {
    const ref = React.createRef<HTMLButtonElement>();
    const { result } = renderHook(() => useEmptySwatch_unstable({ shape: 'rounded', size: 'extra-small' }, ref), {
      wrapper: ({ children }: { children: React.ReactNode }) => (
        <SwatchPickerProvider
          value={{
            isGrid: false,
            requestSelectionChange: jest.fn(),
            selectedValue: undefined,
            shape: 'circular',
            size: 'large',
            spacing: 'medium',
          }}
        >
          {children}
        </SwatchPickerProvider>
      ),
    });

    expect(result.current.size).toBe('extra-small');
    expect(result.current.shape).toBe('rounded');
  });
});
