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
   *
   * This is the PRIMARY slot: all intrinsic HTML properties will be applied to this slot,
   * except `className` and `style`, which remain on the root slot.
   */
  control: SlotComponent<T>;

  /**
   * The label associated with the field.
   */
  label?: Slot<typeof Label>;

  /**
   * A message about the validation state. The appearance of the `validationMessage` depends on `validationState`.
   */
  validationMessage?: Slot<'span'>;

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
  hint?: Slot<'span'>;
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
 * Props that are supported by Field, but not required to be supported by the component that implements field.
 */
export type OptionalFieldComponentProps = {
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
 * State used in rendering Field
 */
export type FieldState<T extends FieldComponent> = ComponentState<Required<FieldSlots<T>>> &
  Pick<FieldProps<T>, 'orientation' | 'validationState'> & {
    classNames: SlotClassNames<FieldSlots<T>>;
  };
