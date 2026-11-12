import { renderHook } from '@testing-library/react';
import { useSpinner_unstable } from './useSpinner';
import type { SpinnerProps } from './Spinner.types';
import { useSpinnerStyles_unstable } from './useSpinnerStyles.styles.css';

jest.mock('./Spinner.module.css', () => ({
  root: 'css-root',
  above: 'css-above',
  below: 'css-below',
  spinner: 'css-spinner',
  spinnerTail: 'css-spinnerTail',
  inverted: 'css-inverted',
  rtlTail: 'css-rtlTail',
  'extra-tiny': 'css-extra-tiny',
  label: 'css-label',
  tiny: 'css-tiny',
  'extra-small': 'css-extra-small',
  small: 'css-small',
  medium: 'css-medium',
  large: 'css-large',
  'extra-large': 'css-extra-large',
  huge: 'css-huge',
}));

const renderStyles = (props: SpinnerProps = {}) =>
  renderHook(() => useSpinnerStyles_unstable(useSpinner_unstable(props, null))).result.current;

describe('useSpinnerStyles_unstable (CSS Modules)', () => {
  it('uses default appearance, orientation and size', () => {
    const state = renderStyles({ label: 'Loading' });
    expect(state.root.className).toBe('fui-Spinner css-root css-medium');
    expect(state.spinner?.className).toBe('fui-Spinner__spinner css-spinner');
    expect(state.spinnerTail?.className).toBe('fui-Spinner__spinnerTail css-spinnerTail');
    expect(state.label?.className).toBe('fui-Spinner__label css-label');
  });
  it.each(['extra-tiny', 'tiny', 'extra-small', 'small', 'medium', 'large', 'extra-large', 'huge'] as const)(
    'maps size %s and inverted appearance on root only',
    size => {
      const state = renderStyles({ size, appearance: 'inverted', labelPosition: 'above', label: 'Loading' });
      expect(state.root.className).toBe('fui-Spinner css-root css-above css-' + size + ' css-inverted');
      expect(state.label?.className).toBe('fui-Spinner__label css-label');
    },
  );
  it('guards absent spinner and label slots', () => {
    const state = renderStyles({ spinner: null });
    expect(state.spinner).toBeUndefined();
    expect(state.label).toBeUndefined();
  });
  it('preserves all caller class names last and returns the same state', () => {
    const { result } = renderHook(() => {
      const state = useSpinner_unstable(
        {
          className: 'caller-root',
          spinner: { className: 'caller-spinner' },
          spinnerTail: { className: 'caller-spinnerTail' },
          label: { className: 'caller-label', children: 'Label' },
        },
        null,
      );
      expect(useSpinnerStyles_unstable(state)).toBe(state);
      return state;
    });
    expect(result.current.root.className?.split(' ').pop()).toBe('caller-root');
    expect(result.current.spinner?.className?.split(' ').pop()).toBe('caller-spinner');
    expect(result.current.spinnerTail?.className?.split(' ').pop()).toBe('caller-spinnerTail');
    expect(result.current.label?.className?.split(' ').pop()).toBe('caller-label');
  });
});
