import * as React from 'react';
import { Label } from '@fluentui/react-label';
import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';

/**
 * The props added to the control inside the Field.
 */
export type FieldControlProps = Pick<
  React.HTMLAttributes<HTMLElement>,
  'id' | 'aria-labelledby' | 'aria-describedby' | 'aria-invalid' | 'aria-required'
>;

/**
 * Slots of the Field component
 */
export type FieldSlots = {
  root: NonNullable<Slot<'div'>>;

  /**
   * The label associated with the field.
   */
  label?: Slot<typeof Label>;

  /**
   * A message about the validation state. By default, this is an error message, but it can be a success, warning,
   * or custom message by setting `validationState`.
   */
  validationMessage?: Slot<'div'>;

  /**
   * The icon associated with the `validationMessage`. This will only be displayed if `validationMessage` is set.
   *
   * The default depends on `validationState`:
   * * error: `<ErrorCircle12Filled />`
   * * warning: `<Warning12Filled />`
   * * success: `<CheckmarkCircle12Filled />`
   * * none: `null`
   */
  validationMessageIcon?: Slot<'span'>;

  /**
   * Additional hint text below the field.
   */
  hint?: Slot<'div'>;
};

/**
 * Field Props
 */
export type FieldProps = Omit<ComponentProps<FieldSlots>, 'children'> & {
  /**
   * The Field's child can be a single form control, or a render function that takes the props that should be spread on
   * a form control.
   *
   * All form controls in this library can be used directly as children (such as `<Input>` or `<RadioGroup>`).
   *
   * For other controls, there are two options:
   * 1. The child of Field can be a render function that is given the props that should be spread on the control.
   *    `<Field>{(props) => <MyInput {...props} />}</Field>`
   * 2. The control itself can merge props from field with useFieldControlProps_unstable().
   *    `props = useFieldControlProps_unstable(props);`
   */
  children?: React.ReactNode | ((props: FieldControlProps) => React.ReactNode);

  /**
   * The orientation of the label relative to the field component.
   * This only affects the label, and not the validationMessage or hint (which always appear below the field component).
   *
   * @default vertical
   */
  orientation?: 'vertical' | 'horizontal';

  /**
   * The `validationState` affects the display of the `validationMessage` and `validationMessageIcon`.
   *
   * * error: (default) The validation message has a red error icon and red text, with `role="alert"` so it is
   *     announced by screen readers. Additionally, the control inside the field has `aria-invalid` set, which adds a
   *     red border to some field components (such as `Input`).
   * * success: The validation message has a green checkmark icon and gray text.
   * * warning: The validation message has a yellow exclamation icon and gray text.
   * * none: The validation message has no icon and gray text.
   *
   * @default error when validationMessage is set; none otherwise.
   */
  validationState?: 'error' | 'warning' | 'success' | 'none';

  /**
   * Marks the Field as required. If `true`, an asterisk will be appended to the label, and `aria-required` will be set
   * on the Field's child.
   */
  required?: boolean;

  /**
   * The size of the Field's label.
   *
   * @default medium
   */
  size?: 'small' | 'medium' | 'large';
};

/**
 * State used in rendering Field
 */
export type FieldState = ComponentState<Required<FieldSlots>> &
  Required<Pick<FieldProps, 'orientation' | 'required' | 'size' | 'validationState'>> &
  Pick<FieldProps, 'children'> & {
    /**
     * The ID generated for the control inside the field, and the default value of label.htmlFor prop.
     */
    generatedControlId: string;
  };

export type FieldContextValue = Readonly<
  Pick<FieldState, 'generatedControlId' | 'orientation' | 'required' | 'size' | 'validationState'> & {
    /** The label's for prop. Undefined if there is no label. */
    labelFor?: string;
    /** The label's id prop. Undefined if there is no label. */
    labelId?: string;
    /** The validationMessage's id prop. Undefined if there is no validationMessage. */
    validationMessageId?: string;
    /** The hint's id prop. Undefined if there is no hint. */
    hintId?: string;
  }
>;

export type FieldContextValues = {
  field: FieldContextValue;
};
