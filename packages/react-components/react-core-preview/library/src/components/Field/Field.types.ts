import type * as React from 'react';
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
  label?: Slot<'label'>;

  /**
   * A message about the validation state. By default, this is an error message, but it can be a success, warning,
   * or custom message by setting `validationState`.
   */
  validationMessage?: Slot<'div'>;

  /**
   * The icon associated with the `validationMessage`. This will only be displayed if `validationMessage` is set.
   */
  validationMessageIcon?: Slot<'span'>;

  /**
   * Additional hint text below the field.
   */
  hint?: Slot<'div'>;
};

/**
 * Field props, without design props.
 */
export type FieldProps = Omit<ComponentProps<FieldSlots>, 'children'> & {
  /**
   * The Field's child can be a single form control, or a render function that takes the props that should be spread on
   * a form control.
   *
   * For other controls, there are two options:
   * 1. The child of Field can be a render function that is given the props that should be spread on the control.
   *    `<Field>{(props) => <MyInput {...props} />}</Field>`
   * 2. The control itself can merge props from field with useFieldControlProps().
   *    `props = useFieldControlProps(props);`
   */
  children?: React.ReactNode | ((props: FieldControlProps) => React.ReactNode);

  /**
   * The `validationState` affects the display of the `validationMessage` and `validationMessageIcon`.
   *
   * * error: (default) The validation message has `role="alert"` so it is announced by screen readers, and the
   *     control inside the field has `aria-invalid` set.
   * * warning: The validation message has `role="alert"`.
   * * success, none: no role.
   *
   * @default error when validationMessage is set; none otherwise.
   */
  validationState?: 'error' | 'warning' | 'success' | 'none';

  /**
   * Marks the Field as required. If `true`, `aria-required` (or `required`) is set on the Field's child.
   */
  required?: boolean;
};

/**
 * State used in rendering Field, without design props.
 */
export type FieldBaseState = ComponentState<Required<FieldSlots>> &
  Required<Pick<FieldProps, 'required' | 'validationState'>> &
  Pick<FieldProps, 'children'> & {
    /**
     * The ID generated for the control inside the field, and the default value of label.htmlFor prop.
     */
    generatedControlId: string;
  };

/**
 * Value of the Field context. It is a behaviour context: `orientation` and `size` are design props that ride along,
 * so the context moves whole (see the headless-first RFC).
 */
export type FieldContextValue = Readonly<
  Pick<FieldBaseState, 'generatedControlId' | 'required' | 'validationState'> & {
    orientation: 'vertical' | 'horizontal';
    size: 'small' | 'medium' | 'large';
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
