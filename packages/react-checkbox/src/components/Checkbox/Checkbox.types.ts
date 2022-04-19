import * as React from 'react';
import { Label } from '@fluentui/react-label';
import { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';

interface CheckboxCommons {
  /**
   * The shape of the checkbox indicator.
   *
   * The `circular` variant is only recommended to be used in a tasks-style UI (checklist),
   * since it otherwise could be confused for a `RadioItem`.
   *
   * @defaultvalue square
   */
  shape: 'square' | 'circular';

  /**
   * The controlled value for the checkbox.
   *
   * @defaultvalue false
   */
  checked: 'mixed' | boolean;

  /**
   * The size of the checkbox indicator.
   *
   * @defaultvalue medium
   */
  size: 'medium' | 'large';

  /**
   * The position of the label relative to the checkbox indicator.
   *
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
   * The checkbox, with the checkmark icon as its child when checked.
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
  Partial<CheckboxCommons> & {
    /**
     * Checkboxes don't support children. To add a label, use the `label` prop.
     */
    children?: never;

    /**
     * Callback to be called when the checked state value changes.
     */
    onChange?: (ev: React.ChangeEvent<HTMLInputElement>, data: CheckboxOnChangeData) => void;

    /**
     * Whether the checkbox should be rendered as checked by default.
     */
    defaultChecked?: 'mixed' | boolean;
  };

/**
 * State used in rendering Checkbox
 */
export type CheckboxState = ComponentState<CheckboxSlots> & CheckboxCommons;
