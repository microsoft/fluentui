import { renderHook } from '@testing-library/react';
import { useSpinButton_unstable } from './useSpinButton';
import type { SpinButtonProps } from './SpinButton.types';
import { useSpinButtonStyles_unstable } from './useSpinButtonStyles.styles.css';

jest.mock('./SpinButton.module.css', () => ({
  medium: 'css-medium',
  root: 'css-root',
  small: 'css-small',
  underline: 'css-underline',
  filled: 'css-filled',
  'filled-darker': 'css-filled-darker',
  'filled-lighter': 'css-filled-lighter',
  outline: 'css-outline',
  disabled: 'css-disabled',
  invalid: 'css-invalid',
  input: 'css-input',
  incrementButton: 'css-incrementButton',
  decrementButton: 'css-decrementButton',
  'fui-SpinButton__button_active': 'css-fui-SpinButton__button_active',
}));

const renderStyles = (props: SpinButtonProps = {}) =>
  renderHook(() => useSpinButtonStyles_unstable(useSpinButton_unstable(props, null))).result.current;

describe('useSpinButtonStyles_unstable (CSS Modules)', () => {
  it('uses default size and appearance', () => {
    const state = renderStyles();
    expect(state.root.className).toBe('fui-SpinButton css-root css-medium css-outline');
    expect(state.input.className).toBe('fui-SpinButton__input css-input');
    expect(state.incrementButton.className).toBe('fui-SpinButton__incrementButton css-incrementButton');
    expect(state.decrementButton.className).toBe('fui-SpinButton__decrementButton css-decrementButton');
  });
  it.each(['outline', 'underline', 'filled-darker', 'filled-lighter'] as const)(
    'maps %s with disabled, invalid and size on root only',
    appearance => {
      const state = renderStyles({ appearance, size: 'small', disabled: true, 'aria-invalid': true });
      expect(state.root.className).toContain('css-' + appearance);
      expect(state.root.className).toContain('css-disabled css-invalid');
      expect(state.root.className).toContain('css-small');
      expect(state.incrementButton.className).toBe('fui-SpinButton__incrementButton css-incrementButton');
    },
  );
  it.each(['up', 'down'] as const)('preserves the public active-button class for %s', spinState => {
    const { result } = renderHook(() => {
      const state = useSpinButton_unstable({}, null);
      return useSpinButtonStyles_unstable({ ...state, spinState });
    });
    const slot = spinState === 'up' ? result.current.incrementButton : result.current.decrementButton;
    expect(slot.className).toContain('fui-SpinButton__button_active');
  });
  it('preserves all caller class names last and returns the same state', () => {
    const { result } = renderHook(() => {
      const state = useSpinButton_unstable(
        {
          className: 'caller-root',
          input: { className: 'caller-input' },
          incrementButton: { className: 'caller-incrementButton' },
          decrementButton: { className: 'caller-decrementButton' },
        },
        null,
      );
      expect(useSpinButtonStyles_unstable(state)).toBe(state);
      return state;
    });
    expect(result.current.root.className?.split(' ').pop()).toBe('caller-root');
    expect(result.current.input.className?.split(' ').pop()).toBe('caller-input');
    expect(result.current.incrementButton.className?.split(' ').pop()).toBe('caller-incrementButton');
    expect(result.current.decrementButton.className?.split(' ').pop()).toBe('caller-decrementButton');
  });
});
