import type { Slot } from '@fluentui/react-utilities';
import type { OptionProps, OptionSlots, OptionState } from '../../Dropdown/Option';

export type TagPickerOptionSlots = OptionSlots & {
  /**
   * Media rendered before the option's text content (e.g. an avatar or icon).
   */
  media?: Slot<'span'>;
  /**
   * Secondary text rendered after the option's text content.
   */
  secondaryContent?: Slot<'span'>;
};

/**
 * TagPickerOption Props
 */
export type TagPickerOptionProps = OptionProps & {
  media?: Slot<'span'>;
  secondaryContent?: Slot<'span'>;
};

/**
 * State used in rendering the headless TagPickerOption.
 */
export type TagPickerOptionState = OptionState & {
  components: OptionState['components'] & {
    media: 'span';
    secondaryContent: 'span';
  };
  media?: Slot<'span'>;
  secondaryContent?: Slot<'span'>;
};
