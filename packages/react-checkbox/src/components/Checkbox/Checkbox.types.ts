import * as React from 'react';
import {
  ComponentProps,
  ComponentState,
  IntrinsicShorthandProps,
  ObjectShorthandProps,
} from '@fluentui/react-utilities';
import { LabelProps } from '@fluentui/react-label';

export interface CheckboxCommons {
  /**
   * A checkbox can be rendered with a circular shape.
   */
  circular: boolean | undefined;

  /**
   * A checkbox's state can be controlled.
   * @defaultvalue false
   */
  checked: 'mixed' | boolean;

  /**
   * Checkbox supports two different checkbox sizes.
   * @defaultvalue 'medium'
   */
  size: 'medium' | 'large';

  /**
   * Determines whether the label should be positioned before or after the checkbox.
   * @defaultvalue 'after'
   */
  labelPosition: 'before' | 'after';

  /**
   * Field required to pass className to container instead of input
   * this will be solved by https://github.com/microsoft/fluentui/pull/18983
   */
  containerClassName?: string;
}

/**
 * Data for the onChange event for checkbox.
 */
export interface CheckboxOnChangeData {
  checked: 'mixed' | boolean;
}

export type CheckboxSlots = {
  /**
   * The root element of the checkbox is its `<label>`.
   *
   * The root slot receives the `className` and `style` specified directly on the `<Checkbox>`.
   * All other native props will be applied to the primary slot: `input`
   */
  root: ObjectShorthandProps<LabelProps> | IntrinsicShorthandProps<'span'>;

  /**
   * Hidden input that handles the checkbox's functionality.
   *
   * This is the PRIMARY slot: all native properties specified directly on `<Checkbox>` will be applied to this slot,
   * except `className` and `style`, which remain on the root slot.
   */
  input: IntrinsicShorthandProps<'input'>;

  /**
   * Renders the checkbox, with the checkmark icon as its child when checked.
   */
  indicator: IntrinsicShorthandProps<'div'>;
};

/**
 * Checkbox Props
 */
export type CheckboxProps = Omit<ComponentProps<CheckboxSlots, 'input'>, 'size' | 'checked' | 'defaultChecked'> &
  Partial<CheckboxCommons> & {
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
export type CheckboxState = ComponentState<CheckboxSlots> &
  CheckboxCommons & {
    hasLabel: boolean;
  };
