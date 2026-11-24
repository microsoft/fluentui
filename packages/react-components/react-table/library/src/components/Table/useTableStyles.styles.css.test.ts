import { renderHook } from '@testing-library/react-hooks';
import type { TableState } from './Table.types';
import { useTableStyles_unstable } from './useTableStyles.styles.css';

jest.mock('./Table.module.css', () => ({ flex: 'css-Table-flex', root: 'css-Table-root', table: 'css-Table-table' }));

const createState = (): TableState =>
  ({
    components: { root: 'div' },
    root: { className: 'caller-root' },
    size: 'medium',
    noNativeElements: false,
    sortable: false,
    appearance: 'none',
    isHeaderRow: false,
  } as TableState);

describe('useTableStyles_unstable (CSS Modules)', () => {
  it.each([
    { props: { noNativeElements: false }, expected: ['css-Table-root', 'css-Table-table'] },
    { props: { noNativeElements: true }, expected: ['css-Table-root', 'css-Table-flex'] },
  ])('maps styled state $props to root classes', ({ props, expected }) => {
    const state = { ...createState(), ...props } as TableState;
    const { result } = renderHook(() => useTableStyles_unstable(state));
    expect(result.current).toBe(state);
    const classes = state.root.className?.split(' ');
    expect(classes).toEqual(expect.arrayContaining(['fui-Table', ...expected]));
    expect(classes?.[classes.length - 1]).toBe('caller-root');
    for (const className of ['css-Table-flex', 'css-Table-root', 'css-Table-table']) {
      expect(classes?.includes(className)).toBe(expected.includes(className));
    }
  });
});
