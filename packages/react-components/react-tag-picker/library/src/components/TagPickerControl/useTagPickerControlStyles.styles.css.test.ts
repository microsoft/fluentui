import type { TagPickerControlState } from './TagPickerControl.types';
import {
  iconSizes,
  tagPickerControlAsideWidthToken,
  useTagPickerControlStyles_unstable,
} from './useTagPickerControlStyles.styles.css';

jest.mock('./TagPickerControl.module.css', () => ({
  root: 'css-root',
  aside: 'css-aside',
  icon: 'css-icon',
  secondaryAction: 'css-secondaryAction',
  medium: 'css-medium',
  large: 'css-large',
  'extra-large': 'css-extra-large',
  outline: 'css-outline',
  underline: 'css-underline',
  'filled-lighter': 'css-filled-lighter',
  'filled-darker': 'css-filled-darker',
  invalid: 'css-invalid',
  disabled: 'css-disabled',
}));

const createState = (overrides: Partial<TagPickerControlState> = {}): TagPickerControlState =>
  ({
    root: { className: 'caller-root' },
    aside: { className: 'caller-aside' },
    expandIcon: { className: 'caller-expandIcon' },
    secondaryAction: { className: 'caller-secondaryAction' },
    appearance: 'outline',
    size: 'medium',
    disabled: false,
    invalid: false,
    ...overrides,
  } as unknown as TagPickerControlState);

describe('useTagPickerControlStyles_unstable (CSS Modules)', () => {
  it('preserves the shared width token and icon-size contracts', () => {
    expect(tagPickerControlAsideWidthToken).toBe('--fui-TagPickerControl-aside-width');
    expect(iconSizes).toEqual({ small: '16px', medium: '20px', large: '24px' });
  });
  it('preserves stable slot classes, caller classes last, and state identity', () => {
    const state = createState();
    expect(useTagPickerControlStyles_unstable(state)).toBe(state);
    expect(state.root.className).toContain('fui-TagPickerControl');
    expect(state.root.className).toMatch(/caller-root$/);
    expect(state.aside!.className).toContain('fui-TagPickerControl__aside');
    expect(state.aside!.className).toMatch(/caller-aside$/);
    expect(state.expandIcon!.className).toContain('fui-TagPickerControl__expandIcon');
    expect(state.expandIcon!.className).toMatch(/caller-expandIcon$/);
    expect(state.secondaryAction!.className).toContain('fui-TagPickerControl__secondaryAction');
    expect(state.secondaryAction!.className).toMatch(/caller-secondaryAction$/);
    expect(state.root.className).toContain('css-root');
  });
  it('accepts absent optional slots', () => {
    const state = createState({ aside: undefined, expandIcon: undefined, secondaryAction: undefined });
    expect(() => useTagPickerControlStyles_unstable(state)).not.toThrow();
  });
  it.each(['medium', 'large', 'extra-large'] as const)('maps size %s to the root only', size => {
    const state = createState({ size });
    useTagPickerControlStyles_unstable(state);
    expect(state.root.className).toContain('css-' + size);
    expect(state.aside!.className).not.toContain('css-' + size);
    expect(state.expandIcon!.className).not.toContain('css-' + size);
    expect(state.secondaryAction!.className).not.toContain('css-' + size);
  });
  it.each(['outline', 'underline', 'filled-lighter', 'filled-darker'] as const)(
    'maps appearance %s to the root',
    appearance => {
      const state = createState({ appearance });
      useTagPickerControlStyles_unstable(state);
      expect(state.root.className).toContain('css-' + appearance);
    },
  );
  it('keeps disabled and invalid states on the root', () => {
    const state = createState({ disabled: true, invalid: true });
    useTagPickerControlStyles_unstable(state);
    expect(state.root.className).toContain('css-disabled');
    expect(state.root.className).toContain('css-invalid');
    expect(state.root.className).toMatch(/caller-root$/);
  });
  it('omits inactive state classes by default', () => {
    const state = createState();
    useTagPickerControlStyles_unstable(state);
    expect(state.root.className).not.toContain('css-disabled');
    expect(state.root.className).not.toContain('css-invalid');
  });
});
