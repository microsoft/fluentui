import { renderHook } from '@testing-library/react-hooks';
import type { TableResizeHandleState } from './TableResizeHandle.types';
import { useTableResizeHandleStyles_unstable } from './useTableResizeHandleStyles.styles.css';

jest.mock('./TableResizeHandle.module.css', () => ({ root: 'css-TableResizeHandle-root' }));

const createState = (): TableResizeHandleState =>
  ({
    components: { root: 'div' },
    root: { className: 'caller-root' },
    size: 'medium',
    noNativeElements: false,
    appearance: 'none',
    isHeaderRow: false,
  } as TableResizeHandleState);

describe('useTableResizeHandleStyles_unstable (CSS Modules)', () => {
  it.each([{ props: {}, expected: ['css-TableResizeHandle-root'] }])(
    'maps styled state $props to root classes',
    ({ props, expected }) => {
      const state = { ...createState(), ...props } as TableResizeHandleState;
      const { result } = renderHook(() => useTableResizeHandleStyles_unstable(state));
      expect(result.current).toBe(state);
      const classes = state.root.className?.split(' ');
      expect(classes).toEqual(expect.arrayContaining(['fui-TableResizeHandle', ...expected]));
      expect(classes?.[classes.length - 1]).toBe('caller-root');
      for (const className of ['css-TableResizeHandle-root']) {
        expect(classes?.includes(className)).toBe(expected.includes(className));
      }
    },
  );
});
