import type { OptionGroupState } from './OptionGroup.types';
import { useOptionGroupStyles_unstable } from './useOptionGroupStyles.styles.css';

jest.mock('./OptionGroup.module.css', () => ({
  root: 'css-root',
  label: 'css-label',
}));

const createState = (overrides: Partial<OptionGroupState> = {}): OptionGroupState =>
  ({
    root: { className: 'caller-root' },
    label: { className: 'caller-label' },
    ...overrides,
  } as unknown as OptionGroupState);

describe('useOptionGroupStyles_unstable (CSS Modules)', () => {
  it('preserves stable slot classes, caller classes last, and state identity', () => {
    const state = createState();
    expect(useOptionGroupStyles_unstable(state)).toBe(state);
    expect(state.root.className).toContain('fui-OptionGroup');
    expect(state.root.className).toMatch(/caller-root$/);
    expect(state.label!.className).toContain('fui-OptionGroup__label');
    expect(state.label!.className).toMatch(/caller-label$/);
    expect(state.root.className).toContain('css-root');
  });
  it('accepts absent optional slots', () => {
    const state = createState({ label: undefined });
    expect(() => useOptionGroupStyles_unstable(state)).not.toThrow();
  });
});
