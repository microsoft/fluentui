import { renderHook } from '@testing-library/react-hooks';
import { defaultTableState } from '../../hooks/useTableFeatures';
import { dataGridContextDefaultValue } from '../../contexts/dataGridContext';
import type { DataGridState } from './DataGrid.types';
import { useDataGridStyles_unstable } from './useDataGridStyles.styles.css';

jest.mock('./DataGrid.module.css', () => ({}));
jest.mock('../Table/Table.module.css', () => ({
  flex: 'css-Table-flex',
  root: 'css-Table-root',
  table: 'css-Table-table',
}));

const createState = (): DataGridState => ({
  ...dataGridContextDefaultValue,
  components: { root: 'div' },
  root: { className: 'caller-root' },
  size: 'medium',
  noNativeElements: false,
  sortable: false,
  tableState: defaultTableState,
});

describe('useDataGridStyles_unstable (CSS Modules)', () => {
  it.each([
    { props: { noNativeElements: false }, expected: ['css-Table-root', 'css-Table-table'] },
    { props: { noNativeElements: true }, expected: ['css-Table-root', 'css-Table-flex'] },
  ])('maps styled state $props to root classes', ({ props, expected }) => {
    const state = { ...createState(), ...props } as DataGridState;
    const { result } = renderHook(() => useDataGridStyles_unstable(state));
    expect(result.current).toBe(state);
    const classes = state.root.className?.split(' ');
    expect(classes).toEqual(expect.arrayContaining(['fui-DataGrid', ...expected]));
    expect(classes?.[classes.length - 1]).toBe('caller-root');
    for (const className of ['css-Table-flex', 'css-Table-root', 'css-Table-table']) {
      expect(classes?.includes(className)).toBe(expected.includes(className));
    }
  });
});
