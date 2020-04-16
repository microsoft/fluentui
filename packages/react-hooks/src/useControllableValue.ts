import * as React from 'react';
import { useConst } from './useConst';

export type ChangeCallback<TElement extends HTMLElement, TValue> = (
  ev: React.FormEvent<TElement> | undefined,
  newValue: TValue | undefined,
) => void;

/**
 * Hook to manage a value that could be either controlled or uncontrolled, such as a checked state or
 * text box string.
 * @param controlledValue- The controlled value passed in the props. This value will always be used if provided, and the
 * internal state will be updated to reflect it.
 * @param defaultUncontrolledValue- Initial value for the internal state in the uncontrolled case.
 * @see https://reactjs.org/docs/uncontrolled-components.html
 */
export function useControllableValue<TValue, TElement extends HTMLElement>(
  controlledValue: TValue | undefined,
  defaultUncontrolledValue: TValue | undefined,
): Readonly<[TValue | undefined, (newValue: TValue | undefined) => void]>;
export function useControllableValue<
  TValue,
  TElement extends HTMLElement,
  TCallback extends ChangeCallback<TElement, TValue> | undefined
>(
  controlledValue: TValue | undefined,
  defaultUncontrolledValue: TValue | undefined,
  onChange: TCallback,
): Readonly<[TValue | undefined, (newValue: TValue | undefined, ev?: React.FormEvent<TElement>) => void]>;
export function useControllableValue<
  TValue,
  TElement extends HTMLElement,
  TCallback extends ChangeCallback<TElement, TValue> | undefined
>(controlledValue: TValue | undefined, defaultUncontrolledValue: TValue | undefined, onChange?: TCallback) {
  const [value, setValue] = React.useState<TValue | undefined>(defaultUncontrolledValue);
  const isControlled = useConst<boolean>(controlledValue !== undefined);

  const setValueOrCallOnChange = React.useCallback(
    (newValue: TValue | undefined, ev?: React.FormEvent<TElement>) => {
      if (onChange) {
        onChange(ev!, newValue);
      }
      if (!isControlled) {
        setValue(newValue);
      }
    },
    [onChange],
  );

  return [isControlled ? controlledValue : value, setValueOrCallOnChange] as const;
}
