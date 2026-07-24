import type { ComponentState, Slot } from '@fluentui/react-utilities';
import type { OptionProps, OptionSlots, OptionState } from '../../Dropdown/Option';

export type TagPickerOptionSlots = OptionSlots & {
  /**
   * Media rendered before the option's text content (e.g. an avatar or icon).
   */
  media?: Slot<'div'>;
  /**
   * Secondary text rendered after the option's text content.
   */
  secondaryContent?: Slot<'span'>;
};

/**
 * TagPickerOption Props
 */
export type TagPickerOptionProps = OptionProps & {
  media?: Slot<'div'>;
  secondaryContent?: Slot<'span'>;
};

/**
 * State used in rendering the headless TagPickerOption.
 */
export type TagPickerOptionState = OptionState & ComponentState<TagPickerOptionSlots>;
