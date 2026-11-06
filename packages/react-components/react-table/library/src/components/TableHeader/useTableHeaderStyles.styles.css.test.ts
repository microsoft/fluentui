import { renderHook } from '@testing-library/react-hooks';
import type { TableHeaderState } from './TableHeader.types';
import { useTableHeaderStyles_unstable } from './useTableHeaderStyles.styles.css';

jest.mock('./TableHeader.module.css', () => ({ flex: 'css-TableHeader-flex', table: 'css-TableHeader-table' }));

const createState = (): TableHeaderState =>
  ({
    components: { root: 'div' },
    root: { className: 'caller-root' },
    size: 'medium',
    noNativeElements: false,
    appearance: 'none',
    isHeaderRow: false,
  } as TableHeaderState);

describe('useTableHeaderStyles_unstable (CSS Modules)', () => {
  it.each([
    { props: { noNativeElements: false }, expected: ['css-TableHeader-table'] },
    { props: { noNativeElements: true }, expected: ['css-TableHeader-flex'] },
  ])('maps styled state $props to root classes', ({ props, expected }) => {
    const state = { ...createState(), ...props } as TableHeaderState;
    const { result } = renderHook(() => useTableHeaderStyles_unstable(state));
    expect(result.current).toBe(state);
    const classes = state.root.className?.split(' ');
    expect(classes).toEqual(expect.arrayContaining(['fui-TableHeader', ...expected]));
    expect(classes?.[classes.length - 1]).toBe('caller-root');
    for (const className of ['css-TableHeader-flex', 'css-TableHeader-table']) {
      expect(classes?.includes(className)).toBe(expected.includes(className));
    }
  });
});
