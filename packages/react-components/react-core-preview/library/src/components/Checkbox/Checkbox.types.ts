import type * as React from 'react';
import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';

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
  label?: Slot<'label'>;

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
  indicator: Slot<'div', 'span'>;
};

/**
 * Data for the onChange event for checkbox.
 */
export interface CheckboxOnChangeData {
  checked: 'mixed' | boolean;
}

/**
 * Checkbox props, without design props.
 */
export type CheckboxProps = Omit<
  ComponentProps<Partial<CheckboxSlots>, 'input'>,
  'checked' | 'defaultChecked' | 'onChange' | 'size'
> & {
  /**
   * The controlled value for the checkbox.
   *
   * @default false
   */
  checked?: 'mixed' | boolean;

  /**
   * Checkboxes don't support children. To add a label, use the `label` prop.
   */
  children?: never;

  /**
   * Whether the checkbox should be rendered as checked by default.
   */
  defaultChecked?: 'mixed' | boolean;

  /**
   * The position of the label relative to the checkbox indicator.
   *
   * @default after
   */
  labelPosition?: 'before' | 'after';

  /**
   * Callback to be called when the checked state value changes.
   */
  // eslint-disable-next-line @nx/workspace-consistent-callback-type -- can't change type of existing callback
  onChange?: (ev: React.ChangeEvent<HTMLInputElement>, data: CheckboxOnChangeData) => void;
};

/**
 * State used in rendering Checkbox, without design props.
 */
export type CheckboxBaseState = ComponentState<CheckboxSlots> &
  Required<Pick<CheckboxProps, 'checked' | 'disabled' | 'labelPosition'>>;
