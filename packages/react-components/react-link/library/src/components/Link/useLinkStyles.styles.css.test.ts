import { renderHook } from '@testing-library/react-hooks';
import { useLink_unstable } from './useLink';
import { useLinkStyles_unstable as applyStyles } from './useLinkStyles.styles.css';

jest.mock('./Link.module.css', () => ({
  brand: 'css-brand',
  button: 'css-button',
  disabled: 'css-disabled',
  href: 'css-href',
  inline: 'css-inline',
  inverted: 'css-inverted',
  root: 'css-root',
  subtle: 'css-subtle',
}));

describe('useLinkStyles_unstable (CSS Modules)', () => {
  it('uses the default state without changing the state identity', () => {
    const { result } = renderHook(() => useLink_unstable({}, null));
    const state = result.current;

    expect(applyStyles(state)).toBe(state);
    expect(state.root.className).toBe('fui-Link css-root css-button');
  });

  it('preserves caller classes last on every present slot', () => {
    const { result } = renderHook(() => useLink_unstable({ className: 'caller-root' }, null));
    const state = applyStyles(result.current);

    expect(state.root.className?.endsWith(' caller-root')).toBe(true);
  });

  it('keeps anchor font inheritance and inline styling', () => {
    const { result } = renderHook(() =>
      useLink_unstable({ href: '#target', inline: true, appearance: 'subtle' }, null),
    );
    expect(applyStyles(result.current).root.className).toBe('fui-Link css-root css-href css-subtle css-inline');
  });

  it.each(['inverted', 'brand'] as const)(
    'preserves the %s background appearance with disabled-focusable styling',
    backgroundAppearance => {
      const { result } = renderHook(() => useLink_unstable({ disabledFocusable: true, appearance: 'subtle' }, null));
      const state = result.current;
      state.backgroundAppearance = backgroundAppearance;
      expect(applyStyles(state).root.className).toBe(
        `fui-Link css-root css-button css-subtle css-${backgroundAppearance} css-disabled`,
      );
    },
  );
});
