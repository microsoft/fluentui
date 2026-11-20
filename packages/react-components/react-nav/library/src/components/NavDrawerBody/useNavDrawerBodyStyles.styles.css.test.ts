import { renderHook } from '@testing-library/react-hooks';
import type { NavDrawerBodyState } from './NavDrawerBody.types';
import { useNavDrawerBodyStyles_unstable } from './useNavDrawerBodyStyles.styles.css';
import { useDrawerBodyStyles_unstable } from '@fluentui/react-drawer';

jest.mock('./NavDrawerBody.module.css', () => ({ root: 'css-NavDrawerBody-root' }));
jest.mock('@fluentui/react-drawer', () => ({
  // eslint-disable-next-line @typescript-eslint/naming-convention
  useDrawerBodyStyles_unstable: jest.fn(),
}));

const createState = (): NavDrawerBodyState =>
  ({ root: { className: 'caller-root' }, components: { root: 'div' } } as NavDrawerBodyState);

describe('useNavDrawerBodyStyles_unstable (CSS Modules)', () => {
  it.each([{ props: {}, expected: ['css-NavDrawerBody-root'] }])(
    'maps styled state $props to root classes',
    ({ props, expected }) => {
      const state = { ...createState(), ...props } as NavDrawerBodyState;
      const { result } = renderHook(() => useNavDrawerBodyStyles_unstable(state));
      expect(result.current).toBe(state);
      const classes = state.root.className?.split(' ');
      expect(classes).toEqual(expect.arrayContaining(['fui-NavDrawerBody', ...expected]));
      expect(classes?.[classes.length - 1]).toBe('caller-root');
      for (const className of ['css-NavDrawerBody-root']) {
        expect(classes?.includes(className)).toBe(expected.includes(className));
      }
      expect(useDrawerBodyStyles_unstable).toHaveBeenCalledWith(state);
    },
  );
});
