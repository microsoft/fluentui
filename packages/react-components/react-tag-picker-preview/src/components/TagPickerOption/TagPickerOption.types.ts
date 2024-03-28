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
  children: React.ReactNode;
  text?: string;
  value: string;
};

/**
 * State used in rendering TagPickerOption
 */
export type TagPickerOptionState = ComponentState<TagPickerOptionSlots> &
  Pick<OptionState, 'components' | 'multiselect' | 'root' | 'selected'>;
