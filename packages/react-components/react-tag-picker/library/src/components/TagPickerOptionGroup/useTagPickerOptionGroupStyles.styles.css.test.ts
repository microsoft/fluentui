import { useOptionGroupStyles_unstable } from '@fluentui/react-combobox';
import type { TagPickerOptionGroupState } from './TagPickerOptionGroup.types';
import { useTagPickerOptionGroupStyles } from './useTagPickerOptionGroupStyles.styles.css';

jest.mock('@fluentui/react-combobox', () => ({
  ['useOptionGroupStyles_unstable']: jest.fn((state: TagPickerOptionGroupState) => {
    state.root.className = `base-root ${state.root.className ?? ''}`.trim();
    if (state.label) {
      state.label.className = `base-label ${state.label.className ?? ''}`;
    }
    return state;
  }),
}));

describe('useTagPickerOptionGroupStyles (CSS Modules)', () => {
  it('composes OptionGroup without own CSS rules and preserves caller classes last', () => {
    const state = {
      root: { className: 'caller-root' },
      label: { className: 'caller-label' },
    } as TagPickerOptionGroupState;
    expect(useTagPickerOptionGroupStyles(state)).toBe(state);
    expect(useOptionGroupStyles_unstable).toHaveBeenLastCalledWith(state);
    expect(state.root.className).toBe('fui-TagPickerOptionGroup base-root caller-root');
    expect(state.label?.className).toBe('fui-TagPickerOptionGroup__label base-label caller-label');
  });

  it('accepts an absent label and caller class', () => {
    const state = { root: {} } as TagPickerOptionGroupState;
    expect(useTagPickerOptionGroupStyles(state)).toBe(state);
    expect(state.label).toBeUndefined();
    expect(state.root.className).toBe('fui-TagPickerOptionGroup base-root');
  });
});
