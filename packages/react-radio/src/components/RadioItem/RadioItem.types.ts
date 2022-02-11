import { Label } from '@fluentui/react-label';
import type { InputHTMLAttributes } from 'react';
import type { ComponentProps, ComponentState, ComponentRender, Slot } from '@fluentui/react-utilities';

export type RadioItemSlots = {
  root: Slot<'span'>;

  /**
   * Renders the radio indicator.
   */
  indicator: NonNullable<Slot<'div'>>;

  /**
   * Hidden input that handles the checkbox's functionality.
   */
  input: NonNullable<Slot<'input'>>;

  /**
   * Label to be associated with Radio element.
   */
  label: NonNullable<Slot<typeof Label>>;

  /**
   * Subtext added below label.
   */
  subtext?: Slot<'span'>;
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
export type RadioItemProps = ComponentProps<Partial<RadioItemSlots>> &
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

export type RadioItemRender = ComponentRender<RadioItemState>;
