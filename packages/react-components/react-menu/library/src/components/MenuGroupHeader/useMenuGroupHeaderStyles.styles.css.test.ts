import { renderHook } from '@testing-library/react-hooks';
import { useMenuGroupHeaderStyles_unstable } from './useMenuGroupHeaderStyles.styles.css';

type State = Parameters<typeof useMenuGroupHeaderStyles_unstable>[0];

jest.mock('./MenuGroupHeader.module.css', () => ({
  root: 'css-root',
}));

const createState = (overrides: Partial<State> = {}): State =>
  ({
    components: { root: 'div' },
    root: { className: 'caller-root' },
    ...overrides,
  } as State);

describe('useMenuGroupHeaderStyles_unstable (CSS Modules)', () => {
  it('preserves slot names and caller classes', () => {
    const state = createState();
    const { result } = renderHook(() => useMenuGroupHeaderStyles_unstable(state));
    expect(result.current).toBe(state);
    expect(state.root?.className).toContain('fui-MenuGroupHeader');
    expect(state.root?.className?.endsWith('caller-root')).toBe(true);
  });
});
