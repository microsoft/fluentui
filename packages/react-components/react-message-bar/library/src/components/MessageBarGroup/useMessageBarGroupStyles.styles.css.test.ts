import { renderHook } from '@testing-library/react-hooks';
import { useMessageBarGroupStyles_unstable } from './useMessageBarGroupStyles.styles.css';

type State = Parameters<typeof useMessageBarGroupStyles_unstable>[0];

jest.mock('./MessageBarGroup.module.css', () => ({}));

const createState = (overrides: Partial<State> = {}): State =>
  ({
    components: { root: 'div' },
    root: { className: 'caller-root' },
    ...overrides,
  } as State);

describe('useMessageBarGroupStyles_unstable (CSS Modules)', () => {
  it('preserves slot names and caller classes', () => {
    const state = createState();
    const { result } = renderHook(() => useMessageBarGroupStyles_unstable(state));
    expect(result.current).toBe(state);
    expect(state.root?.className).toContain('fui-MessageBarGroup');
    expect(state.root?.className?.endsWith('caller-root')).toBe(true);
  });
});
