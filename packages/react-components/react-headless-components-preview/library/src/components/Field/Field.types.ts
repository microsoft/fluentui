import type { FieldBaseState } from '@fluentui/react-core-preview';

export type { FieldSlots, FieldProps, FieldContextValues } from '@fluentui/react-core-preview';

/**
 * Field component state
 */
export type FieldState = FieldBaseState & {
  root: {
    'data-validate-state'?: FieldBaseState['validationState'];
  };
};
