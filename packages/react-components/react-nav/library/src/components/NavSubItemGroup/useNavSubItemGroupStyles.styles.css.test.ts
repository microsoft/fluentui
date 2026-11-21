import { renderHook } from '@testing-library/react-hooks';
import type { NavSubItemGroupState } from './NavSubItemGroup.types';
import { useNavSubItemGroupStyles_unstable } from './useNavSubItemGroupStyles.styles.css';

jest.mock('./NavSubItemGroup.module.css', () => ({ root: 'css-NavSubItemGroup-root' }));

const createState = (): NavSubItemGroupState =>
  ({
    root: { className: 'caller-root' },
    components: { root: 'div', collapseMotion: 'div' },
    open: false,
  } as NavSubItemGroupState);

describe('useNavSubItemGroupStyles_unstable (CSS Modules)', () => {
  it.each([{ props: {}, expected: ['css-NavSubItemGroup-root'] }])(
    'maps styled state $props to root classes',
    ({ props, expected }) => {
      const state = { ...createState(), ...props } as NavSubItemGroupState;
      const { result } = renderHook(() => useNavSubItemGroupStyles_unstable(state));
      expect(result.current).toBe(state);
      const classes = state.root.className?.split(' ');
      expect(classes).toEqual(expect.arrayContaining(['fui-NavSubItemGroup', ...expected]));
      expect(classes?.[classes.length - 1]).toBe('caller-root');
      for (const className of ['css-NavSubItemGroup-root']) {
        expect(classes?.includes(className)).toBe(expected.includes(className));
      }
    },
  );
});
