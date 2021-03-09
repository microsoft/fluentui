import * as React from 'react';
import { useConst } from './useConst';

export type ChangeCallback<
  TElement extends HTMLElement,
  TValue,
  TEvent extends React.SyntheticEvent<TElement> | undefined
> = (ev: TEvent, newValue: TValue | undefined) => void;

/**
 * Default value can be a value or an initializer
 */
type DefaultValue<TValue> = TValue | (() => TValue);

export interface UseControllableValueOptions<
  TValue,
  TElement extends HTMLElement,
  TEvent extends React.SyntheticEvent<TElement> | undefined
> {
  controlledValue?: TValue;
  defaultUncontrolledValue: DefaultValue<TValue>;
  onChange?: (event: TEvent, value: TValue) => void;
}

/**
 * Hook to manage a value that could be either controlled or uncontrolled, such as a checked state or
 * text box string.
 * @param controlledValue - The controlled value passed in the props. This value will always be used if provided,
 * and the internal state will be updated to reflect it.
 * @param defaultUncontrolledValue - Initial value for the internal state in the uncontrolled case.
 * @returns An array of the current value and an updater callback. Like `React.useState`, the updater
 * callback always has the same identity, and it can take either a new value, or a function which
 * is passed the previous value and returns the new value.
 * @see https://reactjs.org/docs/uncontrolled-components.html
 */
export function useControllableValue<
  TValue,
  TElement extends HTMLElement,
  TEvent extends React.SyntheticEvent<TElement> | undefined
>({
  controlledValue,
  defaultUncontrolledValue,
  onChange,
}: UseControllableValueOptions<TValue, TElement, TEvent>): readonly [TValue, React.Dispatch<TValue>] {
  const [value, setValue] = React.useState<TValue>(defaultUncontrolledValue);
  const isControlled = useIsControlled(controlledValue);
  const currentValue = isControlled ? (controlledValue as TValue) : value;

  // Duplicate the current value and onChange in refs so they're accessible from
  // setValueOrCallOnChange without creating a new callback every time
  const valueRef = React.useRef(currentValue);
  const onChangeRef = React.useRef(onChange);
  React.useEffect(() => {
    valueRef.current = currentValue;
    onChangeRef.current = onChange;
  });

  // To match the behavior of the setter returned by React.useState, this callback's identity
  // should never change. This means it MUST NOT directly reference variables that can change.
  const setValueOrCallOnChange = useConst(() => (update: React.SetStateAction<TValue>, ev?: TEvent) => {
    // Assuming here that TValue is not a function, because a controllable value will typically
    // be something a user can enter as input
    const newValue = typeof update === 'function' ? (update as Function)(valueRef.current) : update;

    if (onChangeRef.current) {
      onChangeRef.current(ev!, newValue);
    }

    if (!isControlled) {
      setValue(newValue);
    }
  });

  return [currentValue, setValueOrCallOnChange] as const;
}

/**
 * Helper hook to handle previous comparison of controlled/uncontrolled
 * Prints an error when isControlled value switches between subsequent renders
 */
const useIsControlled = <TValue>(controlledValue: TValue) => {
  const isControlled = useConst<boolean>(controlledValue !== undefined);

  if (process.env.NODE_ENV !== 'production') {
    // We don't want these warnings in production even though it is against native behaviour
    // eslint-disable-next-line react-hooks/rules-of-hooks
    React.useEffect(() => {
      if (isControlled !== (controlledValue !== undefined)) {
        const error = new Error();

        const controlWarning = isControlled
          ? 'a controlled value to be uncontrolled'
          : 'an uncontrolled value to be controlled';

        const undefinedWarning = isControlled ? 'defined to an undefined' : 'undefined to a defined';

        // eslint-disable-next-line no-console
        console.error(
          [
            // Default react error
            'A component is changing ' + controlWarning + '. This is likely caused by the value',
            'changing from ' + undefinedWarning + ' value, which should not happen.',
            'Decide between using a controlled or uncontrolled input element for the lifetime of the component.',
            'More info: https://reactjs.org/link/controlled-components',
            error.stack,
          ].join(' '),
        );
      }
    }, [isControlled, controlledValue]);
  }

  return isControlled;
};
