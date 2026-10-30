import { renderHook } from '@testing-library/react-hooks';
import { useMenuListStyles_unstable } from './useMenuListStyles.styles.css';

type State = Parameters<typeof useMenuListStyles_unstable>[0];

jest.mock('./MenuList.module.css', () => ({
  hasMenuContext: 'css-hasMenuContext',
  root: 'css-root',
}));

const createState = (overrides: Partial<State> = {}): State =>
  ({
    hasMenuContext: false,
    components: { root: 'div' },
    root: { className: 'caller-root' },
    ...overrides,
  } as State);

describe('useMenuListStyles_unstable (CSS Modules)', () => {
  it('preserves slot names and caller classes', () => {
    const state = createState();
    const { result } = renderHook(() => useMenuListStyles_unstable(state));
    expect(result.current).toBe(state);
    expect(state.root?.className).toContain('fui-MenuList');
    expect(state.root?.className?.endsWith('caller-root')).toBe(true);
  });

  it.each([false, true])('maps hasMenuContext=%s to the root', value => {
    const state = createState({ hasMenuContext: value });
    renderHook(() => useMenuListStyles_unstable(state));
    expect(state.root.className?.includes('css-hasMenuContext')).toBe(value);
  });
});
