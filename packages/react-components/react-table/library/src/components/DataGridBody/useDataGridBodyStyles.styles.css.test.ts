import { renderHook } from '@testing-library/react-hooks';
import type { DataGridBodyState } from './DataGridBody.types';
import { useDataGridBodyStyles_unstable } from './useDataGridBodyStyles.styles.css';

jest.mock('./DataGridBody.module.css', () => ({}));
jest.mock('../TableBody/TableBody.module.css', () => ({ flex: 'css-TableBody-flex', table: 'css-TableBody-table' }));

const createState = (): DataGridBodyState =>
  ({
    components: { root: 'div' },
    root: { className: 'caller-root' },
    rows: [],
    renderRow: () => null,
    size: 'medium',
    noNativeElements: false,
    appearance: 'none',
    isHeaderRow: false,
  } as DataGridBodyState);

describe('useDataGridBodyStyles_unstable (CSS Modules)', () => {
  it.each([
    { props: { noNativeElements: false }, expected: ['css-TableBody-table'] },
    { props: { noNativeElements: true }, expected: ['css-TableBody-flex'] },
  ])('maps styled state $props to root classes', ({ props, expected }) => {
    const state = { ...createState(), ...props } as DataGridBodyState;
    const { result } = renderHook(() => useDataGridBodyStyles_unstable(state));
    expect(result.current).toBe(state);
    const classes = state.root.className?.split(' ');
    expect(classes).toEqual(expect.arrayContaining(['fui-DataGridBody', ...expected]));
    expect(classes?.[classes.length - 1]).toBe('caller-root');
    for (const className of ['css-TableBody-flex', 'css-TableBody-table']) {
      expect(classes?.includes(className)).toBe(expected.includes(className));
    }
  });
});
