import { renderHook } from '@testing-library/react-hooks';
import type { NavSectionHeaderState } from './NavSectionHeader.types';
import { useNavSectionHeaderStyles_unstable } from './useNavSectionHeaderStyles.styles.css';

jest.mock('./NavSectionHeader.module.css', () => ({ root: 'css-NavSectionHeader-root' }));

const createState = (): NavSectionHeaderState =>
  ({
    components: { root: 'div' },
    root: { className: 'caller-root' },
    density: 'medium',
    selected: false,
    open: false,
    value: 'test',
  } as NavSectionHeaderState);

describe('useNavSectionHeaderStyles_unstable (CSS Modules)', () => {
  it.each([{ props: {}, expected: ['css-NavSectionHeader-root'] }])(
    'maps styled state $props to root classes',
    ({ props, expected }) => {
      const state = { ...createState(), ...props } as NavSectionHeaderState;
      const { result } = renderHook(() => useNavSectionHeaderStyles_unstable(state));
      expect(result.current).toBe(state);
      const classes = state.root.className?.split(' ');
      expect(classes).toEqual(expect.arrayContaining(['fui-NavSectionHeader', ...expected]));
      expect(classes?.[classes.length - 1]).toBe('caller-root');
      for (const className of ['css-NavSectionHeader-root']) {
        expect(classes?.includes(className)).toBe(expected.includes(className));
      }
    },
  );
});
