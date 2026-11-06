import { renderHook } from '@testing-library/react-hooks';
import type { NavSubItemState } from './NavSubItem.types';
import { useNavSubItemStyles_unstable } from './useNavSubItemStyles.styles.css';

jest.mock('./NavSubItem.module.css', () => ({ root: 'css-NavSubItem-root', selected: 'css-NavSubItem-selected' }));
jest.mock('../sharedNavStyles.module.css', () => ({
  contentSelected: 'css-sharedNavStyles-contentSelected',
  icon: 'css-sharedNavStyles-icon',
  indicator: 'css-sharedNavStyles-indicator',
  root: 'css-sharedNavStyles-root',
  selected: 'css-sharedNavStyles-selected',
  small: 'css-sharedNavStyles-small',
}));

const createState = (): NavSubItemState =>
  ({
    root: { className: 'caller-root' },
    components: { root: 'a' },
    density: 'medium',
    selected: false,
    value: 'test',
  } as NavSubItemState);

describe('useNavSubItemStyles_unstable (CSS Modules)', () => {
  it.each([
    {
      props: { density: 'small', selected: false },
      expected: ['css-sharedNavStyles-root', 'css-NavSubItem-root', 'css-sharedNavStyles-small'],
    },
    {
      props: { density: 'small', selected: true },
      expected: [
        'css-sharedNavStyles-root',
        'css-NavSubItem-root',
        'css-sharedNavStyles-small',
        'css-sharedNavStyles-selected',
        'css-sharedNavStyles-indicator',
        'css-sharedNavStyles-contentSelected',
        'css-NavSubItem-selected',
      ],
    },
    { props: { density: 'medium', selected: false }, expected: ['css-sharedNavStyles-root', 'css-NavSubItem-root'] },
    {
      props: { density: 'medium', selected: true },
      expected: [
        'css-sharedNavStyles-root',
        'css-NavSubItem-root',
        'css-sharedNavStyles-selected',
        'css-sharedNavStyles-indicator',
        'css-sharedNavStyles-contentSelected',
        'css-NavSubItem-selected',
      ],
    },
  ])('maps styled state $props to root classes', ({ props, expected }) => {
    const state = { ...createState(), ...props } as NavSubItemState;
    const { result } = renderHook(() => useNavSubItemStyles_unstable(state));
    expect(result.current).toBe(state);
    const classes = state.root.className?.split(' ');
    expect(classes).toEqual(expect.arrayContaining(['fui-NavSubItem', ...expected]));
    expect(classes?.[classes.length - 1]).toBe('caller-root');
    for (const className of [
      'css-NavSubItem-root',
      'css-NavSubItem-selected',
      'css-sharedNavStyles-contentSelected',
      'css-sharedNavStyles-indicator',
      'css-sharedNavStyles-root',
      'css-sharedNavStyles-selected',
      'css-sharedNavStyles-small',
    ]) {
      expect(classes?.includes(className)).toBe(expected.includes(className));
    }
  });
});
