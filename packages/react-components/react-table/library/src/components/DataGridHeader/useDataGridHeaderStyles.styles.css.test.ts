import { renderHook } from '@testing-library/react-hooks';
import type { DataGridHeaderState } from './DataGridHeader.types';
import { useDataGridHeaderStyles_unstable } from './useDataGridHeaderStyles.styles.css';

jest.mock('./DataGridHeader.module.css', () => ({}));
jest.mock('../TableHeader/TableHeader.module.css', () => ({
  flex: 'css-TableHeader-flex',
  table: 'css-TableHeader-table',
}));

const createState = (): DataGridHeaderState =>
  ({
    components: { root: 'div' },
    root: { className: 'caller-root' },
    size: 'medium',
    noNativeElements: false,
    appearance: 'none',
    isHeaderRow: false,
  } as DataGridHeaderState);

describe('useDataGridHeaderStyles_unstable (CSS Modules)', () => {
  it.each([
    { props: { noNativeElements: false }, expected: ['css-TableHeader-table'] },
    { props: { noNativeElements: true }, expected: ['css-TableHeader-flex'] },
  ])('maps styled state $props to root classes', ({ props, expected }) => {
    const state = { ...createState(), ...props } as DataGridHeaderState;
    const { result } = renderHook(() => useDataGridHeaderStyles_unstable(state));
    expect(result.current).toBe(state);
    const classes = state.root.className?.split(' ');
    expect(classes).toEqual(expect.arrayContaining(['fui-DataGridHeader', ...expected]));
    expect(classes?.[classes.length - 1]).toBe('caller-root');
    for (const className of ['css-TableHeader-flex', 'css-TableHeader-table']) {
      expect(classes?.includes(className)).toBe(expected.includes(className));
    }
  });
});
