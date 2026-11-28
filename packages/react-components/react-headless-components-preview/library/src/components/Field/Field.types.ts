import type { FieldBaseState } from '@fluentui/react-field';

export type {
  FieldSlots,
  FieldBaseProps as FieldProps,
  FieldContextValue,
  FieldContextValues,
} from '@fluentui/react-field';

/**
 * Field component state
 */
export type FieldState = FieldBaseState & {
  root: {
    /**
     * Data attribute set when the field is required.
     */
    'data-required'?: string;

    /**
     * Data attribute reflecting the resolved validation state: 'error', 'warning', 'success', or 'none'.
     */
    'data-validation-state'?: FieldBaseState['validationState'];
  };
};
