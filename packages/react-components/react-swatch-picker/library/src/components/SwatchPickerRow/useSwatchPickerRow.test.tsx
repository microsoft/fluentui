import * as React from 'react';
import { renderHook } from '@testing-library/react-hooks';
import { SwatchPickerProvider } from '../../contexts/swatchPicker';
import { useSwatchPickerRow_unstable } from './useSwatchPickerRow';

describe('useSwatchPickerRow', () => {
  it('returns the default state', () => {
    const ref = React.createRef<HTMLDivElement>();
    const { result } = renderHook(() => useSwatchPickerRow_unstable({}, ref));

    expect(result.current.root.role).toBe('row');
    expect(result.current.spacing).toBe('medium');
  });

  it('uses spacing from context', () => {
    const ref = React.createRef<HTMLDivElement>();
    const { result } = renderHook(() => useSwatchPickerRow_unstable({}, ref), {
      wrapper: ({ children }: { children: React.ReactNode }) => (
        <SwatchPickerProvider
          value={{
            isGrid: true,
            requestSelectionChange: jest.fn(),
            selectedValue: undefined,
            shape: 'square',
            size: 'medium',
            spacing: 'small',
          }}
        >
          {children}
        </SwatchPickerProvider>
      ),
    });

    expect(result.current.root.role).toBe('row');
    expect(result.current.spacing).toBe('small');
  });
});
