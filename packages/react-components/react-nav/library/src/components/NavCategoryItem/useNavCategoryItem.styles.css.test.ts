import { renderHook } from '@testing-library/react-hooks';
import type { NavCategoryItemState } from './NavCategoryItem.types';
import { useRootStyles, useNavCategoryItemStyles_unstable } from './useNavCategoryItem.styles.css';

jest.mock('./NavCategoryItem.module.css', () => ({
  expandIcon: 'css-NavCategoryItem-expandIcon',
  root: 'css-NavCategoryItem-root',
}));
jest.mock('../sharedNavStyles.module.css', () => ({
  contentSelected: 'css-sharedNavStyles-contentSelected',
  icon: 'css-sharedNavStyles-icon',
  indicator: 'css-sharedNavStyles-indicator',
  root: 'css-sharedNavStyles-root',
  selected: 'css-sharedNavStyles-selected',
  small: 'css-sharedNavStyles-small',
}));

const createState = (): NavCategoryItemState =>
  ({
    root: { className: 'caller-root' },
    components: { root: 'button', icon: 'span', expandIcon: 'span', expandIconMotion: 'div' },
    density: 'medium',
    selected: false,
    open: false,
    value: 'test',
    icon: { className: 'caller-icon' },
    expandIcon: { className: 'caller-expandIcon' },
  } as NavCategoryItemState);

describe('useNavCategoryItemStyles_unstable (CSS Modules)', () => {
  it.each([
    {
      props: { density: 'small', selected: false, open: false },
      expected: ['css-sharedNavStyles-root', 'css-NavCategoryItem-root', 'css-sharedNavStyles-small'],
    },
    {
      props: { density: 'small', selected: false, open: true },
      expected: ['css-sharedNavStyles-root', 'css-NavCategoryItem-root', 'css-sharedNavStyles-small'],
    },
    {
      props: { density: 'small', selected: true, open: false },
      expected: [
        'css-sharedNavStyles-root',
        'css-NavCategoryItem-root',
        'css-sharedNavStyles-small',
        'css-sharedNavStyles-selected',
        'css-sharedNavStyles-indicator',
        'css-sharedNavStyles-contentSelected',
      ],
    },
    {
      props: { density: 'small', selected: true, open: true },
      expected: [
        'css-sharedNavStyles-root',
        'css-NavCategoryItem-root',
        'css-sharedNavStyles-small',
        'css-sharedNavStyles-selected',
      ],
    },
    {
      props: { density: 'medium', selected: false, open: false },
      expected: ['css-sharedNavStyles-root', 'css-NavCategoryItem-root'],
    },
    {
      props: { density: 'medium', selected: false, open: true },
      expected: ['css-sharedNavStyles-root', 'css-NavCategoryItem-root'],
    },
    {
      props: { density: 'medium', selected: true, open: false },
      expected: [
        'css-sharedNavStyles-root',
        'css-NavCategoryItem-root',
        'css-sharedNavStyles-selected',
        'css-sharedNavStyles-indicator',
        'css-sharedNavStyles-contentSelected',
      ],
    },
    {
      props: { density: 'medium', selected: true, open: true },
      expected: ['css-sharedNavStyles-root', 'css-NavCategoryItem-root', 'css-sharedNavStyles-selected'],
    },
  ])('maps styled state $props to root classes', ({ props, expected }) => {
    const state = { ...createState(), ...props } as NavCategoryItemState;
    const { result } = renderHook(() => useNavCategoryItemStyles_unstable(state));
    expect(result.current).toBe(state);
    const classes = state.root.className?.split(' ');
    expect(classes).toEqual(expect.arrayContaining(['fui-NavCategoryItem', ...expected]));
    expect(classes?.[classes.length - 1]).toBe('caller-root');
    for (const className of [
      'css-NavCategoryItem-root',
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
    renderHook(() => useNavCategoryItemStyles_unstable(state));
    expect(state.expandIcon?.className?.split(' ')).toEqual(
      expect.arrayContaining([
        'fui-NavCategoryItem__expandIcon',
        'css-NavCategoryItem-expandIcon',
        'caller-expandIcon',
      ]),
    );
    expect(state.expandIcon?.className?.endsWith('caller-expandIcon')).toBe(true);
    expect(state.expandIcon?.className).not.toContain('css-sharedNavStyles-selected');
    expect(state.icon?.className?.split(' ')).toEqual(
      expect.arrayContaining(['fui-NavCategoryItem__icon', 'css-sharedNavStyles-icon', 'caller-icon']),
    );
    expect(state.icon?.className?.endsWith('caller-icon')).toBe(true);
    expect(state.icon?.className).not.toContain('css-sharedNavStyles-selected');
  });
  it('allows optional slots to be absent', () => {
    const state = createState();
    state.icon = undefined;
    expect(() => renderHook(() => useNavCategoryItemStyles_unstable(state))).not.toThrow();
  });
});

describe('useRootStyles helper', () => {
  it('returns only the root class map', () => {
    expect(renderHook(() => useRootStyles()).result.current).toEqual({ base: 'css-NavCategoryItem-root' });
  });
});
