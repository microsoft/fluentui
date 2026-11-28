import { renderHook } from '@testing-library/react-hooks';
import { useMenuGridGroupStyles_unstable } from './useMenuGridGroupStyles.styles.css';

type State = Parameters<typeof useMenuGridGroupStyles_unstable>[0];

const createState = (overrides: Partial<State> = {}): State =>
  ({
    components: { root: 'div' },
    root: { className: 'caller-root' },
    ...overrides,
  } as State);

describe('useMenuGridGroupStyles_unstable (CSS Modules)', () => {
  it('preserves slot names and caller classes', () => {
    const state = createState();
    const { result } = renderHook(() => useMenuGridGroupStyles_unstable(state));
    expect(result.current).toBe(state);
    expect(state.root?.className).toContain('fui-MenuGridGroup');
    expect(state.root?.className?.endsWith('caller-root')).toBe(true);
  });
});
