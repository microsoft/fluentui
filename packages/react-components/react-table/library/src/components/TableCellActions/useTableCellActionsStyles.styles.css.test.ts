import { renderHook } from '@testing-library/react-hooks';
import type { TableCellActionsState } from './TableCellActions.types';
import { useTableCellActionsStyles_unstable } from './useTableCellActionsStyles.styles.css';

jest.mock('./TableCellActions.module.css', () => ({
  root: 'css-TableCellActions-root',
  visible: 'css-TableCellActions-visible',
}));

const createState = (): TableCellActionsState =>
  ({ components: { root: 'div' }, root: { className: 'caller-root' }, visible: false } as TableCellActionsState);

describe('useTableCellActionsStyles_unstable (CSS Modules)', () => {
  it.each([
    { props: { visible: false }, expected: ['css-TableCellActions-root'] },
    { props: { visible: true }, expected: ['css-TableCellActions-root', 'css-TableCellActions-visible'] },
  ])('maps styled state $props to root classes', ({ props, expected }) => {
    const state = { ...createState(), ...props } as TableCellActionsState;
    const { result } = renderHook(() => useTableCellActionsStyles_unstable(state));
    expect(result.current).toBe(state);
    const classes = state.root.className?.split(' ');
    expect(classes).toEqual(expect.arrayContaining(['fui-TableCellActions', ...expected]));
    expect(classes?.[classes.length - 1]).toBe('caller-root');
    for (const className of ['css-TableCellActions-root', 'css-TableCellActions-visible']) {
      expect(classes?.includes(className)).toBe(expected.includes(className));
    }
  });
});
