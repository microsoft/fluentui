import { renderHook } from '@testing-library/react-hooks';
import { useMenuGridCellStyles_unstable } from './useMenuGridCellStyles.styles.css';

type State = Parameters<typeof useMenuGridCellStyles_unstable>[0];

jest.mock('./MenuGridCell.module.css', () => ({
  root: 'css-root',
  visuallyHidden: 'css-visuallyHidden',
}));

const createState = (overrides: Partial<State> = {}): State =>
  ({
    visuallyHidden: false,
    components: { root: 'div' },
    root: { className: 'caller-root' },
    ...overrides,
  } as State);

describe('useMenuGridCellStyles_unstable (CSS Modules)', () => {
  it('preserves slot names and caller classes', () => {
    const state = createState();
    const { result } = renderHook(() => useMenuGridCellStyles_unstable(state));
    expect(result.current).toBe(state);
    expect(state.root?.className).toContain('fui-MenuGridCell');
    expect(state.root?.className?.endsWith('caller-root')).toBe(true);
  });

  it.each([false, true])('maps visuallyHidden=%s to the root', value => {
    const state = createState({ visuallyHidden: value });
    renderHook(() => useMenuGridCellStyles_unstable(state));
    expect(state.root.className?.includes('css-visuallyHidden')).toBe(value);
  });
});
