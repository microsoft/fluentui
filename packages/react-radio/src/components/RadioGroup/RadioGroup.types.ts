import * as React from 'react';
import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';
import { Label } from '@fluentui/react-label';
import { RadioGroupContextValue } from '../../contexts/RadioGroupContext';

export type RadioGroupSlots = {
  root: Slot<'fieldset'>;

  /**
   * The label of the radio group.
   */
  label: Slot<typeof Label>;
};

/**
 * RadioGroup Props
 */
export type RadioGroupProps = Omit<ComponentProps<Partial<RadioGroupSlots>>, 'onChange'> & {
  /**
   * How the radio items are laid out in the group
   *
   * @defaultvalue vertical
   */
  layout?: 'vertical' | 'horizontal' | 'horizontalStacked';

  /**
   * Styles the group's label to have an asterisk to indicate it is required.
   */
  required?: boolean;

  /**
   * Controls the selcted Radio item in this group.
   *
   * This should be the value prop of one of the Radio items inside this group.
   */
  value?: string;

  /**
   * The default selected Radio item in this group.
   *
   * This should be the value prop of one of the Radio items inside this group.
   */
  defaultValue?: string;

  /**
   * Callback when the selected radio button changes.
   */
  onChange?: (ev: React.FormEvent<HTMLInputElement>, data: RadioGroupOnChangeData) => void;
};

/**
 * Data for the onChange event for RadioGroup.
 */
export type RadioGroupOnChangeData = {
  value?: string;
};

/**
 * State used in rendering RadioGroup
 */
export type RadioGroupState = ComponentState<RadioGroupSlots> &
  Pick<RadioGroupProps, 'layout' | 'required'> & {
    context: RadioGroupContextValue;
  };
