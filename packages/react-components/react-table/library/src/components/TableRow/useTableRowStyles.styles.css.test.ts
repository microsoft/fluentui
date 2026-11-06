import { renderHook } from '@testing-library/react-hooks';
import type { TableRowState } from './TableRow.types';
import { useTableRowStyles_unstable } from './useTableRowStyles.styles.css';

jest.mock('./TableRow.module.css', () => ({
  brand: 'css-TableRow-brand',
  'extra-small': 'css-TableRow-extra-small',
  flex: 'css-TableRow-flex',
  'fui-TableCellActions': 'css-TableRow-fui-TableCellActions',
  'fui-TableSelectionCell': 'css-TableRow-fui-TableSelectionCell',
  interactive: 'css-TableRow-interactive',
  medium: 'css-TableRow-medium',
  neutral: 'css-TableRow-neutral',
  root: 'css-TableRow-root',
  small: 'css-TableRow-small',
  table: 'css-TableRow-table',
}));

const createState = (): TableRowState =>
  ({
    components: { root: 'div' },
    root: { className: 'caller-root' },
    size: 'medium',
    noNativeElements: false,
    appearance: 'none',
    isHeaderRow: false,
  } as TableRowState);

describe('useTableRowStyles_unstable (CSS Modules)', () => {
  it.each([
    {
      props: { size: 'medium', noNativeElements: false, appearance: 'none', isHeaderRow: false },
      expected: ['css-TableRow-root', 'css-TableRow-table', 'css-TableRow-medium', 'css-TableRow-interactive'],
    },
    {
      props: { size: 'medium', noNativeElements: false, appearance: 'none', isHeaderRow: true },
      expected: ['css-TableRow-root', 'css-TableRow-table', 'css-TableRow-medium'],
    },
    {
      props: { size: 'medium', noNativeElements: false, appearance: 'brand', isHeaderRow: false },
      expected: [
        'css-TableRow-root',
        'css-TableRow-table',
        'css-TableRow-medium',
        'css-TableRow-interactive',
        'css-TableRow-brand',
      ],
    },
    {
      props: { size: 'medium', noNativeElements: false, appearance: 'brand', isHeaderRow: true },
      expected: ['css-TableRow-root', 'css-TableRow-table', 'css-TableRow-medium', 'css-TableRow-brand'],
    },
    {
      props: { size: 'medium', noNativeElements: false, appearance: 'neutral', isHeaderRow: false },
      expected: [
        'css-TableRow-root',
        'css-TableRow-table',
        'css-TableRow-medium',
        'css-TableRow-interactive',
        'css-TableRow-neutral',
      ],
    },
    {
      props: { size: 'medium', noNativeElements: false, appearance: 'neutral', isHeaderRow: true },
      expected: ['css-TableRow-root', 'css-TableRow-table', 'css-TableRow-medium', 'css-TableRow-neutral'],
    },
    {
      props: { size: 'medium', noNativeElements: true, appearance: 'none', isHeaderRow: false },
      expected: ['css-TableRow-root', 'css-TableRow-flex', 'css-TableRow-medium', 'css-TableRow-interactive'],
    },
    {
      props: { size: 'medium', noNativeElements: true, appearance: 'none', isHeaderRow: true },
      expected: ['css-TableRow-root', 'css-TableRow-flex', 'css-TableRow-medium'],
    },
    {
      props: { size: 'medium', noNativeElements: true, appearance: 'brand', isHeaderRow: false },
      expected: [
        'css-TableRow-root',
        'css-TableRow-flex',
        'css-TableRow-medium',
        'css-TableRow-interactive',
        'css-TableRow-brand',
      ],
    },
    {
      props: { size: 'medium', noNativeElements: true, appearance: 'brand', isHeaderRow: true },
      expected: ['css-TableRow-root', 'css-TableRow-flex', 'css-TableRow-medium', 'css-TableRow-brand'],
    },
    {
      props: { size: 'medium', noNativeElements: true, appearance: 'neutral', isHeaderRow: false },
      expected: [
        'css-TableRow-root',
        'css-TableRow-flex',
        'css-TableRow-medium',
        'css-TableRow-interactive',
        'css-TableRow-neutral',
      ],
    },
    {
      props: { size: 'medium', noNativeElements: true, appearance: 'neutral', isHeaderRow: true },
      expected: ['css-TableRow-root', 'css-TableRow-flex', 'css-TableRow-medium', 'css-TableRow-neutral'],
    },
    {
      props: { size: 'small', noNativeElements: false, appearance: 'none', isHeaderRow: false },
      expected: ['css-TableRow-root', 'css-TableRow-table', 'css-TableRow-small', 'css-TableRow-interactive'],
    },
    {
      props: { size: 'small', noNativeElements: false, appearance: 'none', isHeaderRow: true },
      expected: ['css-TableRow-root', 'css-TableRow-table', 'css-TableRow-small'],
    },
    {
      props: { size: 'small', noNativeElements: false, appearance: 'brand', isHeaderRow: false },
      expected: [
        'css-TableRow-root',
        'css-TableRow-table',
        'css-TableRow-small',
        'css-TableRow-interactive',
        'css-TableRow-brand',
      ],
    },
    {
      props: { size: 'small', noNativeElements: false, appearance: 'brand', isHeaderRow: true },
      expected: ['css-TableRow-root', 'css-TableRow-table', 'css-TableRow-small', 'css-TableRow-brand'],
    },
    {
      props: { size: 'small', noNativeElements: false, appearance: 'neutral', isHeaderRow: false },
      expected: [
        'css-TableRow-root',
        'css-TableRow-table',
        'css-TableRow-small',
        'css-TableRow-interactive',
        'css-TableRow-neutral',
      ],
    },
    {
      props: { size: 'small', noNativeElements: false, appearance: 'neutral', isHeaderRow: true },
      expected: ['css-TableRow-root', 'css-TableRow-table', 'css-TableRow-small', 'css-TableRow-neutral'],
    },
    {
      props: { size: 'small', noNativeElements: true, appearance: 'none', isHeaderRow: false },
      expected: ['css-TableRow-root', 'css-TableRow-flex', 'css-TableRow-small', 'css-TableRow-interactive'],
    },
    {
      props: { size: 'small', noNativeElements: true, appearance: 'none', isHeaderRow: true },
      expected: ['css-TableRow-root', 'css-TableRow-flex', 'css-TableRow-small'],
    },
    {
      props: { size: 'small', noNativeElements: true, appearance: 'brand', isHeaderRow: false },
      expected: [
        'css-TableRow-root',
        'css-TableRow-flex',
        'css-TableRow-small',
        'css-TableRow-interactive',
        'css-TableRow-brand',
      ],
    },
    {
      props: { size: 'small', noNativeElements: true, appearance: 'brand', isHeaderRow: true },
      expected: ['css-TableRow-root', 'css-TableRow-flex', 'css-TableRow-small', 'css-TableRow-brand'],
    },
    {
      props: { size: 'small', noNativeElements: true, appearance: 'neutral', isHeaderRow: false },
      expected: [
        'css-TableRow-root',
        'css-TableRow-flex',
        'css-TableRow-small',
        'css-TableRow-interactive',
        'css-TableRow-neutral',
      ],
    },
    {
      props: { size: 'small', noNativeElements: true, appearance: 'neutral', isHeaderRow: true },
      expected: ['css-TableRow-root', 'css-TableRow-flex', 'css-TableRow-small', 'css-TableRow-neutral'],
    },
    {
      props: { size: 'extra-small', noNativeElements: false, appearance: 'none', isHeaderRow: false },
      expected: ['css-TableRow-root', 'css-TableRow-table', 'css-TableRow-extra-small', 'css-TableRow-interactive'],
    },
    {
      props: { size: 'extra-small', noNativeElements: false, appearance: 'none', isHeaderRow: true },
      expected: ['css-TableRow-root', 'css-TableRow-table', 'css-TableRow-extra-small'],
    },
    {
      props: { size: 'extra-small', noNativeElements: false, appearance: 'brand', isHeaderRow: false },
      expected: [
        'css-TableRow-root',
        'css-TableRow-table',
        'css-TableRow-extra-small',
        'css-TableRow-interactive',
        'css-TableRow-brand',
      ],
    },
    {
      props: { size: 'extra-small', noNativeElements: false, appearance: 'brand', isHeaderRow: true },
      expected: ['css-TableRow-root', 'css-TableRow-table', 'css-TableRow-extra-small', 'css-TableRow-brand'],
    },
    {
      props: { size: 'extra-small', noNativeElements: false, appearance: 'neutral', isHeaderRow: false },
      expected: [
        'css-TableRow-root',
        'css-TableRow-table',
        'css-TableRow-extra-small',
        'css-TableRow-interactive',
        'css-TableRow-neutral',
      ],
    },
    {
      props: { size: 'extra-small', noNativeElements: false, appearance: 'neutral', isHeaderRow: true },
      expected: ['css-TableRow-root', 'css-TableRow-table', 'css-TableRow-extra-small', 'css-TableRow-neutral'],
    },
    {
      props: { size: 'extra-small', noNativeElements: true, appearance: 'none', isHeaderRow: false },
      expected: ['css-TableRow-root', 'css-TableRow-flex', 'css-TableRow-extra-small', 'css-TableRow-interactive'],
    },
    {
      props: { size: 'extra-small', noNativeElements: true, appearance: 'none', isHeaderRow: true },
      expected: ['css-TableRow-root', 'css-TableRow-flex', 'css-TableRow-extra-small'],
    },
    {
      props: { size: 'extra-small', noNativeElements: true, appearance: 'brand', isHeaderRow: false },
      expected: [
        'css-TableRow-root',
        'css-TableRow-flex',
        'css-TableRow-extra-small',
        'css-TableRow-interactive',
        'css-TableRow-brand',
      ],
    },
    {
      props: { size: 'extra-small', noNativeElements: true, appearance: 'brand', isHeaderRow: true },
      expected: ['css-TableRow-root', 'css-TableRow-flex', 'css-TableRow-extra-small', 'css-TableRow-brand'],
    },
    {
      props: { size: 'extra-small', noNativeElements: true, appearance: 'neutral', isHeaderRow: false },
      expected: [
        'css-TableRow-root',
        'css-TableRow-flex',
        'css-TableRow-extra-small',
        'css-TableRow-interactive',
        'css-TableRow-neutral',
      ],
    },
    {
      props: { size: 'extra-small', noNativeElements: true, appearance: 'neutral', isHeaderRow: true },
      expected: ['css-TableRow-root', 'css-TableRow-flex', 'css-TableRow-extra-small', 'css-TableRow-neutral'],
    },
  ])('maps styled state $props to root classes', ({ props, expected }) => {
    const state = { ...createState(), ...props } as TableRowState;
    const { result } = renderHook(() => useTableRowStyles_unstable(state));
    expect(result.current).toBe(state);
    const classes = state.root.className?.split(' ');
    expect(classes).toEqual(expect.arrayContaining(['fui-TableRow', ...expected]));
    expect(classes?.[classes.length - 1]).toBe('caller-root');
    for (const className of [
      'css-TableRow-brand',
      'css-TableRow-extra-small',
      'css-TableRow-flex',
      'css-TableRow-interactive',
      'css-TableRow-medium',
      'css-TableRow-neutral',
      'css-TableRow-root',
      'css-TableRow-small',
      'css-TableRow-table',
    ]) {
      expect(classes?.includes(className)).toBe(expected.includes(className));
    }
  });
});
