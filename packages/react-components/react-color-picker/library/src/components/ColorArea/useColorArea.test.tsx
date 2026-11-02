import * as React from 'react';
import { renderHook } from '@testing-library/react-hooks';
import { ColorPickerProvider } from '../../contexts/colorPicker';
import { useColorArea_unstable } from './useColorArea';

describe('useColorArea', () => {
  it('uses the default shape', () => {
    const ref = React.createRef<HTMLDivElement>();
    const { result } = renderHook(() => useColorArea_unstable({}, ref));

    expect(result.current.shape).toBe('rounded');
  });

  it('uses the shape from context', () => {
    const ref = React.createRef<HTMLDivElement>();
    const { result } = renderHook(() => useColorArea_unstable({}, ref), {
      wrapper: ({ children }: { children: React.ReactNode }) => (
        <ColorPickerProvider value={{ color: undefined, shape: 'square', requestChange: jest.fn() }}>
          {children}
        </ColorPickerProvider>
      ),
    });

    expect(result.current.shape).toBe('square');
  });

  it('prefers the shape prop over context', () => {
    const ref = React.createRef<HTMLDivElement>();
    const { result } = renderHook(() => useColorArea_unstable({ shape: 'rounded' }, ref), {
      wrapper: ({ children }: { children: React.ReactNode }) => (
        <ColorPickerProvider value={{ color: undefined, shape: 'square', requestChange: jest.fn() }}>
          {children}
        </ColorPickerProvider>
      ),
    });

    expect(result.current.shape).toBe('rounded');
  });

  it('uses the shape prop', () => {
    const ref = React.createRef<HTMLDivElement>();
    const { result } = renderHook(() => useColorArea_unstable({ shape: 'square' }, ref));

    expect(result.current.shape).toBe('square');
  });
});
