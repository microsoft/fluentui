import { renderHook } from '@testing-library/react';
import { useSelect_unstable } from './useSelect';
import type { SelectProps } from './Select.types';
import { useSelectStyles_unstable } from './useSelectStyles.styles.css';

jest.mock('./Select.module.css', () => ({
  root: 'css-root',
  select: 'css-select',
  small: 'css-small',
  medium: 'css-medium',
  large: 'css-large',
  outline: 'css-outline',
  underline: 'css-underline',
  'filled-lighter': 'css-filled-lighter',
  'filled-darker': 'css-filled-darker',
  disabled: 'css-disabled',
  invalid: 'css-invalid',
  icon: 'css-icon',
}));

const renderStyles = (props: SelectProps = {}) =>
  renderHook(() => useSelectStyles_unstable(useSelect_unstable(props, null))).result.current;

describe('useSelectStyles_unstable (CSS Modules)', () => {
  it('uses default size and appearance', () => {
    const state = renderStyles();
    expect(state.root.className).toBe('fui-Select css-root css-medium css-outline');
    expect(state.select.className).toBe('fui-Select__select css-select');
    expect(state.icon?.className).toBe('fui-Select__icon css-icon');
  });
  it.each(['outline', 'underline', 'filled-darker', 'filled-lighter'] as const)(
    'keeps %s, size, disabled and invalid on root only',
    appearance => {
      const state = renderStyles({ appearance, size: 'small', disabled: true, 'aria-invalid': 'true' });
      expect(state.root.className).toBe(
        'fui-Select css-root css-small css-' + appearance + ' css-disabled css-invalid',
      );
      expect(state.select.className).toBe('fui-Select__select css-select');
      expect(state.icon?.className).toBe('fui-Select__icon css-icon');
    },
  );
  it('allows an absent icon and ignores non-true aria-invalid', () => {
    const state = renderStyles({ icon: null, 'aria-invalid': 'grammar' });
    expect(state.icon).toBeUndefined();
    expect(state.root.className).not.toContain('css-invalid');
  });
  it('preserves all caller class names last and returns the same state', () => {
    const { result } = renderHook(() => {
      const state = useSelect_unstable(
        { className: 'caller-root', select: { className: 'caller-select' }, icon: { className: 'caller-icon' } },
        null,
      );
      expect(useSelectStyles_unstable(state)).toBe(state);
      return state;
    });
    expect(result.current.root.className?.split(' ').pop()).toBe('caller-root');
    expect(result.current.select.className?.split(' ').pop()).toBe('caller-select');
    expect(result.current.icon?.className?.split(' ').pop()).toBe('caller-icon');
  });
});
