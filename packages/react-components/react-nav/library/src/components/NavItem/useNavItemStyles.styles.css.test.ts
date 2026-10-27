import { renderHook } from '@testing-library/react-hooks';
import type { NavItemState } from './NavItem.types';
import { useNavItemStyles_unstable } from './useNavItemStyles.styles.css';

jest.mock('./NavItem.module.css', () => ({}));
jest.mock('../sharedNavStyles.module.css', () => ({
  contentSelected: 'css-sharedNavStyles-contentSelected',
  icon: 'css-sharedNavStyles-icon',
  indicator: 'css-sharedNavStyles-indicator',
  root: 'css-sharedNavStyles-root',
  selected: 'css-sharedNavStyles-selected',
  small: 'css-sharedNavStyles-small',
}));

const createState = (): NavItemState =>
  ({
    root: { className: 'caller-root' },
    components: { root: 'a', icon: 'span' },
    density: 'medium',
    selected: false,
    value: 'test',
    icon: { className: 'caller-icon' },
  } as NavItemState);

describe('useNavItemStyles_unstable (CSS Modules)', () => {
  it.each([
    {
      props: { density: 'small', selected: false },
      expected: ['css-sharedNavStyles-root', 'css-sharedNavStyles-small'],
    },
    {
      props: { density: 'small', selected: true },
      expected: [
        'css-sharedNavStyles-root',
        'css-sharedNavStyles-small',
        'css-sharedNavStyles-selected',
        'css-sharedNavStyles-indicator',
        'css-sharedNavStyles-contentSelected',
      ],
    },
    { props: { density: 'medium', selected: false }, expected: ['css-sharedNavStyles-root'] },
    {
      props: { density: 'medium', selected: true },
      expected: [
        'css-sharedNavStyles-root',
        'css-sharedNavStyles-selected',
        'css-sharedNavStyles-indicator',
        'css-sharedNavStyles-contentSelected',
      ],
    },
  ])('maps styled state $props to root classes', ({ props, expected }) => {
    const state = { ...createState(), ...props } as NavItemState;
    const { result } = renderHook(() => useNavItemStyles_unstable(state));
    expect(result.current).toBe(state);
    const classes = state.root.className?.split(' ');
    expect(classes).toEqual(expect.arrayContaining(['fui-NavItem', ...expected]));
    expect(classes?.[classes.length - 1]).toBe('caller-root');
    for (const className of [
      'css-sharedNavStyles-contentSelected',
      'css-sharedNavStyles-indicator',
      'css-sharedNavStyles-root',
      'css-sharedNavStyles-selected',
      'css-sharedNavStyles-small',
    ]) {
      expect(classes?.includes(className)).toBe(expected.includes(className));
    }
  });
  it('styles slots without duplicating root state classes', () => {
    const state = createState();
    renderHook(() => useNavItemStyles_unstable(state));
    expect(state.icon?.className?.split(' ')).toEqual(
      expect.arrayContaining(['fui-NavItem__icon', 'css-sharedNavStyles-icon', 'caller-icon']),
    );
    expect(state.icon?.className?.endsWith('caller-icon')).toBe(true);
    expect(state.icon?.className).not.toContain('css-sharedNavStyles-selected');
  });
  it('allows optional slots to be absent', () => {
    const state = createState();
    state.icon = undefined;
    expect(() => renderHook(() => useNavItemStyles_unstable(state))).not.toThrow();
  });
});
