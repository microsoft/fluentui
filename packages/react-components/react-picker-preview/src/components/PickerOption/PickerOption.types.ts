import { OptionProps, OptionSlots, OptionState } from '@fluentui/react-combobox';
import { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';
import * as React from 'react';

export type PickerOptionSlots = Omit<OptionSlots, 'checkIcon'> & {
  media?: Slot<'div'>;
  secondaryContent?: Slot<'span'>;
};

/**
 * PickerOption Props
 */
export type PickerOptionProps = ComponentProps<PickerOptionSlots> &
  Omit<OptionProps, 'checkIcon'> & {
    children: React.ReactNode;
    text?: string;
    value: string;
  };

/**
 * State used in rendering PickerOption
 */
export type PickerOptionState = ComponentState<PickerOptionSlots> & Omit<OptionState, 'checkIcon'>;
