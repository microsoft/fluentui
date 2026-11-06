import type { DatePickerState } from './DatePicker.types';
import { useDatePickerStyles_unstable } from './useDatePickerStyles.styles.css';

jest.mock('./DatePicker.module.css', () => ({
  root: 'css-root',
  disabled: 'css-disabled',
  popupSurface: 'css-popupSurface',
  inline: 'css-inline',
}));

const createState = (overrides: Partial<DatePickerState> = {}): DatePickerState =>
  ({
    root: { className: 'caller-root' },
    calendar: { className: 'caller-calendar' },
    popupSurface: { className: 'caller-popupSurface' },
    disabled: false,
    inlinePopup: false,
    ...overrides,
  } as unknown as DatePickerState);

describe('useDatePickerStyles_unstable (CSS Modules)', () => {
  it('preserves stable slot classes, caller classes last, and state identity', () => {
    const state = createState();
    expect(useDatePickerStyles_unstable(state)).toBe(state);
    expect(state.root.className).toContain('fui-DatePicker');
    expect(state.root.className).toMatch(/caller-root$/);
    expect(state.calendar.className).toContain('fui-DatePicker__calendar');
    expect(state.calendar.className).toMatch(/caller-calendar$/);
    expect(state.popupSurface!.className).toContain('fui-DatePicker__popupSurface');
    expect(state.popupSurface!.className).toMatch(/caller-popupSurface$/);
    expect(state.root.className).toContain('css-root');
  });
  it('accepts absent optional slots', () => {
    const state = createState({ popupSurface: undefined });
    expect(() => useDatePickerStyles_unstable(state)).not.toThrow();
  });
  it.each([false, true])('maps disabled and inline popup %s independently to their owning slots', enabled => {
    const state = createState({ disabled: enabled, inlinePopup: enabled });
    useDatePickerStyles_unstable(state);
    expect(state.root.className!.includes('css-disabled')).toBe(enabled);
    expect(state.root.className).not.toContain('css-inline');
    expect(state.popupSurface!.className!.includes('css-inline')).toBe(enabled);
    expect(state.popupSurface!.className).not.toContain('css-disabled');
    expect(state.popupSurface!.className).toMatch(/caller-popupSurface$/);
  });
});
