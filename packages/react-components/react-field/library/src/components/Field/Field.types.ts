import type { Label } from '@fluentui/react-label';
import type { ComponentProps, ComponentState, DistributiveOmit, Slot } from '@fluentui/react-utilities';
import type {
  FieldContextValue,
  FieldContextValues,
  FieldControlProps,
  FieldProps as FieldCoreProps,
  FieldSlots as FieldCoreSlots,
} from '@fluentui/react-core-preview';

export type { FieldContextValue, FieldContextValues, FieldControlProps };

/**
 * Slots of the Field component. Same as the core slots, with `Label` as the label slot.
 */
export type FieldSlots = Omit<FieldCoreSlots, 'label'> & {
  /**
   * The label associated with the field.
   */
  label?: Slot<typeof Label>;
};

/**
 * Field Props
 */
export type FieldProps = Omit<ComponentProps<FieldSlots>, 'children'> &
  Pick<FieldCoreProps, 'children' | 'validationState' | 'required'> & {
    /**
     * The orientation of the label relative to the field component.
     * This only affects the label, and not the validationMessage or hint (which always appear below the field component).
     *
     * @default vertical
     */
    orientation?: 'vertical' | 'horizontal';

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

export type FieldBaseProps = DistributiveOmit<FieldProps, 'orientation' | 'size'>;

export type FieldBaseState = DistributiveOmit<FieldState, 'orientation' | 'size'>;
