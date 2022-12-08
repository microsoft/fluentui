import * as React from 'react';
import { Label } from '@fluentui/react-label';
import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';

export type FieldChildProps = Pick<
  React.AriaAttributes,
  'aria-labelledby' | 'aria-describedby' | 'aria-invalid' | 'aria-required'
>;

/**
 * Slots added by Field
 */
export type FieldSlots = {
  root: NonNullable<Slot<'div'>>;

  /**
   * Wrapper for the control inside the field.
   */
  control: NonNullable<Slot<'div'>>;

  /**
   * The label associated with the field.
   */
  label?: Slot<typeof Label>;

  /**
   * A message about the validation state. The appearance of the `validationMessage` depends on `validationState`.
   */
  validationMessage?: Slot<'div'>;

  /**
   * The icon associated with the `validationMessage`. If the `validationState` prop is set, this will default to an
   * icon corresponding to that state.
   *
   * This will only be displayed if `validationMessage` is set.
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
export type FieldProps = Omit<ComponentProps<Partial<FieldSlots>>, 'children'> & {
  /**
   * The Field's child can be a single form control, or a render function that takes the AIRA props that should be
   * spread on a form control.
   *
   * All form controls in this library can be used directly as children (such as `<Input>` or `<RadioGroup>`), as well
   * as intrinsic form controls like `<input>` or `<textarea>`.
   */
  children: React.ReactElement | null | ((props: FieldChildProps) => React.ReactElement | null);

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

  /**
   * The htmlFor attribute of the Field's label. If not provided, the child of the Field will have `aria-labelledby`
   * set to the Field's label ID.
   */
  htmlFor?: string;

  /**
   * The orientation of the label relative to the field component.
   * This only affects the label, and not the validationMessage or hint (which always appear below the field component).
   *
   * @default vertical
   */
  orientation?: 'vertical' | 'horizontal';

  /**
   * The `validationState` affects the color of the `validationMessage`, the `validationMessageIcon`, and for some
   * field components, an `validationState="error"` causes the border to become red.
   *
   * Setting `validationState` to `error` will also set `aria-invalid` to `true` on the Field's child, as well as
   * `role="alert"` on the `validationMessage`.
   *
   * @default undefined
   */
  validationState?: 'error' | 'warning' | 'success';
};

/**
 * State used in rendering Field
 */
export type FieldState = ComponentState<Required<FieldSlots>> & Pick<FieldProps, 'orientation' | 'validationState'>;
