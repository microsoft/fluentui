import { renderHook } from '@testing-library/react-hooks';
import type { NavDrawerHeaderState } from './NavDrawerHeader.types';
import { useNavDrawerHeaderStyles_unstable } from './useNavDrawerHeaderStyles.styles.css';
import { useDrawerHeaderStyles_unstable } from '@fluentui/react-drawer';

jest.mock('./NavDrawerHeader.module.css', () => ({ root: 'css-NavDrawerHeader-root' }));
jest.mock('@fluentui/react-drawer', () => ({
  // eslint-disable-next-line @typescript-eslint/naming-convention
  useDrawerHeaderStyles_unstable: jest.fn(),
}));

const createState = (): NavDrawerHeaderState =>
  ({ root: { className: 'caller-root' }, components: { root: 'header' }, scrollState: 'none' } as NavDrawerHeaderState);

describe('useNavDrawerHeaderStyles_unstable (CSS Modules)', () => {
  it.each([{ props: {}, expected: ['css-NavDrawerHeader-root'] }])(
    'maps styled state $props to root classes',
    ({ props, expected }) => {
      const state = { ...createState(), ...props } as NavDrawerHeaderState;
      const { result } = renderHook(() => useNavDrawerHeaderStyles_unstable(state));
      expect(result.current).toBe(state);
      const classes = state.root.className?.split(' ');
      expect(classes).toEqual(expect.arrayContaining(['fui-NavDrawerHeader', ...expected]));
      expect(classes?.[classes.length - 1]).toBe('caller-root');
      for (const className of ['css-NavDrawerHeader-root']) {
        expect(classes?.includes(className)).toBe(expected.includes(className));
      }
      expect(useDrawerHeaderStyles_unstable).toHaveBeenCalledWith(state);
    },
  );
});
