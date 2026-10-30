import { renderHook } from '@testing-library/react';
import { useRangeSlider_unstable } from './useRangeSlider';
import type { RangeSliderProps } from './RangeSlider.types';
import { useRangeSliderStyles_unstable } from './useRangeSliderStyles.styles.css';

jest.mock('./RangeSlider.module.css', () => ({
  root: 'css-root',
  small: 'css-small',
  medium: 'css-medium',
  horizontal: 'css-horizontal',
  vertical: 'css-vertical',
  enabled: 'css-enabled',
  disabled: 'css-disabled',
  rail: 'css-rail',
  startThumb: 'css-startThumb',
  active: 'css-active',
  endThumb: 'css-endThumb',
  startInput: 'css-startInput',
  endInput: 'css-endInput',
}));

const renderStyles = (props: RangeSliderProps = {}) =>
  renderHook(() => useRangeSliderStyles_unstable(useRangeSlider_unstable(props, null))).result.current;

describe('useRangeSliderStyles_unstable (CSS Modules)', () => {
  it('uses default horizontal medium styling', () => {
    const state = renderStyles();
    expect(state.root.className).toBe('fui-RangeSlider css-root css-medium css-horizontal css-enabled');
    expect(state.rail.className).toBe('fui-RangeSlider__rail css-rail');
    expect(state.startThumb.className).toBe('fui-RangeSlider__startThumb css-startThumb');
    expect(state.endThumb.className).toBe('fui-RangeSlider__endThumb css-endThumb');
  });
  it('supports independently disabled thumbs without disabling the whole slider', () => {
    const state = renderStyles({ startInput: { disabled: true }, size: 'small', vertical: true });
    expect(state.root.className).toBe('fui-RangeSlider css-root css-small css-vertical css-enabled');
    expect(state.startThumb.className).toContain('css-disabled');
    expect(state.startInput.className).toContain('css-disabled');
    expect(state.endThumb.className).not.toContain('css-disabled');
  });
  it('raises only the active thumb when values overlap', () => {
    const state = renderStyles({ value: { start: 50, end: 50 } });
    expect(state.startThumb.className).toContain('css-active');
    expect(state.endThumb.className).not.toContain('css-active');
  });
  it('preserves all caller class names last and returns the same state', () => {
    const { result } = renderHook(() => {
      const state = useRangeSlider_unstable(
        {
          className: 'caller-root',
          rail: { className: 'caller-rail' },
          startThumb: { className: 'caller-startThumb' },
          endThumb: { className: 'caller-endThumb' },
          startInput: { className: 'caller-startInput' },
          endInput: { className: 'caller-endInput' },
        },
        null,
      );
      expect(useRangeSliderStyles_unstable(state)).toBe(state);
      return state;
    });
    expect(result.current.root.className?.split(' ').pop()).toBe('caller-root');
    expect(result.current.rail.className?.split(' ').pop()).toBe('caller-rail');
    expect(result.current.startThumb.className?.split(' ').pop()).toBe('caller-startThumb');
    expect(result.current.endThumb.className?.split(' ').pop()).toBe('caller-endThumb');
    expect(result.current.startInput.className?.split(' ').pop()).toBe('caller-startInput');
    expect(result.current.endInput.className?.split(' ').pop()).toBe('caller-endInput');
  });
});
