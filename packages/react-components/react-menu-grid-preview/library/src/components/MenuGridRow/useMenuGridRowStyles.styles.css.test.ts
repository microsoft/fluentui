import { renderHook } from '@testing-library/react-hooks';
import { useMenuGridRowStyles_unstable } from './useMenuGridRowStyles.styles.css';

type State = Parameters<typeof useMenuGridRowStyles_unstable>[0];

jest.mock('./MenuGridRow.module.css', () => ({
  root: 'css-root',
}));

const createState = (overrides: Partial<State> = {}): State =>
  ({
    components: { root: 'div' },
    root: { className: 'caller-root' },
    ...overrides,
  } as State);

describe('useMenuGridRowStyles_unstable (CSS Modules)', () => {
  it('preserves slot names and caller classes', () => {
    const state = createState();
    const { result } = renderHook(() => useMenuGridRowStyles_unstable(state));
    expect(result.current).toBe(state);
    expect(state.root?.className).toContain('fui-MenuGridRow');
    expect(state.root?.className?.endsWith('caller-root')).toBe(true);
  });
});
