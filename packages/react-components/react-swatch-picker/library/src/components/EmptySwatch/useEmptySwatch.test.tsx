import * as React from 'react';
import { renderHook } from '@testing-library/react-hooks';
import { SwatchPickerProvider, swatchPickerContextDefaultValue } from '../../contexts/swatchPicker';
import type { SwatchPickerContextValue } from '../../contexts/swatchPicker';
import { useEmptySwatch_unstable } from './useEmptySwatch';

const createWrapper =
  (value: Partial<SwatchPickerContextValue>) =>
  ({ children }: { children: React.ReactNode }) =>
    <SwatchPickerProvider value={{ ...swatchPickerContextDefaultValue, ...value }}>{children}</SwatchPickerProvider>;

describe('useEmptySwatch', () => {
  it('uses the default size and shape', () => {
    const ref = React.createRef<HTMLButtonElement>();
    const { result } = renderHook(() => useEmptySwatch_unstable({}, ref));

    expect(result.current.size).toBe('medium');
    expect(result.current.shape).toBe('square');
  });

  it('uses the size and shape from context', () => {
    const ref = React.createRef<HTMLButtonElement>();
    const { result } = renderHook(() => useEmptySwatch_unstable({}, ref), {
      wrapper: createWrapper({ shape: 'circular', size: 'large' }),
    });

    expect(result.current.size).toBe('large');
    expect(result.current.shape).toBe('circular');
  });

  it('prefers the size and shape props over context', () => {
    const ref = React.createRef<HTMLButtonElement>();
    const { result } = renderHook(() => useEmptySwatch_unstable({ shape: 'rounded', size: 'extra-small' }, ref), {
      wrapper: createWrapper({ shape: 'circular', size: 'large' }),
    });

    expect(result.current.size).toBe('extra-small');
    expect(result.current.shape).toBe('rounded');
  });

  it('uses the radio role outside of a grid', () => {
    const ref = React.createRef<HTMLButtonElement>();
    const { result } = renderHook(() => useEmptySwatch_unstable({}, ref));

    expect(result.current.root.role).toBe('radio');
    expect(result.current.root['aria-checked']).toBe(false);
  });

  it('uses the gridcell role inside a grid', () => {
    const ref = React.createRef<HTMLButtonElement>();
    const { result } = renderHook(() => useEmptySwatch_unstable({}, ref), {
      wrapper: createWrapper({ isGrid: true }),
    });

    expect(result.current.root.role).toBe('gridcell');
    expect(result.current.root['aria-checked']).toBeUndefined();
  });
});
