import * as React from 'react';
import { act, renderHook } from '@testing-library/react-hooks';
import { SwatchPickerProvider } from '../../contexts/swatchPicker';
import { useImageSwatch_unstable } from './useImageSwatch';

describe('useImageSwatch', () => {
  it('returns the default state', () => {
    const ref = React.createRef<HTMLButtonElement>();
    const { result } = renderHook(() => useImageSwatch_unstable({ src: 'image.png', value: 'image' }, ref));

    expect(result.current.value).toBe('image');
    expect(result.current.selected).toBe(false);
    expect(result.current.root.role).toBe('radio');
    expect(result.current.root['aria-checked']).toBe(false);
    expect(result.current.size).toBe('medium');
    expect(result.current.shape).toBe('square');
  });

  it('uses state from context', () => {
    const ref = React.createRef<HTMLButtonElement>();
    const { result } = renderHook(() => useImageSwatch_unstable({ src: 'image.png', value: 'image' }, ref), {
      wrapper: ({ children }: { children: React.ReactNode }) => (
        <SwatchPickerProvider
          value={{
            isGrid: true,
            requestSelectionChange: jest.fn(),
            selectedValue: 'image',
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

  it('uses context over props', () => {
    const ref = React.createRef<HTMLButtonElement>();
    const { result } = renderHook(
      () => useImageSwatch_unstable({ shape: 'rounded', size: 'extra-small', src: 'image.png', value: 'image' }, ref),
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

    expect(result.current.size).toBe('large');
    expect(result.current.shape).toBe('circular');
  });

  it('forwards requested selection changes', () => {
    const requestSelectionChange = jest.fn();
    const event = {} as React.MouseEvent<HTMLButtonElement>;
    const ref = React.createRef<HTMLButtonElement>();
    const { result } = renderHook(() => useImageSwatch_unstable({ src: 'image.png', value: 'image' }, ref), {
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
      selectedValue: 'image',
      selectedSwatch: 'image.png',
    });
  });
});
