import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';
import { Label } from '@fluentui/react-label';
import { RadioContextValue } from '../../contexts/RadioContext';

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
export type RadioGroupProps = ComponentProps<Partial<RadioGroupSlots>> & {
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
};

/**
 * State used in rendering RadioGroup
 */
export type RadioGroupState = ComponentState<RadioGroupSlots> &
  Pick<RadioGroupProps, 'layout' | 'required'> & {
    context: RadioContextValue;
  };
