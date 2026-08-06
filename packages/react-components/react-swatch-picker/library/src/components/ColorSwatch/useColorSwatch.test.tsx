import * as React from 'react';
import { act, renderHook } from '@testing-library/react-hooks';
import { SwatchPickerProvider } from '../../contexts/swatchPicker';
import { useColorSwatch_unstable } from './useColorSwatch';

describe('useColorSwatch', () => {
  it('returns the default state', () => {
    const ref = React.createRef<HTMLButtonElement>();
    const { result } = renderHook(() => useColorSwatch_unstable({ color: '#ff0000', value: 'red' }, ref));

    expect(result.current.color).toBe('#ff0000');
    expect(result.current.value).toBe('red');
    expect(result.current.selected).toBe(false);
    expect(result.current.root.role).toBe('radio');
    expect(result.current.root['aria-checked']).toBe(false);
    expect(result.current.size).toBe('medium');
    expect(result.current.shape).toBe('square');
  });

  it('uses state from context', () => {
    const ref = React.createRef<HTMLButtonElement>();
    const { result } = renderHook(() => useColorSwatch_unstable({ color: '#ff0000', value: 'red' }, ref), {
      wrapper: ({ children }: { children: React.ReactNode }) => (
        <SwatchPickerProvider
          value={{
            isGrid: true,
            requestSelectionChange: jest.fn(),
            selectedValue: 'red',
            shape: 'circular',
            size: 'large',
            spacing: 'small',
          }}
        >
          {children}
        </SwatchPickerProvider>
      ),
    });

    expect(result.current.selected).toBe(true);
    expect(result.current.root.role).toBe('gridcell');
    expect(result.current.root['aria-selected']).toBe(true);
    expect(result.current.size).toBe('large');
    expect(result.current.shape).toBe('circular');
  });

  it('prefers props over context', () => {
    const ref = React.createRef<HTMLButtonElement>();
    const { result } = renderHook(
      () => useColorSwatch_unstable({ color: '#ff0000', shape: 'rounded', size: 'extra-small', value: 'red' }, ref),
      {
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
      },
    );

    expect(result.current.size).toBe('extra-small');
    expect(result.current.shape).toBe('rounded');
  });

  it('forwards requested selection changes', () => {
    const requestSelectionChange = jest.fn();
    const event = {} as React.MouseEvent<HTMLButtonElement>;
    const ref = React.createRef<HTMLButtonElement>();
    const { result } = renderHook(() => useColorSwatch_unstable({ color: '#ff0000', value: 'red' }, ref), {
      wrapper: ({ children }: { children: React.ReactNode }) => (
        <SwatchPickerProvider
          value={{
            isGrid: false,
            requestSelectionChange,
            selectedValue: undefined,
            shape: 'square',
            size: 'medium',
            spacing: 'medium',
          }}
        >
          {children}
        </SwatchPickerProvider>
      ),
    });

    act(() => result.current.root.onClick?.(event));

    expect(requestSelectionChange).toHaveBeenCalledTimes(1);
    expect(requestSelectionChange).toHaveBeenCalledWith(event, {
      selectedValue: 'red',
      selectedSwatch: '#ff0000',
    });
  });
});
