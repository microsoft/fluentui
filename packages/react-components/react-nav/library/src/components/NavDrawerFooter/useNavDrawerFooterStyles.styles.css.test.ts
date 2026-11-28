import { renderHook } from '@testing-library/react-hooks';
import type { NavDrawerFooterState } from './NavDrawerFooter.types';
import { useNavDrawerFooterStyles_unstable } from './useNavDrawerFooterStyles.styles.css';
import { useDrawerFooterStyles_unstable } from '@fluentui/react-drawer';

jest.mock('./NavDrawerFooter.module.css', () => ({ root: 'css-NavDrawerFooter-root' }));
jest.mock('@fluentui/react-drawer', () => ({
  // eslint-disable-next-line @typescript-eslint/naming-convention
  useDrawerFooterStyles_unstable: jest.fn(),
}));

const createState = (): NavDrawerFooterState =>
  ({ root: { className: 'caller-root' }, components: { root: 'footer' }, scrollState: 'none' } as NavDrawerFooterState);

describe('useNavDrawerFooterStyles_unstable (CSS Modules)', () => {
  it.each([{ props: {}, expected: ['css-NavDrawerFooter-root'] }])(
    'maps styled state $props to root classes',
    ({ props, expected }) => {
      const state = { ...createState(), ...props } as NavDrawerFooterState;
      const { result } = renderHook(() => useNavDrawerFooterStyles_unstable(state));
      expect(result.current).toBe(state);
      const classes = state.root.className?.split(' ');
      expect(classes).toEqual(expect.arrayContaining(['fui-NavDrawerFooter', ...expected]));
      expect(classes?.[classes.length - 1]).toBe('caller-root');
      for (const className of ['css-NavDrawerFooter-root']) {
        expect(classes?.includes(className)).toBe(expected.includes(className));
      }
      expect(useDrawerFooterStyles_unstable).toHaveBeenCalledWith(state);
    },
  );
});
