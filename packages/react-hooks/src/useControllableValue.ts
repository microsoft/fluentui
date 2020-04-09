import * as React from 'react';

/**
 * Hook to manage a value that could be either controlled or uncontrolled, such as a checked state or
 * text box string.
 * @param controlledValue- The controlled value passed in the props. This value will always be used if provided, and the
 * internal state will be updated to reflect it.
 * @param defaultUncontrolledValue- Initial value for the internal state in the uncontrolled case.
 * @see https://reactjs.org/docs/uncontrolled-components.html
 */
export function useControllableValue<TValue>(
  controlledValue: TValue | undefined,
  defaultUncontrolledValue: TValue | undefined,
) {
  const [value, setValue] = React.useState<TValue | undefined>(
    controlledValue !== undefined ? controlledValue : defaultUncontrolledValue,
  );

  if (controlledValue !== undefined && controlledValue !== value) {
    setValue(controlledValue);
  }

  return [value, setValue] as const;
}
