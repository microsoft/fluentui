import * as React from 'react';
import {
  IntrinsicShorthandProps,
  ObjectShorthandProps,
  ComponentState,
  ComponentProps,
} from '@fluentui/react-utilities';

/**
 * TODO:
 *  - Remove as from Omit. Currently it's needed since checkbox Commons shouldn't have as.
 *  - Instead of extending LabelProps, extend LabelCommons once it's added.
 */
export interface CheckboxCommons {
  /**
   * A checkbox can be rendered with a circular shape.
   */
  circular: boolean;
  /**
   * ID of the root element that wraps the checkbox and label.
   */
  rootId: string | undefined;

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
  root: IntrinsicShorthandProps<'span'> | ObjectShorthandProps<React.HTMLAttributes<HTMLLabelElement>>;
  /**
   * Hidden input that handles the checkbox's functionality.
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
export type CheckboxProps = Omit<ComponentProps<CheckboxSlots>, 'defaultChecked'> &
  Partial<CheckboxCommons> & {
    /**
     * ID of the native element that represents the checkbox.
     */
    id?: string;

    /**
     * Callback to be called when the checked state value changes.
     */
    onChange?: (ev: React.FormEvent<HTMLInputElement>, data: CheckboxOnChangeData) => void;

    /**
     * Whether the checkbox should be rendered as checked by default.
     */
    defaultChecked?: 'mixed' | boolean;

    /**
     * Required state of the checkbox.
     */
    required?: boolean;

    /**
     * Disabled
     */
    disabled?: boolean;
  };

/**
 * State used in rendering Checkbox
 */
export type CheckboxState = ComponentState<CheckboxSlots> & CheckboxCommons;
