import { OptionSlots, OptionState } from '@fluentui/react-combobox';
import { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';
import * as React from 'react';

export type TagPickerOptionSlots = Pick<OptionSlots, 'root'> & {
  media?: Slot<'div'>;
  secondaryContent?: Slot<'span'>;
};

/**
 * TagPickerOption Props
 */
export type TagPickerOptionProps = ComponentProps<TagPickerOptionSlots> & {
  value: string;
} & (
    | {
        /**
         * An optional override the string value of the Option's display text,
         * defaulting to the Option's child content.
         * This is used as the Dropdown button's or Combobox input's value when the option is selected,
         * and as the comparison for type-to-find keyboard functionality.
         */
        text?: string;
        children: string;
      }
    | {
        /**
         * The string value of the Option's display text when the Option's children are not a string.
         * This is used as the Dropdown button's or Combobox input's value when the option is selected,
         * and as the comparison for type-to-find keyboard functionality.
         */
        text: string;
        children?: React.ReactNode;
      }
  );

/**
 * State used in rendering TagPickerOption
 */
export type TagPickerOptionState = ComponentState<TagPickerOptionSlots> & Pick<OptionState, 'components' | 'root'>;
