import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';

export type FieldSlots = {
  root: Slot<'div'>;
};

/**
 * Field Props
 */
export type FieldProps = ComponentProps<FieldSlots> & {};

/**
 * State used in rendering Field
 */
export type FieldState = ComponentState<FieldSlots>;
// TODO: Remove semicolon from previous line, uncomment next line, and provide union of props to pick from FieldProps.
// & Required<Pick<FieldProps, 'propName'>>
