import { renderHook } from '@testing-library/react-hooks';
import { useCheckmarkStyles_unstable } from './useCheckmarkStyles.styles.css';

type State = Parameters<typeof useCheckmarkStyles_unstable>[0];

jest.mock('./Checkmark.module.css', () => ({
  checked: 'css-checked',
  checkmark: 'css-checkmark',
}));

const createState = (overrides: Partial<State> = {}): State =>
  ({
    checked: false,
    components: { root: 'div' },
    checkmark: { className: 'caller-checkmark' },
    ...overrides,
  } as State);

describe('useCheckmarkStyles_unstable (CSS Modules)', () => {
  it('preserves slot names and caller classes', () => {
    const state = createState();
    const { result } = renderHook(() => useCheckmarkStyles_unstable(state));
    expect(result.current).toBeUndefined();
    expect(state.checkmark?.className?.endsWith('caller-checkmark')).toBe(true);
  });

  it('supports omitted optional slots', () => {
    const state = createState({ checkmark: undefined });
    expect(() => renderHook(() => useCheckmarkStyles_unstable(state))).not.toThrow();
  });

  it.each([false, true])('maps checked=%s without requiring a root slot', checked => {
    const state = createState({ checked });
    renderHook(() => useCheckmarkStyles_unstable(state));
    expect(state.checkmark?.className?.includes('css-checked')).toBe(checked);
  });
});
