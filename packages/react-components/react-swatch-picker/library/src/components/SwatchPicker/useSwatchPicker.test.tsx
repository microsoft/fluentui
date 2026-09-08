import * as React from 'react';
import { act, renderHook } from '@testing-library/react-hooks';
import { useSwatchPicker_unstable } from './useSwatchPicker';

describe('useSwatchPicker', () => {
  it('uses the default size, shape and spacing', () => {
    const ref = React.createRef<HTMLDivElement>();
    const { result } = renderHook(() => useSwatchPicker_unstable({}, ref));

    expect(result.current.size).toBe('medium');
    expect(result.current.shape).toBeUndefined();
    expect(result.current.spacing).toBe('medium');
  });

  it('uses the size, shape and spacing props', () => {
    const ref = React.createRef<HTMLDivElement>();
    const { result } = renderHook(() =>
      useSwatchPicker_unstable({ shape: 'circular', size: 'large', spacing: 'small' }, ref),
    );

    expect(result.current.size).toBe('large');
    expect(result.current.shape).toBe('circular');
    expect(result.current.spacing).toBe('small');
  });

  it('uses the radiogroup role by default', () => {
    const ref = React.createRef<HTMLDivElement>();
    const { result } = renderHook(() => useSwatchPicker_unstable({}, ref));

    expect(result.current.isGrid).toBe(false);
    expect(result.current.root.role).toBe('radiogroup');
  });

  it('uses the grid role for the grid layout', () => {
    const ref = React.createRef<HTMLDivElement>();
    const { result } = renderHook(() => useSwatchPicker_unstable({ layout: 'grid' }, ref));

    expect(result.current.isGrid).toBe(true);
    expect(result.current.root.role).toBe('grid');
  });

  it('applies arrow navigation attributes by default', () => {
    const ref = React.createRef<HTMLDivElement>();
    const { result } = renderHook(() => useSwatchPicker_unstable({}, ref));

    expect(result.current.root).toHaveProperty('data-tabster', expect.any(String));
  });

  it('does not apply arrow navigation attributes when focusMode is tab', () => {
    const ref = React.createRef<HTMLDivElement>();
    const { result } = renderHook(() => useSwatchPicker_unstable({ focusMode: 'tab' }, ref));

    expect(result.current.root).not.toHaveProperty('data-tabster');
  });

  it('uses the default selected value', () => {
    const ref = React.createRef<HTMLDivElement>();
    const { result } = renderHook(() => useSwatchPicker_unstable({ defaultSelectedValue: 'red' }, ref));

    expect(result.current.selectedValue).toBe('red');
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
