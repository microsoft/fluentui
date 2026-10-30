import { renderHook } from '@testing-library/react-hooks';
import type { DataGridHeaderCellState } from './DataGridHeaderCell.types';
import { useDataGridHeaderCellStyles_unstable } from './useDataGridHeaderCellStyles.styles.css';

jest.mock('./DataGridHeaderCell.module.css', () => ({}));
jest.mock('../TableHeaderCell/TableHeaderCell.module.css', () => ({
  button: 'css-TableHeaderCell-button',
  flex: 'css-TableHeaderCell-flex',
  root: 'css-TableHeaderCell-root',
  sortIcon: 'css-TableHeaderCell-sortIcon',
  sortable: 'css-TableHeaderCell-sortable',
  table: 'css-TableHeaderCell-table',
}));

const createState = (): DataGridHeaderCellState =>
  ({
    components: { root: 'div' },
    root: { className: 'caller-root' },
    noNativeElements: false,
    sortable: false,
    button: { className: 'caller-button' },
    sortIcon: { className: 'caller-sortIcon' },
    aside: { className: 'caller-aside' },
  } as DataGridHeaderCellState);

describe('useDataGridHeaderCellStyles_unstable (CSS Modules)', () => {
  it.each([
    {
      props: { noNativeElements: false, sortable: false },
      expected: ['css-TableHeaderCell-root', 'css-TableHeaderCell-table'],
    },
    {
      props: { noNativeElements: false, sortable: true },
      expected: ['css-TableHeaderCell-root', 'css-TableHeaderCell-table', 'css-TableHeaderCell-sortable'],
    },
    {
      props: { noNativeElements: true, sortable: false },
      expected: ['css-TableHeaderCell-root', 'css-TableHeaderCell-flex'],
    },
    {
      props: { noNativeElements: true, sortable: true },
      expected: ['css-TableHeaderCell-root', 'css-TableHeaderCell-flex', 'css-TableHeaderCell-sortable'],
    },
  ])('maps styled state $props to root classes', ({ props, expected }) => {
    const state = { ...createState(), ...props } as DataGridHeaderCellState;
    const { result } = renderHook(() => useDataGridHeaderCellStyles_unstable(state));
    expect(result.current).toBe(state);
    const classes = state.root.className?.split(' ');
    expect(classes).toEqual(expect.arrayContaining(['fui-DataGridHeaderCell', ...expected]));
    expect(classes?.[classes.length - 1]).toBe('caller-root');
    for (const className of [
      'css-TableHeaderCell-flex',
      'css-TableHeaderCell-root',
      'css-TableHeaderCell-sortable',
      'css-TableHeaderCell-table',
    ]) {
      expect(classes?.includes(className)).toBe(expected.includes(className));
    }
  });
  it('styles slots without duplicating root state classes', () => {
    const state = createState();
    renderHook(() => useDataGridHeaderCellStyles_unstable(state));
    expect(state.button?.className?.split(' ')).toEqual(
      expect.arrayContaining([
        'fui-DataGridHeaderCell__button',
        'fui-TableHeaderCell__button',
        'css-TableHeaderCell-button',
        'caller-button',
      ]),
    );
    expect(state.button?.className?.endsWith('caller-button')).toBe(true);
    expect(state.button?.className).not.toContain('css-sharedNavStyles-selected');
    expect(state.sortIcon?.className?.split(' ')).toEqual(
      expect.arrayContaining([
        'fui-DataGridHeaderCell__sortIcon',
        'fui-TableHeaderCell__sortIcon',
        'css-TableHeaderCell-sortIcon',
        'caller-sortIcon',
      ]),
    );
    expect(state.sortIcon?.className?.endsWith('caller-sortIcon')).toBe(true);
    expect(state.sortIcon?.className).not.toContain('css-sharedNavStyles-selected');
    expect(state.aside?.className?.split(' ')).toEqual(
      expect.arrayContaining(['fui-DataGridHeaderCell__aside', 'fui-TableHeaderCell__aside', 'caller-aside']),
    );
    expect(state.aside?.className?.endsWith('caller-aside')).toBe(true);
    expect(state.aside?.className).not.toContain('css-sharedNavStyles-selected');
  });
  it('allows optional slots to be absent', () => {
    const state = createState();
    state.sortIcon = undefined;
    state.aside = undefined;
    expect(() => renderHook(() => useDataGridHeaderCellStyles_unstable(state))).not.toThrow();
  });
});
