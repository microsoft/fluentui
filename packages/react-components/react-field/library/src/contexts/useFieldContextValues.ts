import * as React from 'react';

import type { FieldContextValue, FieldContextValues, FieldState } from '../Field';

/**
 * Get the context values used when rendering Field.
 */
export const useFieldContextValues_unstable = (state: FieldState): FieldContextValues => {
  const { generatedControlId, orientation, required, size, validationState } = state;
  const labelFor = state.label?.htmlFor;
  const labelId = state.label?.id;
  const validationMessageId = state.validationMessage?.id;
  const hintId = state.hint?.id;

  const field: FieldContextValue = React.useMemo(
    () => ({
      generatedControlId,
      hintId,
      labelFor,
      labelId,
      orientation,
      required,
      size,
      validationMessageId,
      validationState,
    }),
    [generatedControlId, hintId, labelFor, labelId, orientation, required, size, validationMessageId, validationState],
  );

  return { field };
};
