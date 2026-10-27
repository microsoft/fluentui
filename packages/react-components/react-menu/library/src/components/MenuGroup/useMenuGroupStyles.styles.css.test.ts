import { renderHook } from '@testing-library/react-hooks';
import { useMenuGroupStyles_unstable } from './useMenuGroupStyles.styles.css';

type State = Parameters<typeof useMenuGroupStyles_unstable>[0];

jest.mock('./MenuGroup.module.css', () => ({}));

const createState = (overrides: Partial<State> = {}): State =>
  ({
    components: { root: 'div' },
    root: { className: 'caller-root' },
    ...overrides,
  } as State);

describe('useMenuGroupStyles_unstable (CSS Modules)', () => {
  it('preserves slot names and caller classes', () => {
    const state = createState();
    const { result } = renderHook(() => useMenuGroupStyles_unstable(state));
    expect(result.current).toBe(state);
    expect(state.root?.className).toContain('fui-MenuGroup');
    expect(state.root?.className?.endsWith('caller-root')).toBe(true);
  });
});
