import * as React from 'react';
import { act, renderHook } from '@testing-library/react-hooks';
import { useColorPicker_unstable } from './useColorPicker';

describe('useColorPicker', () => {
  it('returns state based on props', () => {
    const color = { h: 120, s: 0.5, v: 0.75 };
    const ref = React.createRef<HTMLDivElement>();
    const { result } = renderHook(() => useColorPicker_unstable({ color, shape: 'square' }, ref));

    expect(result.current.color).toBe(color);
    expect(result.current.shape).toBe('square');
  });

  it('forwards requested color changes', () => {
    const onColorChange = jest.fn();
    const color = { h: 240, s: 0.25, v: 0.5 };
    const event = {} as React.ChangeEvent<HTMLInputElement>;
    const ref = React.createRef<HTMLDivElement>();
    const { result } = renderHook(() => useColorPicker_unstable({ onColorChange }, ref));

    act(() => result.current.requestChange(event, { color }));

    expect(onColorChange).toHaveBeenCalledTimes(1);
    expect(onColorChange).toHaveBeenCalledWith(event, {
      type: 'change',
      event,
      color,
    });
  });
});
