import type { FieldContextValues, FieldState } from '../Field';

export const useFieldContextValues = (state: FieldState): FieldContextValues => {
  const { size, required, status, labelId, childId } = state;
  return {
    field: { size, required, status, labelId, childId },
  };
};
