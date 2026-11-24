import { renderHook } from '@testing-library/react';
import { useSlider_unstable } from './useSlider';
import type { SliderProps } from './Slider.types';
import { useSliderStyles_unstable } from './useSliderStyles.styles.css';

jest.mock('./Slider.module.css', () => ({
  root: 'css-root',
  horizontal: 'css-horizontal',
  vertical: 'css-vertical',
  small: 'css-small',
  medium: 'css-medium',
  enabled: 'css-enabled',
  disabled: 'css-disabled',
  rail: 'css-rail',
  thumb: 'css-thumb',
  input: 'css-input',
}));

const renderStyles = (props: SliderProps = {}) =>
  renderHook(() => useSliderStyles_unstable(useSlider_unstable(props, null))).result.current;

describe('useSliderStyles_unstable (CSS Modules)', () => {
  it('uses default horizontal medium styling', () => {
    const state = renderStyles();
    expect(state.root.className).toBe('fui-Slider css-root css-medium css-horizontal css-enabled');
    expect(state.rail.className).toBe('fui-Slider__rail css-rail');
    expect(state.thumb.className).toBe('fui-Slider__thumb css-thumb');
    expect(state.input.className).toBe('fui-Slider__input css-input');
  });
  it('owns disabled, size and orientation classes on root', () => {
    const state = renderStyles({ vertical: true, disabled: true, size: 'small' });
    expect(state.root.className).toBe('fui-Slider css-root css-small css-vertical css-disabled');
    expect(state.thumb.className).toBe('fui-Slider__thumb css-thumb');
    expect(state.input.className).toBe('fui-Slider__input css-input');
  });
  it('preserves all caller class names last and returns the same state', () => {
    const { result } = renderHook(() => {
      const state = useSlider_unstable(
        {
          className: 'caller-root',
          rail: { className: 'caller-rail' },
          thumb: { className: 'caller-thumb' },
          input: { className: 'caller-input' },
        },
        null,
      );
      expect(useSliderStyles_unstable(state)).toBe(state);
      return state;
    });
    expect(result.current.root.className?.split(' ').pop()).toBe('caller-root');
    expect(result.current.rail.className?.split(' ').pop()).toBe('caller-rail');
    expect(result.current.thumb.className?.split(' ').pop()).toBe('caller-thumb');
    expect(result.current.input.className?.split(' ').pop()).toBe('caller-input');
  });
});
