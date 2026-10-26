import type { FieldBaseState } from '@fluentui/react-field';

export type { FieldSlots, FieldBaseProps as FieldProps, FieldContextValues } from '@fluentui/react-field';

/**
 * Field component state
 */
export type FieldState = FieldBaseState & {
  root: {
    'data-validate-state'?: FieldBaseState['validationState'];
  };
};
