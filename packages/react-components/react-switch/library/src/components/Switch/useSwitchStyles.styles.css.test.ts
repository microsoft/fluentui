import { renderHook } from '@testing-library/react';
import { useSwitch_unstable } from './useSwitch';
import type { SwitchProps } from './Switch.types';
import { switchClassNames, switchClassName, useSwitchStyles_unstable } from './useSwitchStyles.styles.css';

jest.mock('./Switch.module.css', () => ({
  root: 'css-root',
  above: 'css-above',
  indicator: 'css-indicator',
  withLabel: 'css-withLabel',
  small: 'css-small',
  input: 'css-input',
  'fui-Switch__indicator': 'css-fui-Switch__indicator',
  'fui-Switch__label': 'css-fui-Switch__label',
  before: 'css-before',
  after: 'css-after',
  label: 'css-label',
}));

const renderStyles = (props: SwitchProps = {}) =>
  renderHook(() => useSwitchStyles_unstable(useSwitch_unstable(props, null))).result.current;

describe('useSwitchStyles_unstable (CSS Modules)', () => {
  it('uses default label position and size', () => {
    const state = renderStyles();
    expect(state.root.className).toBe('fui-Switch css-root css-after');
    expect(state.input.className).toBe('fui-Switch__input css-input');
    expect(state.indicator.className).toBe('fui-Switch__indicator css-indicator');
    expect(state.label).toBeUndefined();
  });
  it.each(['above', 'before', 'after'] as const)('keeps %s, size and label-presence on root only', labelPosition => {
    const state = renderStyles({
      labelPosition,
      size: 'small',
      label: 'Switch',
      disabledFocusable: true,
      checked: true,
    });
    expect(state.root.className).toBe('fui-Switch css-root css-' + labelPosition + ' css-small css-withLabel');
    expect(state.input.className).toBe('fui-Switch__input css-input');
    expect(state.label?.className).toBe('fui-Switch__label css-label');
  });
  it('preserves the deprecated public class-name alias', () => {
    // eslint-disable-next-line @typescript-eslint/no-deprecated -- Verify the compatibility export.
    expect(switchClassName).toBe(switchClassNames.root);
  });
  it('preserves all caller class names last and returns the same state', () => {
    const { result } = renderHook(() => {
      const state = useSwitch_unstable(
        {
          className: 'caller-root',
          indicator: { className: 'caller-indicator' },
          input: { className: 'caller-input' },
          label: { className: 'caller-label', children: 'Label' },
        },
        null,
      );
      expect(useSwitchStyles_unstable(state)).toBe(state);
      return state;
    });
    expect(result.current.root.className?.split(' ').pop()).toBe('caller-root');
    expect(result.current.indicator.className?.split(' ').pop()).toBe('caller-indicator');
    expect(result.current.input.className?.split(' ').pop()).toBe('caller-input');
    expect(result.current.label?.className?.split(' ').pop()).toBe('caller-label');
  });
});
