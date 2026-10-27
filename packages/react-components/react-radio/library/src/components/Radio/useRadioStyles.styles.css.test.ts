import { renderHook } from '@testing-library/react';
import { useRadio_unstable } from './useRadio';
import type { RadioProps } from './Radio.types';
import { useRadioStyles_unstable } from './useRadioStyles.styles.css';

jest.mock('./Radio.module.css', () => ({
  root: 'css-root',
  below: 'css-below',
  input: 'css-input',
  'fui-Radio__label': 'css-fui-Radio__label',
  'fui-Radio__indicator': 'css-fui-Radio__indicator',
  defaultIndicator: 'css-defaultIndicator',
  customIndicator: 'css-customIndicator',
  indicator: 'css-indicator',
  label: 'css-label',
  after: 'css-after',
}));

const renderStyles = (props: RadioProps = {}) =>
  renderHook(() => useRadioStyles_unstable(useRadio_unstable(props, null))).result.current;

describe('useRadioStyles_unstable (CSS Modules)', () => {
  it.each(['after', 'below'] as const)('puts label position %s on root only', labelPosition => {
    const state = renderStyles({ labelPosition, label: 'Label' });
    expect(state.root.className).toBe('fui-Radio css-root css-' + labelPosition);
    expect(state.input.className).toBe('fui-Radio__input css-input css-defaultIndicator');
    expect(state.indicator.className).toBe('fui-Radio__indicator css-indicator');
    expect(state.label?.className).toBe('fui-Radio__label css-label');
  });
  it('supports custom indicators and an absent label', () => {
    const state = renderStyles({ indicator: { children: 'Custom' } });
    expect(state.input.className).toContain('css-customIndicator');
    expect(state.input.className).not.toContain('css-defaultIndicator');
    expect(state.label).toBeUndefined();
  });
  it('preserves all caller class names last and returns the same state', () => {
    const { result } = renderHook(() => {
      const state = useRadio_unstable(
        {
          className: 'caller-root',
          indicator: { className: 'caller-indicator' },
          input: { className: 'caller-input' },
          label: { className: 'caller-label', children: 'Label' },
        },
        null,
      );
      expect(useRadioStyles_unstable(state)).toBe(state);
      return state;
    });
    expect(result.current.root.className?.split(' ').pop()).toBe('caller-root');
    expect(result.current.indicator.className?.split(' ').pop()).toBe('caller-indicator');
    expect(result.current.input.className?.split(' ').pop()).toBe('caller-input');
    expect(result.current.label?.className?.split(' ').pop()).toBe('caller-label');
  });
});
