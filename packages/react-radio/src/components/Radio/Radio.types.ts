import { Label } from '@fluentui/react-label';
import type { InputHTMLAttributes } from 'react';
import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';

export type RadioSlots = {
  root: Slot<'span'>;

  /**
   * Renders the radio indicator.
   */
  indicator: Slot<'div'>;

  /**
   * Hidden input that handles the checkbox's functionality.
   */
  input: Slot<'input'>;

  /**
   * Label to be associated with RadioGroup element.
   */
  label: Slot<typeof Label>;

  /**
   * Subtext added below label.
   */
  subtext?: Slot<'span'> | null;
};

export type RadioCommons = InputHTMLAttributes<HTMLInputElement> & {
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
 * Radio Props
 */
export type RadioProps = ComponentProps<Partial<RadioSlots>> &
  RadioCommons & {
    /**
     * ID of the native element that represents the checkbox.
     */
    id?: string;
  };

/**
 * State used in rendering Radio
 */
export type RadioState = ComponentState<RadioSlots> & RadioCommons;
