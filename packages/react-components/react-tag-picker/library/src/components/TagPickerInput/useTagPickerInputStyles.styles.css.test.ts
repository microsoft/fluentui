import type { TagPickerInputState } from './TagPickerInput.types';
import { useTagPickerInputStyles_unstable } from './useTagPickerInputStyles.styles.css';

jest.mock('./TagPickerInput.module.css', () => ({
  root: 'css-root',
  medium: 'css-medium',
  large: 'css-large',
  'extra-large': 'css-extra-large',
  disabled: 'css-disabled',
}));

const createState = (overrides: Partial<TagPickerInputState> = {}): TagPickerInputState =>
  ({
    root: { className: 'caller-root' },
    size: 'medium',
    disabled: false,
    ...overrides,
  } as unknown as TagPickerInputState);

describe('useTagPickerInputStyles_unstable (CSS Modules)', () => {
  it('preserves stable slot classes, caller classes last, and state identity', () => {
    const state = createState();
    expect(useTagPickerInputStyles_unstable(state)).toBe(state);
    expect(state.root.className).toContain('fui-TagPickerInput');
    expect(state.root.className).toMatch(/caller-root$/);
    expect(state.root.className).toContain('css-root');
  });
  it.each(['medium', 'large', 'extra-large'] as const)('maps size %s to the root only', size => {
    const state = createState({ size });
    useTagPickerInputStyles_unstable(state);
    expect(state.root.className).toContain('css-' + size);
  });
  it('maps disabled without affecting caller order', () => {
    const state = createState({ disabled: true });
    useTagPickerInputStyles_unstable(state);
    expect(state.root.className).toBe('fui-TagPickerInput css-root css-medium css-disabled caller-root');
  });
});
