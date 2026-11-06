import type { OptionState } from './Option.types';
import { useOptionStyles_unstable } from './useOptionStyles.styles.css';

jest.mock('./Option.module.css', () => ({
  root: 'css-root',
  checkIcon: 'css-checkIcon',
  disabled: 'css-disabled',
  selected: 'css-selected',
  multiselect: 'css-multiselect',
}));

const createState = (overrides: Partial<OptionState> = {}): OptionState =>
  ({
    root: { className: 'caller-root' },
    checkIcon: { className: 'caller-checkIcon' },
    disabled: false,
    selected: false,
    multiselect: false,
    ...overrides,
  } as unknown as OptionState);

describe('useOptionStyles_unstable (CSS Modules)', () => {
  it('preserves stable slot classes, caller classes last, and state identity', () => {
    const state = createState();
    expect(useOptionStyles_unstable(state)).toBe(state);
    expect(state.root.className).toContain('fui-Option');
    expect(state.root.className).toMatch(/caller-root$/);
    expect(state.checkIcon!.className).toContain('fui-Option__checkIcon');
    expect(state.checkIcon!.className).toMatch(/caller-checkIcon$/);
    expect(state.root.className).toContain('css-root');
  });
  it('accepts absent optional slots', () => {
    const state = createState({ checkIcon: undefined });
    expect(() => useOptionStyles_unstable(state)).not.toThrow();
  });
  it.each([false, true])('maps selection, multiselect and disabled states %s to root only', enabled => {
    const state = createState({ selected: enabled, multiselect: enabled, disabled: enabled });
    useOptionStyles_unstable(state);
    for (const key of ['selected', 'multiselect', 'disabled']) {
      expect(state.root.className!.includes('css-' + key)).toBe(enabled);
      expect(state.checkIcon!.className).not.toContain('css-' + key);
    }
    expect(state.checkIcon!.className).toBe('fui-Option__checkIcon css-checkIcon caller-checkIcon');
  });
});
