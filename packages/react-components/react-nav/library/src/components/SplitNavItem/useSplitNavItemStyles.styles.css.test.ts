import { renderHook } from '@testing-library/react-hooks';
import type { SplitNavItemState } from './SplitNavItem.types';
import { useSplitNavItemStyles_unstable } from './useSplitNavItemStyles.styles.css';

jest.mock('./SplitNavItem.module.css', () => ({
  'fui-SplitNavItem__actionButton': 'css-SplitNavItem-fui-SplitNavItem__actionButton',
  'fui-SplitNavItem__menuButton': 'css-SplitNavItem-fui-SplitNavItem__menuButton',
  'fui-SplitNavItem__toggleButton': 'css-SplitNavItem-fui-SplitNavItem__toggleButton',
  medium: 'css-SplitNavItem-medium',
  navItem: 'css-SplitNavItem-navItem',
  root: 'css-SplitNavItem-root',
  secondary: 'css-SplitNavItem-secondary',
}));
jest.mock('../sharedNavStyles.module.css', () => ({
  contentSelected: 'css-sharedNavStyles-contentSelected',
  icon: 'css-sharedNavStyles-icon',
  indicator: 'css-sharedNavStyles-indicator',
  root: 'css-sharedNavStyles-root',
  selected: 'css-sharedNavStyles-selected',
  small: 'css-sharedNavStyles-small',
}));

const createState = (): SplitNavItemState =>
  ({
    root: { className: 'caller-root' },
    components: {
      root: 'div',
      navItem: 'a',
      actionButton: 'button',
      toggleButton: 'button',
      menuButton: 'button',
      actionButtonTooltip: 'div',
      toggleButtonTooltip: 'div',
      menuButtonTooltip: 'div',
    },
    density: 'medium',
    isSubNav: false,
    navItem: { className: 'caller-navItem' },
    actionButton: { className: 'caller-actionButton' },
    toggleButton: { className: 'caller-toggleButton' },
    menuButton: { className: 'caller-menuButton' },
  } as SplitNavItemState);

describe('useSplitNavItemStyles_unstable (CSS Modules)', () => {
  it.each([
    { props: { density: 'small' }, expected: ['css-sharedNavStyles-root', 'css-SplitNavItem-root'] },
    {
      props: { density: 'medium' },
      expected: ['css-sharedNavStyles-root', 'css-SplitNavItem-root', 'css-SplitNavItem-medium'],
    },
  ])('maps styled state $props to root classes', ({ props, expected }) => {
    const state = { ...createState(), ...props } as SplitNavItemState;
    const { result } = renderHook(() => useSplitNavItemStyles_unstable(state));
    expect(result.current).toBe(state);
    const classes = state.root.className?.split(' ');
    expect(classes).toEqual(expect.arrayContaining(['fui-SplitNavItem', ...expected]));
    expect(classes?.[classes.length - 1]).toBe('caller-root');
    for (const className of ['css-SplitNavItem-medium', 'css-SplitNavItem-root', 'css-sharedNavStyles-root']) {
      expect(classes?.includes(className)).toBe(expected.includes(className));
    }
  });
  it('styles slots without duplicating root state classes', () => {
    const state = createState();
    renderHook(() => useSplitNavItemStyles_unstable(state));
    expect(state.navItem?.className?.split(' ')).toEqual(
      expect.arrayContaining(['fui-SplitNavItem__navItem', 'css-SplitNavItem-navItem', 'caller-navItem']),
    );
    expect(state.navItem?.className?.endsWith('caller-navItem')).toBe(true);
    expect(state.navItem?.className).not.toContain('css-sharedNavStyles-selected');
    expect(state.actionButton?.className?.split(' ')).toEqual(
      expect.arrayContaining(['fui-SplitNavItem__actionButton', 'css-SplitNavItem-secondary', 'caller-actionButton']),
    );
    expect(state.actionButton?.className?.endsWith('caller-actionButton')).toBe(true);
    expect(state.actionButton?.className).not.toContain('css-sharedNavStyles-selected');
    expect(state.toggleButton?.className?.split(' ')).toEqual(
      expect.arrayContaining(['fui-SplitNavItem__toggleButton', 'css-SplitNavItem-secondary', 'caller-toggleButton']),
    );
    expect(state.toggleButton?.className?.endsWith('caller-toggleButton')).toBe(true);
    expect(state.toggleButton?.className).not.toContain('css-sharedNavStyles-selected');
    expect(state.menuButton?.className?.split(' ')).toEqual(
      expect.arrayContaining(['fui-SplitNavItem__menuButton', 'css-SplitNavItem-secondary', 'caller-menuButton']),
    );
    expect(state.menuButton?.className?.endsWith('caller-menuButton')).toBe(true);
    expect(state.menuButton?.className).not.toContain('css-sharedNavStyles-selected');
  });
  it('allows optional slots to be absent', () => {
    const state = createState();
    state.navItem = undefined;
    state.actionButton = undefined;
    state.toggleButton = undefined;
    state.menuButton = undefined;
    expect(() => renderHook(() => useSplitNavItemStyles_unstable(state))).not.toThrow();
  });
});
