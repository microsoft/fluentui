import * as React from 'react';
import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';

export type RadioGroupSlots = {
  /**
   * The radio group root.
   */
  root: NonNullable<Slot<'div'>>;
};

export type RadioGroupProps = Omit<ComponentProps<Partial<RadioGroupSlots>>, 'onChange'> & {
  /**
   * The name of this radio group. This name is applied to all Radio items inside this group.
   *
   * If no name is provided, one will be generated so that all of the Radio items have the same name.
   */
  name?: string;

  /**
   * The selected Radio item in this group.
   *
   * This should be the `value` prop of one of the Radio items inside this group.
   */
  value?: string;

  /**
   * The default selected Radio item in this group.
   *
   * This should be the `value` prop of one of the Radio items inside this group.
   */
  defaultValue?: string;

  /**
   * Callback when the selected Radio item changes.
   */
  onChange?: (ev: React.FormEvent<HTMLDivElement>, data: RadioGroupOnChangeData) => void;

  /**
   * How the radio items are laid out in the group.
   *
   * @default vertical
   */
  layout?: 'vertical' | 'horizontal' | 'horizontalStacked';

  /**
   * Disable all Radio items in this group.
   */
  disabled?: boolean;

  /**
   * Require all Radio items in this group.
   */
  required?: boolean;
};

/**
 * Data for the onChange event for RadioGroup.
 */
export type RadioGroupOnChangeData = {
  /**
   * The value of the newly selected Radio item.
   */
  value: string;
};

/**
 * State used in rendering RadioGroup
 */
export type RadioGroupState = ComponentState<RadioGroupSlots> &
  Required<Pick<RadioGroupProps, 'layout'>> &
  Partial<Exclude<RadioGroupProps, 'onChange' | 'layout'>>;

export type RadioGroupContextValue = Pick<
  RadioGroupProps,
  'name' | 'value' | 'defaultValue' | 'disabled' | 'layout' | 'required'
>;

export type RadioGroupContextValues = {
  radioGroup: RadioGroupContextValue;
};
