import * as React from 'react';
import { renderHook } from '@testing-library/react-hooks';
import { SwatchPickerProvider, swatchPickerContextDefaultValue } from '../../contexts/swatchPicker';
import { useSwatchPickerRow_unstable } from './useSwatchPickerRow';

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <SwatchPickerProvider value={{ ...swatchPickerContextDefaultValue, spacing: 'small' }}>
    {children}
  </SwatchPickerProvider>
);

describe('useSwatchPickerRow', () => {
  it('uses the row role', () => {
    const ref = React.createRef<HTMLDivElement>();
    const { result } = renderHook(() => useSwatchPickerRow_unstable({}, ref));

    expect(result.current.root.role).toBe('row');
  });

  it('forwards style to the root', () => {
    const ref = React.createRef<HTMLDivElement>();
    const style = { outlineColor: 'rgb(1, 2, 3)' };
    const { result } = renderHook(() => useSwatchPickerRow_unstable({ style }, ref));

    expect(result.current.root.style).toEqual(style);
  });

  it('uses the default spacing', () => {
    const ref = React.createRef<HTMLDivElement>();
    const { result } = renderHook(() => useSwatchPickerRow_unstable({}, ref));

    expect(result.current.spacing).toBe('medium');
  });

  it('uses the spacing from context', () => {
    const ref = React.createRef<HTMLDivElement>();
    const { result } = renderHook(() => useSwatchPickerRow_unstable({}, ref), { wrapper });

    expect(result.current.spacing).toBe('small');
  });
});
