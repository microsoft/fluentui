import { renderHook } from '@testing-library/react-hooks';
import { useMessageBarActionsStyles_unstable } from './useMessageBarActionsStyles.styles.css';

type State = Parameters<typeof useMessageBarActionsStyles_unstable>[0];

jest.mock('./MessageBarActions.module.css', () => ({
  containerAction: 'css-containerAction',
  multiline: 'css-multiline',
  noActions: 'css-noActions',
  root: 'css-root',
}));

const createState = (overrides: Partial<State> = {}): State =>
  ({
    layout: 'singleline',
    hasActions: true,
    components: { root: 'div' },
    root: { className: 'caller-root' },
    containerAction: { className: 'caller-containerAction' },
    ...overrides,
  } as State);

describe('useMessageBarActionsStyles_unstable (CSS Modules)', () => {
  it('preserves slot names and caller classes', () => {
    const state = createState();
    const { result } = renderHook(() => useMessageBarActionsStyles_unstable(state));
    expect(result.current).toBe(state);
    expect(state.root?.className).toContain('fui-MessageBarActions');
    expect(state.root?.className?.endsWith('caller-root')).toBe(true);
    expect(state.containerAction?.className).toContain('fui-MessageBarActions__containerAction');
    expect(state.containerAction?.className?.endsWith('caller-containerAction')).toBe(true);
  });

  it('supports omitted optional slots', () => {
    const state = createState({ containerAction: undefined });
    expect(() => renderHook(() => useMessageBarActionsStyles_unstable(state))).not.toThrow();
  });

  it.each([false, true])('maps hasActions=%s independently of layout', hasActions => {
    const state = createState({ hasActions, layout: 'multiline' });
    renderHook(() => useMessageBarActionsStyles_unstable(state));
    expect(state.root.className?.includes('css-noActions')).toBe(!hasActions);
    expect(state.root.className).toContain('css-multiline');
    expect(state.containerAction?.className).not.toContain('css-multiline');
  });
});
