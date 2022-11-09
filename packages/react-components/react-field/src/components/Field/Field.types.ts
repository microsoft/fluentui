import * as React from 'react';
import { Label } from '@fluentui/react-label';
import type { ComponentProps, ComponentState, Slot, SlotClassNames } from '@fluentui/react-utilities';
import type { SlotComponent } from './SlotComponent.types';

/**
 * The minimum requirement for a component used by Field.
 *
 * Note: the use of VoidFunctionComponent means that component is not *required* to have a children prop,
 * but it is still allowed to have a children prop.
 */
export type FieldComponent = React.VoidFunctionComponent<
  Pick<
    React.HTMLAttributes<HTMLElement>,
    'id' | 'className' | 'style' | 'aria-labelledby' | 'aria-describedby' | 'aria-invalid' | 'aria-errormessage'
  >
>;

/**
 * Slots added by Field
 */
export type FieldSlots<T extends FieldComponent> = {
  root: NonNullable<Slot<'div'>>;

  /**
   * The underlying component wrapped by this field.
   */
  control: SlotComponent<T>;

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
export type FieldProps<T extends FieldComponent> = ComponentProps<Partial<FieldSlots<T>>, 'control'> & {
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
   * @default undefined
   */
  validationState?: 'error' | 'warning' | 'success';
};

/**
 * FieldProps plus extra optional props that are supported by useField_unstable, but not required to be part of the
 * API of every Field component.
 *
 * This allows Field to forward the required and size props to the label if the underlying component supports them,
 * but doesn't add them to the public API of fields that don't support them.
 */
export type FieldPropsWithOptionalComponentProps<T extends FieldComponent> = FieldProps<T> & {
  /**
   * Whether the field label should be marked as required.
   */
  required?: boolean;

  /**
   * Size of the field label.
   *
   * Number sizes will be ignored, but are allowed because the HTML `<input>` element has a prop `size?: number`.
   */
  size?: 'small' | 'medium' | 'large' | number;
};

/**
 * Configuration parameters for a Field class, passed to useField_unstable
 */
export type FieldConfig<T extends FieldComponent> = {
  /**
   * The underlying input component that this field is wrapping.
   */
  component: T;

  /**
   * Class names for this component, created by `getFieldClassNames`.
   */
  classNames: SlotClassNames<FieldSlots<T>>;

  /**
   * How the label be connected to the control.
   * * htmlFor - Set the Label's htmlFor prop to the component's ID (and generate an ID if not provided).
   *   This is the preferred method for components that use the underlying <input> tag.
   * * aria-labelledby - Set the component's aria-labelledby prop to the Label's ID. Use this for components
   *   that are not directly <input> elements (such as RadioGroup).
   *
   * @default htmlFor
   */
  labelConnection?: 'htmlFor' | 'aria-labelledby';

  /**
   * Should the aria-invalid and aria-errormessage attributes be set when validationState="error".
   *
   * @default true
   */
  ariaInvalidOnError?: boolean;
};

/**
 * State used in rendering Field
 */
export type FieldState<T extends FieldComponent> = ComponentState<Required<FieldSlots<T>>> &
  Pick<FieldProps<T>, 'orientation' | 'validationState'> & {
    classNames: SlotClassNames<FieldSlots<T>>;
  };
