import * as React from 'react';
import { Label } from '@fluentui/react-label';
import { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';

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
  // FIXME: this should be 'span' by default, because you cannot have a 'div' inside of a 'span'
  // but changing the signature would be a breaking change
  // TODO: change the default value to 'span' in the next major
  indicator: Slot<'div', 'span'>;
};

/**
 * Checkbox Props
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

  /**
   * The shape of the checkbox indicator.
   *
   * The `circular` variant is only recommended to be used in a tasks-style UI (checklist),
   * since it otherwise could be confused for a `RadioItem`.
   *
   * @default square
   */
  shape?: 'square' | 'circular';

  /**
   * The size of the checkbox indicator.
   *
   * @default medium
   */
  size?: 'medium' | 'large';
};

/**
 * Data for the onChange event for checkbox.
 */
export interface CheckboxOnChangeData {
  checked: 'mixed' | boolean;
}

/**
 * State used in rendering Checkbox
 */
export type CheckboxState = ComponentState<CheckboxSlots> &
  Required<Pick<CheckboxProps, 'checked' | 'disabled' | 'labelPosition' | 'shape' | 'size'>>;
