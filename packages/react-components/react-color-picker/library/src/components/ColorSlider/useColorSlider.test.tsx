import * as React from 'react';
import { renderHook } from '@testing-library/react-hooks';
import { ColorPickerProvider } from '../../contexts/colorPicker';
import { useColorSlider_unstable } from './useColorSlider';
import { colorSliderCSSVars } from './ColorSlider.constants';

describe('useColorSlider', () => {
  it('uses the default shape', () => {
    const ref = React.createRef<HTMLInputElement>();
    const { result } = renderHook(() => useColorSlider_unstable({}, ref));

    expect(result.current.shape).toBe('rounded');
  });

  it('uses the shape from context', () => {
    const ref = React.createRef<HTMLInputElement>();
    const { result } = renderHook(() => useColorSlider_unstable({}, ref), {
      wrapper: ({ children }: { children: React.ReactNode }) => (
        <ColorPickerProvider value={{ color: undefined, shape: 'square', requestChange: jest.fn() }}>
          {children}
        </ColorPickerProvider>
      ),
    });

    expect(result.current.shape).toBe('square');
  });

  it('prefers the shape prop over context', () => {
    const ref = React.createRef<HTMLInputElement>();
    const { result } = renderHook(() => useColorSlider_unstable({ shape: 'rounded' }, ref), {
      wrapper: ({ children }: { children: React.ReactNode }) => (
        <ColorPickerProvider value={{ color: undefined, shape: 'square', requestChange: jest.fn() }}>
          {children}
        </ColorPickerProvider>
      ),
    });

    expect(result.current.shape).toBe('rounded');
  });

  it('uses the shape prop', () => {
    const ref = React.createRef<HTMLInputElement>();
    const { result } = renderHook(() => useColorSlider_unstable({ shape: 'square' }, ref));

    expect(result.current.shape).toBe('square');
  });

  it.each(['hue', 'saturation'] as const)('uses valid HSL syntax for the %s channel', channel => {
    const ref = React.createRef<HTMLInputElement>();
    const { result } = renderHook(() => useColorSlider_unstable({ channel, color: { h: 0, s: 1, v: 1, a: 1 } }, ref));

    expect(result.current.root.style).toMatchObject({
      [colorSliderCSSVars.thumbColorVar]: channel === 'hue' ? 'hsl(0, 100%, 50%)' : 'hsla(0, 100%, 50%, 1)',
      [colorSliderCSSVars.railColorVar]: 'hsl(0, 100%, 50%)',
    });
  });
});
