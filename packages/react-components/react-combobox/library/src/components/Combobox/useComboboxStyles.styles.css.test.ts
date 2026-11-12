import type { ComboboxState } from './Combobox.types';
import { useComboboxStyles_unstable } from './useComboboxStyles.styles.css';

jest.mock('./Combobox.module.css', () => ({
  root: 'css-root',
  input: 'css-input',
  icon: 'css-icon',
  listbox: 'css-listbox',
  small: 'css-small',
  medium: 'css-medium',
  large: 'css-large',
  outline: 'css-outline',
  underline: 'css-underline',
  'filled-lighter': 'css-filled-lighter',
  'filled-darker': 'css-filled-darker',
  invalid: 'css-invalid',
  disabled: 'css-disabled',
  inline: 'css-inline',
  collapsed: 'css-collapsed',
  hidden: 'css-hidden',
  visuallyHidden: 'css-visuallyHidden',
}));

const createState = (overrides: Partial<ComboboxState> = {}): ComboboxState =>
  ({
    root: { className: 'caller-root' },
    input: { className: 'caller-input' },
    expandIcon: { className: 'caller-expandIcon' },
    clearIcon: { className: 'caller-clearIcon' },
    listbox: { className: 'caller-listbox' },
    appearance: 'outline',
    size: 'medium',
    open: true,
    inlinePopup: false,
    ...overrides,
  } as unknown as ComboboxState);

describe('useComboboxStyles_unstable (CSS Modules)', () => {
  it('preserves stable slot classes, caller classes last, and state identity', () => {
    const state = createState();
    expect(useComboboxStyles_unstable(state)).toBe(state);
    expect(state.root.className).toContain('fui-Combobox');
    expect(state.root.className).toMatch(/caller-root$/);
    expect(state.input.className).toContain('fui-Combobox__input');
    expect(state.input.className).toMatch(/caller-input$/);
    expect(state.expandIcon!.className).toContain('fui-Combobox__expandIcon');
    expect(state.expandIcon!.className).toMatch(/caller-expandIcon$/);
    expect(state.clearIcon!.className).toContain('fui-Combobox__clearIcon');
    expect(state.clearIcon!.className).toMatch(/caller-clearIcon$/);
    expect(state.listbox!.className).toContain('fui-Combobox__listbox');
    expect(state.listbox!.className).toMatch(/caller-listbox$/);
    expect(state.root.className).toContain('css-root');
  });
  it('accepts absent optional slots', () => {
    const state = createState({ expandIcon: undefined, clearIcon: undefined, listbox: undefined });
    expect(() => useComboboxStyles_unstable(state)).not.toThrow();
  });
  it.each(['small', 'medium', 'large'] as const)('maps size %s to the root only', size => {
    const state = createState({ size });
    useComboboxStyles_unstable(state);
    expect(state.root.className).toContain('css-' + size);
    expect(state.input.className).not.toContain('css-' + size);
    expect(state.expandIcon!.className).not.toContain('css-' + size);
    expect(state.clearIcon!.className).not.toContain('css-' + size);
    expect(state.listbox!.className).not.toContain('css-' + size);
  });
  it.each(['outline', 'underline', 'filled-lighter', 'filled-darker'] as const)(
    'maps appearance %s to the root',
    appearance => {
      const state = createState({ appearance });
      useComboboxStyles_unstable(state);
      expect(state.root.className).toContain('css-' + appearance);
    },
  );
  it('keeps disabled and invalid states on the root', () => {
    const state = createState({ input: { className: 'caller-input', disabled: true, 'aria-invalid': true } });
    useComboboxStyles_unstable(state);
    expect(state.root.className).toContain('css-disabled');
    expect(state.root.className).toContain('css-invalid');
    expect(state.root.className).toMatch(/caller-root$/);
  });
  it('omits inactive state classes by default', () => {
    const state = createState();
    useComboboxStyles_unstable(state);
    expect(state.root.className).not.toContain('css-disabled');
    expect(state.root.className).not.toContain('css-invalid');
  });
  it.each([false, true])('styles portaled listboxes independently and maps clear visibility %s', visible => {
    const state = createState({ showClearIcon: visible, open: false, inlinePopup: true });
    useComboboxStyles_unstable(state);
    expect(state.listbox!.className).toBe('fui-Combobox__listbox css-listbox css-inline css-collapsed caller-listbox');
    expect(state.clearIcon!.className!.includes('css-hidden')).toBe(!visible);
    expect(state.expandIcon!.className!.includes('css-visuallyHidden')).toBe(visible);
  });
  it('does not style false aria-invalid as invalid', () => {
    const state = createState({ input: { 'aria-invalid': false } });
    useComboboxStyles_unstable(state);
    expect(state.root.className).not.toContain('css-invalid');
    expect(state.listbox!.className).not.toContain('css-collapsed');
    expect(state.listbox!.className).not.toContain('css-inline');
  });
});
