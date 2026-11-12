import { renderHook } from '@testing-library/react-hooks';
import type { TableBodyState } from './TableBody.types';
import { useTableBodyStyles_unstable } from './useTableBodyStyles.styles.css';

jest.mock('./TableBody.module.css', () => ({ flex: 'css-TableBody-flex', table: 'css-TableBody-table' }));

const createState = (): TableBodyState =>
  ({
    components: { root: 'div' },
    root: { className: 'caller-root' },
    size: 'medium',
    noNativeElements: false,
    appearance: 'none',
    isHeaderRow: false,
  } as TableBodyState);

describe('useTableBodyStyles_unstable (CSS Modules)', () => {
  it.each([
    { props: { noNativeElements: false }, expected: ['css-TableBody-table'] },
    { props: { noNativeElements: true }, expected: ['css-TableBody-flex'] },
  ])('maps styled state $props to root classes', ({ props, expected }) => {
    const state = { ...createState(), ...props } as TableBodyState;
    const { result } = renderHook(() => useTableBodyStyles_unstable(state));
    expect(result.current).toBe(state);
    const classes = state.root.className?.split(' ');
    expect(classes).toEqual(expect.arrayContaining(['fui-TableBody', ...expected]));
    expect(classes?.[classes.length - 1]).toBe('caller-root');
    for (const className of ['css-TableBody-flex', 'css-TableBody-table']) {
      expect(classes?.includes(className)).toBe(expected.includes(className));
    }
  });
});
