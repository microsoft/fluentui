import * as React from 'react';

/**
 * @internal
 */
export type UseControllableStateOptions<State> = {
  /**
   * User-provided default state or initializer, for uncontrolled usage.
   */
  defaultState?: State | (() => State);
  /**
   * User-provided controlled state. `undefined` means internal state will be used.
   */
  state: State | undefined;
  /**
   * Used as the initial state if `state` and `defaultState` are both `undefined`.
   * If `undefined` is the correct initial state, pass that here.
   */
  initialState: State;
};

function isFactoryDispatch<State>(newState: React.SetStateAction<State>): newState is (prevState: State) => State {
  return typeof newState === 'function';
}

/**
 * @internal
 *
 * A [`useState`](https://reactjs.org/docs/hooks-reference.html#usestate)-like hook
 * to manage a value that could be either `controlled` or `uncontrolled`,
 * such as a checked state or text input string.
 *
 * @see https://react.dev/learn/sharing-state-between-components#controlled-and-uncontrolled-components for more details on `controlled`/`uncontrolled`
 *
 * @returns an array of the current value and an updater (dispatcher) function.
 * The updater function is referentially stable (won't change during the component's lifecycle).
 * It can take either a new value, or a function which is passed the previous value and returns the new value.
 *
 * ❗️❗️ Calls to the dispatcher will only modify the state if the state is `uncontrolled`.
 * Meaning that if a state is `controlled`, calls to the dispatcher do not modify the state.
 *
 */
export const useControllableState = <State>(
  options: UseControllableStateOptions<State>,
): [State, React.Dispatch<React.SetStateAction<State>>] => {
  'use no memo';

  if (process.env.NODE_ENV !== 'production') {
    if (options.state !== undefined && options.defaultState !== undefined) {
      // eslint-disable-next-line no-console
      console.error(/** #__DE-INDENT__ */ `
      @fluentui/react-utilities [useControllableState]:
      A component must be either controlled or uncontrolled (specify either the state or the defaultState, but not both).
      Decide between using a controlled or uncontrolled component and remove one of this props.
      More info: https://reactjs.org/link/controlled-components
      ${new Error().stack}
    `);
    }
  }
  const [internalState, setInternalState] = React.useState<State>(() => {
    if (options.defaultState === undefined) {
      return options.initialState;
    }
    return isInitializer(options.defaultState) ? options.defaultState() : options.defaultState;
  });

  // Heads up!
  // This part is specific for controlled mode and mocks behavior of React dispatcher function.

  const stateValueRef = React.useRef<State | undefined>(options.state);

  React.useEffect(() => {
    stateValueRef.current = options.state;
  }, [options.state]);

  const setControlledState = React.useCallback((newState: React.SetStateAction<State>) => {
    if (isFactoryDispatch(newState)) {
      newState(stateValueRef.current as State);
    }
  }, []);

  return useIsControlled(options.state) ? [options.state, setControlledState] : [internalState, setInternalState];
};

function isInitializer<State>(value: State | (() => State)): value is () => State {
  return typeof value === 'function';
}

/**
 * Helper hook to handle previous comparison of controlled/uncontrolled
 * Prints an error when isControlled value switches between subsequent renders
 * @returns - whether the value is controlled
 */
const useIsControlled = <V>(controlledValue: V | undefined): controlledValue is V => {
  'use no memo';

  const [isControlled] = React.useState<boolean>(() => controlledValue !== undefined);

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
        console.error(/** #__DE-INDENT__ */ `
          @fluentui/react-utilities [useControllableState]:
          A component is changing ${controlWarning}. This is likely caused by the value changing from ${undefinedWarning} value, which should not happen.
          Decide between using a controlled or uncontrolled input element for the lifetime of the component.
          More info: https://reactjs.org/link/controlled-components
          ${error.stack}
        `);
      }
    }, [isControlled, controlledValue]);
  }

  return isControlled;
};
