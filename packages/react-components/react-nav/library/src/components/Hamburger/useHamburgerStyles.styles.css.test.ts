import { renderHook } from '@testing-library/react-hooks';
import type { HamburgerState } from './Hamburger.types';
import { useHamburgerStyles_unstable } from './useHamburgerStyles.styles.css';
import { useButtonStyles_unstable } from '@fluentui/react-button';

jest.mock('./Hamburger.module.css', () => ({ root: 'css-Hamburger-root' }));
jest.mock('@fluentui/react-button', () => ({
  // eslint-disable-next-line @typescript-eslint/naming-convention
  useButtonStyles_unstable: jest.fn(),
}));

const createState = (): HamburgerState =>
  ({
    root: { className: 'caller-root' },
    components: { root: 'button', icon: 'span' },
    appearance: 'subtle',
    disabled: false,
    disabledFocusable: false,
    iconPosition: 'before',
    shape: 'rounded',
    size: 'medium',
    iconOnly: true,
    icon: { className: 'caller-icon' },
  } as HamburgerState);

describe('useHamburgerStyles_unstable (CSS Modules)', () => {
  it.each([{ props: {}, expected: ['css-Hamburger-root'] }])(
    'maps styled state $props to root classes',
    ({ props, expected }) => {
      const state = { ...createState(), ...props } as HamburgerState;
      const { result } = renderHook(() => useHamburgerStyles_unstable(state));
      expect(result.current).toBe(state);
      const classes = state.root.className?.split(' ');
      expect(classes).toEqual(expect.arrayContaining(['fui-Hamburger', ...expected]));
      expect(classes?.[classes.length - 1]).toBe('caller-root');
      for (const className of ['css-Hamburger-root']) {
        expect(classes?.includes(className)).toBe(expected.includes(className));
      }
      expect(useButtonStyles_unstable).toHaveBeenCalledWith(state);
    },
  );
  it('styles slots without duplicating root state classes', () => {
    const state = createState();
    renderHook(() => useHamburgerStyles_unstable(state));
    expect(state.icon?.className?.split(' ')).toEqual(expect.arrayContaining(['fui-Hamburger__icon', 'caller-icon']));
    expect(state.icon?.className?.endsWith('caller-icon')).toBe(true);
    expect(state.icon?.className).not.toContain('css-sharedNavStyles-selected');
  });
  it('allows optional slots to be absent', () => {
    const state = createState();
    state.icon = undefined;
    expect(() => renderHook(() => useHamburgerStyles_unstable(state))).not.toThrow();
  });
});
