import { renderHook } from '@testing-library/react-hooks';
import type { NavDrawerState } from './NavDrawer.types';
import { useNavDrawerStyles_unstable } from './useNavDrawerStyles.styles.css';

jest.mock('./NavDrawer.module.css', () => ({ defaultWidth: 'css-NavDrawer-defaultWidth', root: 'css-NavDrawer-root' }));

const createState = (): NavDrawerState =>
  ({ components: { root: 'div' }, root: { className: 'caller-root' } } as NavDrawerState);

describe('useNavDrawerStyles_unstable (CSS Modules)', () => {
  it.each([
    { props: {}, expected: ['css-NavDrawer-root', 'css-NavDrawer-defaultWidth'] },
    { props: { size: 'small' }, expected: ['css-NavDrawer-root'] },
    { props: { size: 'medium' }, expected: ['css-NavDrawer-root'] },
    { props: { size: 'large' }, expected: ['css-NavDrawer-root'] },
    { props: { size: 'full' }, expected: ['css-NavDrawer-root'] },
  ])('maps styled state $props to root classes', ({ props, expected }) => {
    const state = { ...createState(), ...props } as NavDrawerState;
    const { result } = renderHook(() => useNavDrawerStyles_unstable(state));
    expect(result.current).toBe(state);
    const classes = state.root.className?.split(' ');
    expect(classes).toEqual(expect.arrayContaining(['fui-NavDrawer', ...expected]));
    expect(classes?.[classes.length - 1]).toBe('caller-root');
    for (const className of ['css-NavDrawer-defaultWidth', 'css-NavDrawer-root']) {
      expect(classes?.includes(className)).toBe(expected.includes(className));
    }
  });
});
