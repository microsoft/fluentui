import { renderHook } from '@testing-library/react-hooks';
import { useMenuSplitGroupStyles_unstable } from './useMenuSplitGroupStyles.styles.css';

type State = Parameters<typeof useMenuSplitGroupStyles_unstable>[0];

jest.mock('./MenuSplitGroup.module.css', () => ({
  root: 'css-root',
}));

const createState = (overrides: Partial<State> = {}): State =>
  ({
    components: { root: 'div' },
    root: { className: 'caller-root' },
    ...overrides,
  } as State);

describe('useMenuSplitGroupStyles_unstable (CSS Modules)', () => {
  it('preserves slot names and caller classes', () => {
    const state = createState();
    const { result } = renderHook(() => useMenuSplitGroupStyles_unstable(state));
    expect(result.current).toBe(state);
    expect(state.root?.className).toContain('fui-MenuSplitGroup');
    expect(state.root?.className?.endsWith('caller-root')).toBe(true);
  });
});
