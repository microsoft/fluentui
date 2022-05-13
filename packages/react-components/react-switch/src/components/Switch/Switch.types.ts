import * as React from 'react';
import { Label } from '@fluentui/react-label';
import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';

export type SwitchSlots = {
  /**
   * The root element of the Switch.
   *
   * The root slot receives the `className` and `style` specified directly on the `<Switch>` tag.
   * All other native props will be applied to the primary slot: `input`.
   */
  root: NonNullable<Slot<'div'>>;

  /**
   * The track and the thumb sliding over it indicating the on and off status of the Switch.
   */
  indicator: NonNullable<Slot<'div'>>;

  /**
   * Hidden input that handles the Switch's functionality.
   *
   * This is the PRIMARY slot: all native properties specified directly on the `<Switch>` tag will be applied to this
   * slot, except `className` and `style`, which remain on the root slot.
   */
  input: NonNullable<Slot<'input'>>;

  /**
   * The Switch's label.
   */
  label?: Slot<typeof Label>;
};

export type SwitchOnChangeData = {
  checked: boolean;
};

/**
 * Switch Props
 */
export type SwitchProps = Omit<ComponentProps<Partial<SwitchSlots>, 'input'>, 'onChange'> & {
  /**
   * Defines the controlled checked state of the Switch.
   * If passed, Switch ignores the `defaultChecked` property.
   * This should only be used if the checked state is to be controlled at a higher level and there is a plan to pass the
   * correct value based on handling `onChange` events and re-rendering.
   *
   * @default false
   */
  checked?: boolean;

  /**
   * Defines whether the Switch is initially in a checked state or not when rendered.
   *
   * @default false
   */
  defaultChecked?: boolean;

  /**
   * The position of the label relative to the Switch.
   *
   * @default after
   */
  labelPosition?: 'above' | 'after' | 'before';

  /**
   * Callback to be called when the checked state value changes.
   */
  onChange?: (ev: React.ChangeEvent<HTMLInputElement>, data: SwitchOnChangeData) => void;
};

/**
 * State used in rendering Switch
 */
export type SwitchState = ComponentState<SwitchSlots> & Required<Pick<SwitchProps, 'labelPosition'>>;
