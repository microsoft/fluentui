import { renderHook } from '@testing-library/react';
import { useProgressBar_unstable } from './useProgressBar';
import type { ProgressBarProps } from './ProgressBar.types';
import { useProgressBarStyles_unstable } from './useProgressBarStyles.styles.css';

jest.mock('./ProgressBar.module.css', () => ({
  root: 'css-root',
  rounded: 'css-rounded',
  square: 'css-square',
  medium: 'css-medium',
  large: 'css-large',
  bar: 'css-bar',
  indeterminate: 'css-indeterminate',
  nonZeroDeterminate: 'css-nonZeroDeterminate',
  error: 'css-error',
  warning: 'css-warning',
  success: 'css-success',
}));

const renderStyles = (props: ProgressBarProps = {}) =>
  renderHook(() => useProgressBarStyles_unstable(useProgressBar_unstable(props, null))).result.current;

describe('useProgressBarStyles_unstable (CSS Modules)', () => {
  it('uses the default shape and thickness, and leaves indeterminate width to motion', () => {
    const state = renderStyles();
    expect(state.root.className).toBe('fui-ProgressBar css-root css-rounded css-medium');
    expect(state.bar?.className).toBe('fui-ProgressBar__bar css-bar css-indeterminate');
    expect(state.bar?.style?.width).toBeUndefined();
  });
  it.each(['error', 'warning', 'success'] as const)(
    'maps determinate color %s without propagating root state classes',
    color => {
      const state = renderStyles({ color, value: 0.5, max: 2, shape: 'square', thickness: 'large' });
      expect(state.root.className).toBe('fui-ProgressBar css-root css-square css-large');
      expect(state.bar?.className).toBe('fui-ProgressBar__bar css-bar css-nonZeroDeterminate css-' + color);
      expect(state.bar?.style?.width).toBe('25%');
    },
  );
  it('does not transition near zero and preserves caller width', () => {
    const state = renderStyles({ value: 0.001, bar: { style: { width: '13%' } } });
    expect(state.bar?.className).not.toContain('css-nonZeroDeterminate');
    expect(state.bar?.style?.width).toBe('13%');
  });
  it('preserves all caller class names last and returns the same state', () => {
    const { result } = renderHook(() => {
      const state = useProgressBar_unstable({ className: 'caller-root', bar: { className: 'caller-bar' } }, null);
      expect(useProgressBarStyles_unstable(state)).toBe(state);
      return state;
    });
    expect(result.current.root.className?.split(' ').pop()).toBe('caller-root');
    expect(result.current.bar?.className?.split(' ').pop()).toBe('caller-bar');
  });
});
