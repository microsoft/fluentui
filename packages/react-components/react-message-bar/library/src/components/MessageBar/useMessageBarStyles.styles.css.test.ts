import { renderHook } from '@testing-library/react-hooks';
import { useMessageBarStyles_unstable } from './useMessageBarStyles.styles.css';

type State = Parameters<typeof useMessageBarStyles_unstable>[0];

jest.mock('./MessageBar.module.css', () => ({
  bottomReflowSpacer: 'css-bottomReflowSpacer',
  error: 'css-error',
  icon: 'css-icon',
  multiline: 'css-multiline',
  root: 'css-root',
  square: 'css-square',
  success: 'css-success',
  warning: 'css-warning',
}));

const createState = (overrides: Partial<State> = {}): State =>
  ({
    layout: 'singleline',
    shape: 'rounded',
    intent: 'info',
    components: { root: 'div' },
    root: { className: 'caller-root' },
    icon: { className: 'caller-icon' },
    bottomReflowSpacer: { className: 'caller-bottomReflowSpacer' },
    ...overrides,
  } as State);

describe('useMessageBarStyles_unstable (CSS Modules)', () => {
  it('preserves slot names and caller classes', () => {
    const state = createState();
    const { result } = renderHook(() => useMessageBarStyles_unstable(state));
    expect(result.current).toBe(state);
    expect(state.root?.className).toContain('fui-MessageBar');
    expect(state.root?.className?.endsWith('caller-root')).toBe(true);
    expect(state.icon?.className).toContain('fui-MessageBar__icon');
    expect(state.icon?.className?.endsWith('caller-icon')).toBe(true);
    expect(state.bottomReflowSpacer?.className).toContain('fui-MessageBar__bottomReflowSpacer');
    expect(state.bottomReflowSpacer?.className?.endsWith('caller-bottomReflowSpacer')).toBe(true);
  });

  it('supports omitted optional slots', () => {
    const state = createState({ icon: undefined, bottomReflowSpacer: undefined });
    expect(() => renderHook(() => useMessageBarStyles_unstable(state))).not.toThrow();
  });

  it.each(['info', 'success', 'warning', 'error'] as const)('owns the %s intent on the root', intent => {
    const state = createState({ intent, layout: 'multiline', shape: 'square' });
    renderHook(() => useMessageBarStyles_unstable(state));
    if (intent !== 'info') {
      expect(state.root.className).toContain('css-' + intent);
    }
    expect(state.root.className).toContain('css-multiline');
    expect(state.root.className).toContain('css-square');
    expect(state.icon?.className).toBe('fui-MessageBar__icon css-icon caller-icon');
  });
});
