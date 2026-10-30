import { renderHook } from '@testing-library/react-hooks';
import { useMessageBarTitleStyles_unstable } from './useMessageBarTitleStyles.styles.css';

type State = Parameters<typeof useMessageBarTitleStyles_unstable>[0];

jest.mock('./MessageBarTitle.module.css', () => ({
  root: 'css-root',
}));

const createState = (overrides: Partial<State> = {}): State =>
  ({
    components: { root: 'div' },
    root: { className: 'caller-root' },
    ...overrides,
  } as State);

describe('useMessageBarTitleStyles_unstable (CSS Modules)', () => {
  it('preserves slot names and caller classes', () => {
    const state = createState();
    const { result } = renderHook(() => useMessageBarTitleStyles_unstable(state));
    expect(result.current).toBe(state);
    expect(state.root?.className).toContain('fui-MessageBarTitle');
    expect(state.root?.className?.endsWith('caller-root')).toBe(true);
  });
});
