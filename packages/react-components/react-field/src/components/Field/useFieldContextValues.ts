import { FieldContextValues, FieldState } from '../Field';

/**
 * Get values for the Field context from the state
 */
export const useFieldContextValues_unstable = (state: FieldState): FieldContextValues => {
  const { orientation, required, size, validationState } = state;

  return {
    field: {
      orientation,
      required,
      size,
      validationState,
    },
  };
};
