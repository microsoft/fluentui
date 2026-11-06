import { useOptionStyles_unstable } from '@fluentui/react-combobox';
import type { TagPickerOptionState } from './TagPickerOption.types';
import { useTagPickerOptionStyles_unstable } from './useTagPickerOptionStyles.styles.css';

jest.mock('./TagPickerOption.module.css', () => ({
  root: 'css-root',
  withSecondaryContent: 'css-withSecondaryContent',
  media: 'css-media',
  secondaryContent: 'css-secondaryContent',
}));
jest.mock('@fluentui/react-combobox', () => ({
  ['useOptionStyles_unstable']: jest.fn((state: TagPickerOptionState) => {
    state.root.className = `base-root ${state.root.className ?? ''}`;
    return state;
  }),
}));

describe('useTagPickerOptionStyles_unstable (CSS Modules)', () => {
  it.each([false, true])('maps secondary content %s to root layout and styles optional slots', secondary => {
    const state = {
      root: { className: 'caller-root' },
      media: { className: 'caller-media' },
      secondaryContent: secondary ? { className: 'caller-secondaryContent' } : undefined,
    } as TagPickerOptionState;

    expect(useTagPickerOptionStyles_unstable(state)).toBe(state);
    expect(state.root.className).toBe(
      `base-root fui-TagPickerOption css-root${secondary ? ' css-withSecondaryContent' : ''} caller-root`,
    );
    expect(state.media?.className).toBe('fui-TagPickerOption__media css-media caller-media');
    if (secondary) {
      expect(state.secondaryContent?.className).toBe(
        'fui-TagPickerOption__secondaryContent css-secondaryContent caller-secondaryContent',
      );
      expect(state.secondaryContent?.className).not.toContain('css-withSecondaryContent');
    }
    expect(state.media?.className).not.toContain('css-withSecondaryContent');
    expect(useOptionStyles_unstable).toHaveBeenLastCalledWith({
      ...state,
      active: false,
      disabled: false,
      focusVisible: false,
      checkIcon: undefined,
      selected: false,
    });
  });

  it('accepts absent optional slots and caller classes', () => {
    const state = { root: {} } as TagPickerOptionState;
    useTagPickerOptionStyles_unstable(state);
    expect(state.root.className).toBe('base-root fui-TagPickerOption css-root');
    expect(state.media).toBeUndefined();
    expect(state.secondaryContent).toBeUndefined();
  });
});
