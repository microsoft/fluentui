import * as React from 'react';
import { Label } from '@fluentui/react-label';
import { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';

export interface CheckboxCommonsUnstable {
  /**
   * Whether to render the checkbox in a circular shape instead of square.
   * This variant is only recommended to be used in a tasks-style UI (checklist),
   * since it otherwise could be confused for a `RadioItem`.
   * @defaultvalue false
   */
  circular: boolean;

  /**
   * A checkbox's state can be controlled.
   * @defaultvalue false
   */
  checked: 'mixed' | boolean;

  /**
   * Checkbox supports two different checkbox sizes.
   * @defaultvalue medium
   */
  size: 'medium' | 'large';

  /**
   * Determines whether the label should be positioned before or after the checkbox.
   * @defaultvalue after
   */
  labelPosition: 'before' | 'after';
}

/**
 * Data for the onChange event for checkbox.
 */
export interface CheckboxOnChangeData {
  checked: 'mixed' | boolean;
}

export type CheckboxSlots = {
  /**
   * The root element of the Checkbox.
   *
   * The root slot receives the `className` and `style` specified directly on the `<Checkbox>`.
   * All other native props will be applied to the primary slot: `input`
   */
  root: NonNullable<Slot<'span'>>;

  /**
   * The Checkbox's label.
   */
  label?: Slot<typeof Label>;

  /**
   * Hidden input that handles the checkbox's functionality.
   *
   * This is the PRIMARY slot: all native properties specified directly on `<Checkbox>` will be applied to this slot,
   * except `className` and `style`, which remain on the root slot.
   */
  input: NonNullable<Slot<'input'>>;

  /**
   * Renders the checkbox, with the checkmark icon as its child when checked.
   */
  indicator: Slot<'div'>;
};

/**
 * Checkbox Props
 */
export type CheckboxProps = Omit<
  ComponentProps<Partial<CheckboxSlots>, 'input'>,
  'size' | 'checked' | 'defaultChecked' | 'onChange'
> &
  Partial<CheckboxCommonsUnstable> & {
    /**
     * Checkboxes don't support children. To add a label, use the `label` prop.
     */
    children?: never;

    /**
     * Callback to be called when the checked state value changes.
     */
    onChange?: (ev: React.FormEvent<HTMLInputElement>, data: CheckboxOnChangeData) => void;

    /**
     * Whether the checkbox should be rendered as checked by default.
     */
    defaultChecked?: 'mixed' | boolean;
  };

/**
 * State used in rendering Checkbox
 */
export type CheckboxState = ComponentState<CheckboxSlots> & CheckboxCommonsUnstable;
