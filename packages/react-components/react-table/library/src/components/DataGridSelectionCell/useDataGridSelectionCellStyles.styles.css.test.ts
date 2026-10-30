import { renderHook } from '@testing-library/react-hooks';
import type { DataGridSelectionCellState } from './DataGridSelectionCell.types';
import { useDataGridSelectionCellStyles_unstable } from './useDataGridSelectionCellStyles.styles.css';

jest.mock('./DataGridSelectionCell.module.css', () => ({}));
jest.mock('../TableSelectionCell/TableSelectionCell.module.css', () => ({
  flex: 'css-TableSelectionCell-flex',
  hidden: 'css-TableSelectionCell-hidden',
  radioIndicator: 'css-TableSelectionCell-radioIndicator',
  root: 'css-TableSelectionCell-root',
  subtle: 'css-TableSelectionCell-subtle',
  table: 'css-TableSelectionCell-table',
}));

const createState = (): DataGridSelectionCellState =>
  ({
    components: { root: 'div' },
    root: { className: 'caller-root' },
    noNativeElements: false,
    checked: false,
    subtle: false,
    hidden: false,
    type: 'checkbox',
    checkboxIndicator: { className: 'caller-checkboxIndicator' },
    radioIndicator: { className: 'caller-radioIndicator' },
  } as DataGridSelectionCellState);

describe('useDataGridSelectionCellStyles_unstable (CSS Modules)', () => {
  it.each([
    {
      props: { noNativeElements: false, checked: false, subtle: false, hidden: false },
      expected: ['css-TableSelectionCell-root', 'css-TableSelectionCell-table'],
    },
    {
      props: { noNativeElements: false, checked: false, subtle: false, hidden: true },
      expected: ['css-TableSelectionCell-root', 'css-TableSelectionCell-table', 'css-TableSelectionCell-hidden'],
    },
    {
      props: { noNativeElements: false, checked: false, subtle: true, hidden: false },
      expected: ['css-TableSelectionCell-root', 'css-TableSelectionCell-table', 'css-TableSelectionCell-subtle'],
    },
    {
      props: { noNativeElements: false, checked: false, subtle: true, hidden: true },
      expected: [
        'css-TableSelectionCell-root',
        'css-TableSelectionCell-table',
        'css-TableSelectionCell-subtle',
        'css-TableSelectionCell-hidden',
      ],
    },
    {
      props: { noNativeElements: false, checked: true, subtle: false, hidden: false },
      expected: ['css-TableSelectionCell-root', 'css-TableSelectionCell-table'],
    },
    {
      props: { noNativeElements: false, checked: true, subtle: false, hidden: true },
      expected: ['css-TableSelectionCell-root', 'css-TableSelectionCell-table', 'css-TableSelectionCell-hidden'],
    },
    {
      props: { noNativeElements: false, checked: true, subtle: true, hidden: false },
      expected: ['css-TableSelectionCell-root', 'css-TableSelectionCell-table'],
    },
    {
      props: { noNativeElements: false, checked: true, subtle: true, hidden: true },
      expected: ['css-TableSelectionCell-root', 'css-TableSelectionCell-table', 'css-TableSelectionCell-hidden'],
    },
    {
      props: { noNativeElements: false, checked: 'mixed', subtle: false, hidden: false },
      expected: ['css-TableSelectionCell-root', 'css-TableSelectionCell-table'],
    },
    {
      props: { noNativeElements: false, checked: 'mixed', subtle: false, hidden: true },
      expected: ['css-TableSelectionCell-root', 'css-TableSelectionCell-table', 'css-TableSelectionCell-hidden'],
    },
    {
      props: { noNativeElements: false, checked: 'mixed', subtle: true, hidden: false },
      expected: ['css-TableSelectionCell-root', 'css-TableSelectionCell-table'],
    },
    {
      props: { noNativeElements: false, checked: 'mixed', subtle: true, hidden: true },
      expected: ['css-TableSelectionCell-root', 'css-TableSelectionCell-table', 'css-TableSelectionCell-hidden'],
    },
    {
      props: { noNativeElements: true, checked: false, subtle: false, hidden: false },
      expected: ['css-TableSelectionCell-root', 'css-TableSelectionCell-flex'],
    },
    {
      props: { noNativeElements: true, checked: false, subtle: false, hidden: true },
      expected: ['css-TableSelectionCell-root', 'css-TableSelectionCell-flex', 'css-TableSelectionCell-hidden'],
    },
    {
      props: { noNativeElements: true, checked: false, subtle: true, hidden: false },
      expected: ['css-TableSelectionCell-root', 'css-TableSelectionCell-flex', 'css-TableSelectionCell-subtle'],
    },
    {
      props: { noNativeElements: true, checked: false, subtle: true, hidden: true },
      expected: [
        'css-TableSelectionCell-root',
        'css-TableSelectionCell-flex',
        'css-TableSelectionCell-subtle',
        'css-TableSelectionCell-hidden',
      ],
    },
    {
      props: { noNativeElements: true, checked: true, subtle: false, hidden: false },
      expected: ['css-TableSelectionCell-root', 'css-TableSelectionCell-flex'],
    },
    {
      props: { noNativeElements: true, checked: true, subtle: false, hidden: true },
      expected: ['css-TableSelectionCell-root', 'css-TableSelectionCell-flex', 'css-TableSelectionCell-hidden'],
    },
    {
      props: { noNativeElements: true, checked: true, subtle: true, hidden: false },
      expected: ['css-TableSelectionCell-root', 'css-TableSelectionCell-flex'],
    },
    {
      props: { noNativeElements: true, checked: true, subtle: true, hidden: true },
      expected: ['css-TableSelectionCell-root', 'css-TableSelectionCell-flex', 'css-TableSelectionCell-hidden'],
    },
    {
      props: { noNativeElements: true, checked: 'mixed', subtle: false, hidden: false },
      expected: ['css-TableSelectionCell-root', 'css-TableSelectionCell-flex'],
    },
    {
      props: { noNativeElements: true, checked: 'mixed', subtle: false, hidden: true },
      expected: ['css-TableSelectionCell-root', 'css-TableSelectionCell-flex', 'css-TableSelectionCell-hidden'],
    },
    {
      props: { noNativeElements: true, checked: 'mixed', subtle: true, hidden: false },
      expected: ['css-TableSelectionCell-root', 'css-TableSelectionCell-flex'],
    },
    {
      props: { noNativeElements: true, checked: 'mixed', subtle: true, hidden: true },
      expected: ['css-TableSelectionCell-root', 'css-TableSelectionCell-flex', 'css-TableSelectionCell-hidden'],
    },
  ])('maps styled state $props to root classes', ({ props, expected }) => {
    const state = { ...createState(), ...props } as DataGridSelectionCellState;
    const { result } = renderHook(() => useDataGridSelectionCellStyles_unstable(state));
    expect(result.current).toBe(state);
    const classes = state.root.className?.split(' ');
    expect(classes).toEqual(expect.arrayContaining(['fui-DataGridSelectionCell', ...expected]));
    expect(classes?.[classes.length - 1]).toBe('caller-root');
    for (const className of [
      'css-TableSelectionCell-flex',
      'css-TableSelectionCell-hidden',
      'css-TableSelectionCell-root',
      'css-TableSelectionCell-subtle',
      'css-TableSelectionCell-table',
    ]) {
      expect(classes?.includes(className)).toBe(expected.includes(className));
    }
  });
  it('styles slots without duplicating root state classes', () => {
    const state = createState();
    renderHook(() => useDataGridSelectionCellStyles_unstable(state));
    expect(state.checkboxIndicator?.className?.split(' ')).toEqual(
      expect.arrayContaining([
        'fui-DataGridSelectionCell__checkboxIndicator',
        'fui-TableSelectionCell__checkboxIndicator',
        'caller-checkboxIndicator',
      ]),
    );
    expect(state.checkboxIndicator?.className?.endsWith('caller-checkboxIndicator')).toBe(true);
    expect(state.checkboxIndicator?.className).not.toContain('css-sharedNavStyles-selected');
    expect(state.radioIndicator?.className?.split(' ')).toEqual(
      expect.arrayContaining([
        'fui-DataGridSelectionCell__radioIndicator',
        'fui-TableSelectionCell__radioIndicator',
        'css-TableSelectionCell-radioIndicator',
        'caller-radioIndicator',
      ]),
    );
    expect(state.radioIndicator?.className?.endsWith('caller-radioIndicator')).toBe(true);
    expect(state.radioIndicator?.className).not.toContain('css-sharedNavStyles-selected');
  });
  it('allows optional slots to be absent', () => {
    const state = createState();
    state.checkboxIndicator = undefined;
    state.radioIndicator = undefined;
    expect(() => renderHook(() => useDataGridSelectionCellStyles_unstable(state))).not.toThrow();
  });
});
