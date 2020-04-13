import * as React from 'react';

type ChangeCallback<TElement extends HTMLElement, TValue> = (
  ev: React.FormEvent<TElement>,
  newValue: TValue | undefined,
) => void;

type Setter<
  TValue,
  TElement extends HTMLElement,
  TCallback extends ChangeCallback<TElement, TValue> | undefined
> = TCallback extends ChangeCallback<TElement, TValue>
  ? (newValue: TValue | undefined, ev: React.FormEvent<TElement>) => void
  : (newValue: TValue | undefined) => void;

/**
 * Hook to manage a value that could be either controlled or uncontrolled, such as a checked state or
 * text box string.
 * @param controlledValue- The controlled value passed in the props. This value will always be used if provided, and the
 * internal state will be updated to reflect it.
 * @param defaultUncontrolledValue- Initial value for the internal state in the uncontrolled case.
 * @see https://reactjs.org/docs/uncontrolled-components.html
 */
export function useControllableValue<
  TValue,
  TElement extends HTMLElement,
  TCallback extends ChangeCallback<TElement, TValue> | undefined,
  TSetter extends Setter<TValue, TElement, TCallback>
>(
  controlledValue: TValue | undefined,
  defaultUncontrolledValue: TValue | undefined,
  onChange?: TCallback,
): [TValue | undefined, TSetter] {
  const [value, setValue] = React.useState<TValue | undefined>(
    controlledValue !== undefined ? controlledValue : defaultUncontrolledValue,
  );

  const setValueOrCallOnChange = React.useCallback(
    (newValue: TValue | undefined, ev?: React.FormEvent<TElement>) => {
      if (onChange) {
        onChange(ev!, newValue);
      }
      if (controlledValue === undefined) {
        setValue(newValue);
      }
    },
    [onChange, controlledValue === undefined],
  ) as TSetter;

  return [controlledValue !== undefined ? controlledValue : value, setValueOrCallOnChange];
}
