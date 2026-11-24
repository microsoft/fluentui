import { renderHook } from '@testing-library/react-hooks';
import { useMenuGridGroupHeaderStyles_unstable } from './useMenuGridGroupHeaderStyles.styles.css';

type State = Parameters<typeof useMenuGridGroupHeaderStyles_unstable>[0];

jest.mock('./MenuGridGroupHeader.module.css', () => ({
  root: 'css-root',
}));

const createState = (overrides: Partial<State> = {}): State =>
  ({
    components: { root: 'div' },
    root: { className: 'caller-root' },
    ...overrides,
  } as State);

describe('useMenuGridGroupHeaderStyles_unstable (CSS Modules)', () => {
  it('preserves slot names and caller classes', () => {
    const state = createState();
    const { result } = renderHook(() => useMenuGridGroupHeaderStyles_unstable(state));
    expect(result.current).toBe(state);
    expect(state.root?.className).toContain('fui-MenuGridGroupHeader');
    expect(state.root?.className?.endsWith('caller-root')).toBe(true);
  });
});
