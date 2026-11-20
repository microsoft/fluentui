import type { TagPickerButtonState } from './TagPickerButton.types';
import { useTagPickerButtonStyles_unstable } from './useTagPickerButtonStyles.styles.css';

jest.mock('./TagPickerButton.module.css', () => ({
  root: 'css-root',
  medium: 'css-medium',
  large: 'css-large',
  'extra-large': 'css-extra-large',
  hasSelectedOption: 'css-hasSelectedOption',
}));

const createState = (overrides: Partial<TagPickerButtonState> = {}): TagPickerButtonState =>
  ({
    root: { className: 'caller-root' },
    size: 'medium',
    hasSelectedOption: false,
    ...overrides,
  } as unknown as TagPickerButtonState);

describe('useTagPickerButtonStyles_unstable (CSS Modules)', () => {
  it('preserves stable slot classes, caller classes last, and state identity', () => {
    const state = createState();
    expect(useTagPickerButtonStyles_unstable(state)).toBe(state);
    expect(state.root.className).toContain('fui-TagPickerButton');
    expect(state.root.className).toMatch(/caller-root$/);
    expect(state.root.className).toContain('css-root');
  });
  it.each(['medium', 'large', 'extra-large'] as const)('maps size %s to the root only', size => {
    const state = createState({ size });
    useTagPickerButtonStyles_unstable(state);
    expect(state.root.className).toContain('css-' + size);
  });
  it.each([false, true])('maps selected-option visibility %s', hasSelectedOption => {
    const state = createState({ hasSelectedOption });
    useTagPickerButtonStyles_unstable(state);
    expect(state.root.className!.includes('css-hasSelectedOption')).toBe(hasSelectedOption);
  });
});
