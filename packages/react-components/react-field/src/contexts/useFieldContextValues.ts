import * as React from 'react';

import type { FieldContextValue, FieldContextValues, FieldState } from '../Field';

// /**
//  * @internal
//  * Get the memoized value for the context's controlProps.
//  */
// const useControlProps = (state: FieldState): FieldControlProps => {
//   const { generatedControlId, required, validationState } = state;
//   const labelFor = state.label?.htmlFor;
//   const labelId = state.label?.id;
//   const validationMessageId = state.validationMessage?.id;
//   const hintId = state.hint?.id;

//   return React.useMemo(() => {
//     const controlProps: FieldControlProps = {};

//     // Only use the generated id and aria-labelledby if the label is associated with the generated id
//     if (generatedControlId && labelId && labelFor === generatedControlId) {
//       controlProps.id = generatedControlId;
//       controlProps['aria-labelledby'] = labelId;
//     }

//     // The control is described by the validation message, or hint, or both
//     if (validationMessageId || hintId) {
//       controlProps['aria-describedby'] =
//         validationMessageId && hintId ? `${validationMessageId} ${hintId}` : validationMessageId || hintId;
//     }

//     if (validationState === 'error') {
//       controlProps['aria-invalid'] = true;
//     }

//     if (required) {
//       controlProps['aria-required'] = true;
//     }

//     return controlProps;
//   }, [generatedControlId, hintId, labelFor, labelId, required, validationMessageId, validationState]);
// };

/**
 * Get the context values used when rendering Field.
 */
export const useFieldContextValues = (state: FieldState): FieldContextValues => {
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
