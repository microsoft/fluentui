import * as React from 'react';
import { act, renderHook } from '@testing-library/react-hooks';
import { SwatchPickerProvider, swatchPickerContextDefaultValue } from '../../contexts/swatchPicker';
import type { SwatchPickerContextValue } from '../../contexts/swatchPicker';
import { useImageSwatch_unstable } from './useImageSwatch';

const props = { src: 'image.png', value: 'image' };

const createWrapper =
  (value: Partial<SwatchPickerContextValue>) =>
  ({ children }: { children: React.ReactNode }) =>
    <SwatchPickerProvider value={{ ...swatchPickerContextDefaultValue, ...value }}>{children}</SwatchPickerProvider>;

describe('useImageSwatch', () => {
  it('uses the default size and shape', () => {
    const ref = React.createRef<HTMLButtonElement>();
    const { result } = renderHook(() => useImageSwatch_unstable(props, ref));

    expect(result.current.size).toBe('medium');
    expect(result.current.shape).toBe('square');
  });

  it('uses the size and shape from context', () => {
    const ref = React.createRef<HTMLButtonElement>();
    const { result } = renderHook(() => useImageSwatch_unstable(props, ref), {
      wrapper: createWrapper({ shape: 'circular', size: 'large' }),
    });

    expect(result.current.size).toBe('large');
    expect(result.current.shape).toBe('circular');
  });

  it('prefers the size and shape from context over props', () => {
    const ref = React.createRef<HTMLButtonElement>();
    const { result } = renderHook(
      () => useImageSwatch_unstable({ ...props, shape: 'rounded', size: 'extra-small' }, ref),
      { wrapper: createWrapper({ shape: 'circular', size: 'large' }) },
    );

    expect(result.current.size).toBe('large');
    expect(result.current.shape).toBe('circular');
  });

  it('uses the radio role outside of a grid', () => {
    const ref = React.createRef<HTMLButtonElement>();
    const { result } = renderHook(() => useImageSwatch_unstable(props, ref));

    expect(result.current.root.role).toBe('radio');
    expect(result.current.root['aria-checked']).toBe(false);
  });

  it('uses the gridcell role inside a grid', () => {
    const ref = React.createRef<HTMLButtonElement>();
    const { result } = renderHook(() => useImageSwatch_unstable(props, ref), {
      wrapper: createWrapper({ isGrid: true }),
    });

    expect(result.current.root.role).toBe('gridcell');
    expect(result.current.root['aria-selected']).toBe(false);
  });

  it('uses the selected value from context', () => {
    const ref = React.createRef<HTMLButtonElement>();
    const { result } = renderHook(() => useImageSwatch_unstable(props, ref), {
      wrapper: createWrapper({ selectedValue: 'image' }),
    });

    expect(result.current.selected).toBe(true);
    expect(result.current.root['aria-checked']).toBe(true);
  });

  it('forwards requested selection changes', () => {
    const requestSelectionChange = jest.fn();
    const event = {} as React.MouseEvent<HTMLButtonElement>;
    const ref = React.createRef<HTMLButtonElement>();
    const { result } = renderHook(() => useImageSwatch_unstable(props, ref), {
      wrapper: createWrapper({ requestSelectionChange }),
    });

    act(() => result.current.root.onClick?.(event));

    expect(requestSelectionChange).toHaveBeenCalledTimes(1);
    expect(requestSelectionChange).toHaveBeenCalledWith(event, {
      selectedValue: 'image',
      selectedSwatch: 'image.png',
    });
  });
});
