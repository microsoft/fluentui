import { useComboboxStyles_unstable } from '@fluentui/react-combobox';
import type { TimePickerState } from './TimePicker.types';
import { useTimePickerStyles_unstable } from './useTimePickerStyles.styles.css';

jest.mock('./TimePicker.module.css', () => ({ listbox: 'css-listbox' }));
jest.mock('@fluentui/react-combobox', () => ({
  ['useComboboxStyles_unstable']: jest.fn((state: TimePickerState) => {
    state.root.className = `base-root ${state.root.className ?? ''}`;
    state.input.className = `base-input ${state.input.className ?? ''}`;
    if (state.listbox) {
      state.listbox.className = `base-listbox ${state.listbox.className ?? ''}`;
    }
    return state;
  }),
}));

describe('useTimePickerStyles_unstable (CSS Modules)', () => {
  it('adds every stable slot class before composing Combobox and preserves caller classes last', () => {
    const state = {
      root: { className: 'caller-root' },
      input: { className: 'caller-input' },
      expandIcon: { className: 'caller-expandIcon' },
      clearIcon: { className: 'caller-clearIcon' },
      listbox: { className: 'caller-listbox' },
    } as TimePickerState;

    expect(useTimePickerStyles_unstable(state)).toBe(state);
    expect(useComboboxStyles_unstable).toHaveBeenLastCalledWith(state);
    expect(state.root.className).toBe('base-root fui-TimePicker caller-root');
    expect(state.input.className).toBe('base-input fui-TimePicker__input caller-input');
    expect(state.expandIcon?.className).toBe('fui-TimePicker__expandIcon caller-expandIcon');
    expect(state.clearIcon?.className).toBe('fui-TimePicker__clearIcon caller-clearIcon');
    expect(state.listbox?.className).toBe('base-listbox fui-TimePicker__listbox css-listbox caller-listbox');
    expect(state.root.className).not.toContain('css-listbox');
  });

  it('accepts absent optional slots and caller classes', () => {
    const state = { root: {}, input: {} } as TimePickerState;
    expect(useTimePickerStyles_unstable(state)).toBe(state);
    expect(state.expandIcon).toBeUndefined();
    expect(state.clearIcon).toBeUndefined();
    expect(state.listbox).toBeUndefined();
    expect(state.root.className).toBe('base-root fui-TimePicker');
    expect(state.input.className).toBe('base-input fui-TimePicker__input');
  });
});
