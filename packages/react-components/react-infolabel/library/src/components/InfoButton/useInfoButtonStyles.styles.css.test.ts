import { renderHook } from '@testing-library/react-hooks';
import { useInfoButton_unstable } from './useInfoButton';
import { useInfoButtonStyles_unstable as applyStyles } from './useInfoButtonStyles.styles.css';

jest.mock('./InfoButton.module.css', () => ({
  css: 'css-css',
  info: 'css-info',
  large: 'css-large',
  medium: 'css-medium',
  open: 'css-open',
  root: 'css-root',
  small: 'css-small',
}));

describe('useInfoButtonStyles_unstable (CSS Modules)', () => {
  it('uses the default state without changing the state identity', () => {
    const { result } = renderHook(() => useInfoButton_unstable({}, null));
    const state = result.current;

    expect(applyStyles(state)).toBe(state);
    expect(state.root.className).toBe('fui-InfoButton css-root css-medium');
  });

  it('preserves caller classes last on every present slot', () => {
    const { result } = renderHook(() =>
      useInfoButton_unstable({ className: 'caller-root', info: { className: 'caller-info' } }, null),
    );
    const state = applyStyles(result.current);

    expect(state.root.className?.endsWith(' caller-root')).toBe(true);
    expect(state.info?.className?.endsWith(' caller-info')).toBe(true);
  });

  it.each(['small', 'medium', 'large'] as const)(
    'styles the trigger and the independently portaled %s surface',
    size => {
      for (const open of [false, true]) {
        const { result } = renderHook(() => useInfoButton_unstable({ size, popover: { open } }, null));
        const state = applyStyles(result.current);
        expect(state.root.className).toBe(`fui-InfoButton css-root css-${size}${open ? ' css-open' : ''}`);
        expect(state.info.className).toBe(`fui-InfoButton__info css-info css-${size}`);
      }
    },
  );
});
