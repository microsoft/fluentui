import { Label } from '@fluentui/react-label';
import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';
import * as React from 'react';

export type FieldSlots = {
  root: NonNullable<Slot<'div'>>;

  /**
   * The label associated with the field.
   */
  label?: Slot<typeof Label>;

  /**
   * A status or validation message. The appearance of the statusText depends on the value of the `status` prop.
   */
  statusText?: Slot<'span'>;

  /**
   * The icon associated with the status. If the `status` prop is set, this will default to a corresponding icon.
   *
   * This will only be displayed if `statusText` is set.
   */
  statusIcon?: Slot<'span'>;

  /**
   * Additional text below the field.
   */
  helperText?: Slot<'span'>;
};

/**
 * Field Props
 */
export type FieldProps = Omit<ComponentProps<Partial<FieldSlots>>, 'children'> & {
  /**
   * Field must have exactly one child that is a form component.
   */
  children: React.ReactElement<{ id?: string }>;

  /**
   * The position of the label relative to the field. This only affects the label, and not the statusText or helperText
   * (which always appear below the field).
   *
   * @default above
   */
  labelPosition?: 'above' | 'before';

  /**
   * Marks the field as required, and adds required styling to the label (red asterisk).
   *
   * @default false
   */
  required?: boolean;

  /**
   * Size of the field and label.
   *
   * NOTE: Not all components support all available sizes. Check the documentation of the component to see what values
   * it supports for its `size` prop.
   *
   * @default medium
   */
  size?: 'small' | 'medium' | 'large';

  /**
   * The status affects the color of the statusText, the statusIcon, and for some field components, an error status
   * causes the border to become red.
   *
   * @default undefined
   */
  status?: 'error' | 'warning' | 'success';

  /**
   * The ID of the form component in this Field (the child of the Field).
   *
   * `htmlFor` will default to the `id` property of the Field's child, if set.
   * Otherwise, it will default to `generatedChildId` on the FieldContext.
   *
   * In most cases, it isn't necessary to set this property. It only needs to be set if the child component
   * doesn't assign its ID via an `id` prop, and doesn't use FieldContext (such as a component from another library).
   */
  htmlFor?: string;
};

/**
 * State used in rendering Field
 */
export type FieldState = ComponentState<Required<FieldSlots>> &
  Pick<FieldProps, 'required' | 'status'> &
  Required<Pick<FieldProps, 'labelPosition' | 'size'>> & {
    /**
     * The generated ID used as the label's htmlFor prop.
     *
     * This will be undefined if either (a) the Field's htmlFor was set, or (b) the child has an id property set.
     */
    generatedChildId: string | undefined;

    /**
     * The (generated) ID of the field's label component.
     *
     * This can be used as the `aria-labelledby` prop when the label's htmlFor doesn't work (such as RadioGroup).
     */
    labelId: string | undefined;
  };

export type FieldContextValue = Readonly<
  Pick<FieldState, 'generatedChildId' | 'labelId' | 'required' | 'size' | 'status'>
>;

export type FieldContextValues = {
  field: FieldContextValue;
};
