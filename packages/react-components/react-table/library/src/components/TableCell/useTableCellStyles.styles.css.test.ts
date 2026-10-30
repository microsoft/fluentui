import { renderHook } from '@testing-library/react-hooks';
import type { TableCellState } from './TableCell.types';
import { useTableCellStyles_unstable } from './useTableCellStyles.styles.css';

jest.mock('./TableCell.module.css', () => ({
  'extra-small': 'css-TableCell-extra-small',
  flex: 'css-TableCell-flex',
  medium: 'css-TableCell-medium',
  root: 'css-TableCell-root',
  small: 'css-TableCell-small',
  table: 'css-TableCell-table',
}));

const createState = (): TableCellState =>
  ({
    components: { root: 'div' },
    root: { className: 'caller-root' },
    size: 'medium',
    noNativeElements: false,
    appearance: 'none',
    isHeaderRow: false,
  } as TableCellState);

describe('useTableCellStyles_unstable (CSS Modules)', () => {
  it.each([
    {
      props: { size: 'medium', noNativeElements: false },
      expected: ['css-TableCell-root', 'css-TableCell-table', 'css-TableCell-medium'],
    },
    {
      props: { size: 'medium', noNativeElements: true },
      expected: ['css-TableCell-root', 'css-TableCell-flex', 'css-TableCell-medium'],
    },
    {
      props: { size: 'small', noNativeElements: false },
      expected: ['css-TableCell-root', 'css-TableCell-table', 'css-TableCell-small'],
    },
    {
      props: { size: 'small', noNativeElements: true },
      expected: ['css-TableCell-root', 'css-TableCell-flex', 'css-TableCell-small'],
    },
    {
      props: { size: 'extra-small', noNativeElements: false },
      expected: ['css-TableCell-root', 'css-TableCell-table', 'css-TableCell-extra-small'],
    },
    {
      props: { size: 'extra-small', noNativeElements: true },
      expected: ['css-TableCell-root', 'css-TableCell-flex', 'css-TableCell-extra-small'],
    },
  ])('maps styled state $props to root classes', ({ props, expected }) => {
    const state = { ...createState(), ...props } as TableCellState;
    const { result } = renderHook(() => useTableCellStyles_unstable(state));
    expect(result.current).toBe(state);
    const classes = state.root.className?.split(' ');
    expect(classes).toEqual(expect.arrayContaining(['fui-TableCell', ...expected]));
    expect(classes?.[classes.length - 1]).toBe('caller-root');
    for (const className of [
      'css-TableCell-extra-small',
      'css-TableCell-flex',
      'css-TableCell-medium',
      'css-TableCell-root',
      'css-TableCell-small',
      'css-TableCell-table',
    ]) {
      expect(classes?.includes(className)).toBe(expected.includes(className));
    }
  });
});
