import { Label } from '@fluentui/react-label';
import type { InputHTMLAttributes } from 'react';
import type { ComponentProps, ComponentSlotProps, ComponentState, IntrinsicSlotProps } from '@fluentui/react-utilities';

export type RadioItemSlots = {
  root: IntrinsicSlotProps<'span'>;

  /**
   * Renders the radio indicator.
   */
  indicator: IntrinsicSlotProps<'div'>;

  /**
   * Hidden input that handles the checkbox's functionality.
   */
  input: IntrinsicSlotProps<'input'>;

  /**
   * Label to be associated with Radio element.
   */
  label: ComponentSlotProps<typeof Label>;

  /**
   * Subtext added below label.
   */
  subtext?: IntrinsicSlotProps<'span'>;
};

export type RadioItemCommons = InputHTMLAttributes<HTMLInputElement> & {
  /**
   * Determines whether the label should be positioned bellow the indicator or next to it.
   * @defaultvalue 'inline'
   */
  labelPosition?: 'bottom' | 'inline';
  /**
   * Field required to pass className to container instead of input
   * this will be solved by https://github.com/microsoft/fluentui/pull/18983
   */
  containerClassName?: string;
};

/**
 * RadioItem Props
 */
export type RadioItemProps = ComponentProps<RadioItemSlots> &
  RadioItemCommons & {
    /**
     * ID of the native element that represents the checkbox.
     */
    id?: string;
  };

/**
 * State used in rendering RadioItem
 */
export type RadioItemState = ComponentState<RadioItemSlots> & RadioItemCommons;
