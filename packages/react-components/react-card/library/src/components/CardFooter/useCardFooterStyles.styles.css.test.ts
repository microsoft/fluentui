import { renderHook } from '@testing-library/react-hooks';
import { useCardFooterStyles_unstable } from './useCardFooterStyles.styles.css';

type State = Parameters<typeof useCardFooterStyles_unstable>[0];

jest.mock('./CardFooter.module.css', () => ({
  action: 'css-action',
  root: 'css-root',
}));

const createState = (overrides: Partial<State> = {}): State =>
  ({
    components: { root: 'div' },
    root: { className: 'caller-root' },
    action: { className: 'caller-action' },
    ...overrides,
  } as State);

describe('useCardFooterStyles_unstable (CSS Modules)', () => {
  it('preserves slot names and caller classes', () => {
    const state = createState();
    const { result } = renderHook(() => useCardFooterStyles_unstable(state));
    expect(result.current).toBe(state);
    expect(state.root?.className).toContain('fui-CardFooter');
    expect(state.root?.className?.endsWith('caller-root')).toBe(true);
    expect(state.action?.className).toContain('fui-CardFooter__action');
    expect(state.action?.className?.endsWith('caller-action')).toBe(true);
  });

  it('supports omitted optional slots', () => {
    const state = createState({ action: undefined });
    expect(() => renderHook(() => useCardFooterStyles_unstable(state))).not.toThrow();
  });
});
