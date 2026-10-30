import type { DropdownState } from './Dropdown.types';
import { useDropdownStyles_unstable } from './useDropdownStyles.styles.css';

jest.mock('./Dropdown.module.css', () => ({
  root: 'css-root',
  button: 'css-button',
  icon: 'css-icon',
  clearButton: 'css-clearButton',
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
  placeholder: 'css-placeholder',
}));

const createState = (overrides: Partial<DropdownState> = {}): DropdownState =>
  ({
    root: { className: 'caller-root' },
    button: { className: 'caller-button' },
    expandIcon: { className: 'caller-expandIcon' },
    clearButton: { className: 'caller-clearButton' },
    listbox: { className: 'caller-listbox' },
    appearance: 'outline',
    size: 'medium',
    open: true,
    inlinePopup: false,
    ...overrides,
  } as unknown as DropdownState);

describe('useDropdownStyles_unstable (CSS Modules)', () => {
  it('preserves stable slot classes, caller classes last, and state identity', () => {
    const state = createState();
    expect(useDropdownStyles_unstable(state)).toBe(state);
    expect(state.root.className).toContain('fui-Dropdown');
    expect(state.root.className).toMatch(/caller-root$/);
    expect(state.button.className).toContain('fui-Dropdown__button');
    expect(state.button.className).toMatch(/caller-button$/);
    expect(state.expandIcon!.className).toContain('fui-Dropdown__expandIcon');
    expect(state.expandIcon!.className).toMatch(/caller-expandIcon$/);
    expect(state.clearButton!.className).toContain('fui-Dropdown__clearButton');
    expect(state.clearButton!.className).toMatch(/caller-clearButton$/);
    expect(state.listbox!.className).toContain('fui-Dropdown__listbox');
    expect(state.listbox!.className).toMatch(/caller-listbox$/);
    expect(state.root.className).toContain('css-root');
  });
  it('accepts absent optional slots', () => {
    const state = createState({ expandIcon: undefined, clearButton: undefined, listbox: undefined });
    expect(() => useDropdownStyles_unstable(state)).not.toThrow();
  });
  it.each(['small', 'medium', 'large'] as const)('maps size %s to the root only', size => {
    const state = createState({ size });
    useDropdownStyles_unstable(state);
    expect(state.root.className).toContain('css-' + size);
    expect(state.button.className).not.toContain('css-' + size);
    expect(state.expandIcon!.className).not.toContain('css-' + size);
    expect(state.clearButton!.className).not.toContain('css-' + size);
    expect(state.listbox!.className).not.toContain('css-' + size);
  });
  it.each(['outline', 'underline', 'filled-lighter', 'filled-darker'] as const)(
    'maps appearance %s to the root',
    appearance => {
      const state = createState({ appearance });
      useDropdownStyles_unstable(state);
      expect(state.root.className).toContain('css-' + appearance);
    },
  );
  it('keeps disabled and invalid states on the root', () => {
    const state = createState({ button: { className: 'caller-button', disabled: true, 'aria-invalid': true } });
    useDropdownStyles_unstable(state);
    expect(state.root.className).toContain('css-disabled');
    expect(state.root.className).toContain('css-invalid');
    expect(state.root.className).toMatch(/caller-root$/);
  });
  it('omits inactive state classes by default', () => {
    const state = createState();
    useDropdownStyles_unstable(state);
    expect(state.root.className).not.toContain('css-disabled');
    expect(state.root.className).not.toContain('css-invalid');
  });
  it.each([false, true])('styles portaled listboxes independently and maps clear visibility %s', visible => {
    const state = createState({ showClearButton: visible, open: false, inlinePopup: true });
    useDropdownStyles_unstable(state);
    expect(state.listbox!.className).toBe('fui-Dropdown__listbox css-listbox css-inline css-collapsed caller-listbox');
    expect(state.clearButton!.className!.includes('css-hidden')).toBe(!visible);
    expect(state.expandIcon!.className!.includes('css-hidden')).toBe(visible);
  });
  it('does not style false aria-invalid as invalid', () => {
    const state = createState({ button: { 'aria-invalid': false } });
    useDropdownStyles_unstable(state);
    expect(state.root.className).not.toContain('css-invalid');
    expect(state.listbox!.className).not.toContain('css-collapsed');
    expect(state.listbox!.className).not.toContain('css-inline');
  });
});
