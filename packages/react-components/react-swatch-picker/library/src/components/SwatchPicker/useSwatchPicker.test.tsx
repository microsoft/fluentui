import * as React from 'react';
import { act, renderHook } from '@testing-library/react-hooks';
import { useSwatchPicker_unstable } from './useSwatchPicker';

describe('useSwatchPicker', () => {
  it('returns the default state', () => {
    const ref = React.createRef<HTMLDivElement>();
    const { result } = renderHook(() => useSwatchPicker_unstable({}, ref));

    expect(result.current.isGrid).toBe(false);
    expect(result.current.root.role).toBe('radiogroup');
    expect(result.current.root).toHaveProperty('data-tabster', expect.any(String));
    expect(result.current.size).toBe('medium');
    expect(result.current.shape).toBeUndefined();
    expect(result.current.spacing).toBe('medium');
  });

  it('returns state based on props', () => {
    const ref = React.createRef<HTMLDivElement>();
    const { result } = renderHook(() =>
      useSwatchPicker_unstable(
        {
          defaultSelectedValue: 'red',
          layout: 'grid',
          shape: 'circular',
          size: 'large',
          spacing: 'small',
        },
        ref,
      ),
    );

    expect(result.current.isGrid).toBe(true);
    expect(result.current.root.role).toBe('grid');
    expect(result.current.selectedValue).toBe('red');
    expect(result.current.shape).toBe('circular');
    expect(result.current.size).toBe('large');
    expect(result.current.spacing).toBe('small');
  });

  it('forwards requested selection changes', () => {
    const onSelectionChange = jest.fn();
    const event = {} as React.MouseEvent<HTMLButtonElement>;
    const ref = React.createRef<HTMLDivElement>();
    const { result } = renderHook(() => useSwatchPicker_unstable({ onSelectionChange }, ref));

    act(() => result.current.requestSelectionChange(event, { selectedValue: 'red', selectedSwatch: '#ff0000' }));

    expect(result.current.selectedValue).toBe('red');
    expect(onSelectionChange).toHaveBeenCalledTimes(1);
    expect(onSelectionChange).toHaveBeenCalledWith(event, {
      type: 'click',
      event,
      selectedValue: 'red',
      selectedSwatch: '#ff0000',
    });
  });
});
