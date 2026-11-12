import { renderHook } from '@testing-library/react-hooks';
import type { DataGridCellState } from './DataGridCell.types';
import { useDataGridCellStyles_unstable } from './useDataGridCellStyles.styles.css';

jest.mock('./DataGridCell.module.css', () => ({}));
jest.mock('../TableCell/TableCell.module.css', () => ({
  'extra-small': 'css-TableCell-extra-small',
  flex: 'css-TableCell-flex',
  medium: 'css-TableCell-medium',
  root: 'css-TableCell-root',
  small: 'css-TableCell-small',
  table: 'css-TableCell-table',
}));

const createState = (): DataGridCellState =>
  ({
    components: { root: 'div' },
    root: { className: 'caller-root' },
    size: 'medium',
    noNativeElements: false,
    appearance: 'none',
    isHeaderRow: false,
  } as DataGridCellState);

describe('useDataGridCellStyles_unstable (CSS Modules)', () => {
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
    const state = { ...createState(), ...props } as DataGridCellState;
    const { result } = renderHook(() => useDataGridCellStyles_unstable(state));
    expect(result.current).toBe(state);
    const classes = state.root.className?.split(' ');
    expect(classes).toEqual(expect.arrayContaining(['fui-DataGridCell', ...expected]));
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
