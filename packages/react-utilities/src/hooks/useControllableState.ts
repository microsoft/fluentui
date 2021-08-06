import * as React from 'react';
import { useConst } from './useConst';

export type UseControllableStateOptions<State> = {
  /**
   * User provided default state or factory initializer
   */
  defaultState?: State | (() => State);
  /**
   * User provided controllable state, undefined state means internal state will be used
   */
  state: State | undefined;
  /**
   * Used to initialize state if all user provided states are undefined
   */
  initialState: State;
};

function isUndefined(state: unknown): state is undefined {
  return typeof state === 'undefined';
}

function isFactoryDispatch<State>(newState: React.SetStateAction<State>): newState is (prevState: State) => State {
  return typeof newState === 'function';
}

/**
 * A useState 'like' hook that allows optional user control
 * Useful for components which allow uncontrolled and controlled behaviours for users
 * @returns - https://reactjs.org/docs/hooks-state.html
 */
export const useControllableState = <State>(
  options: UseControllableStateOptions<State>,
): [State, React.Dispatch<React.SetStateAction<State>>] => {
  const isControlled = useIsControlled(options.state);
  const initialState = isUndefined(options.defaultState) ? options.initialState : options.defaultState;
  const [internalState, setInternalState] = React.useState<State>(initialState);

  const state = isControlled ? (options.state as State) : internalState;

  const stateRef = React.useRef(state);
  React.useEffect(() => {
    stateRef.current = state;
  }, [state]);

  // To match the behavior of the setter returned by React.useState, this callback's identity
  // should never change. This means it MUST NOT directly reference variables that can change.
  const setState = React.useCallback((newState: React.SetStateAction<State>) => {
    // React dispatch can use a factory
    // https://reactjs.org/docs/hooks-reference.html#functional-updates
    if (isFactoryDispatch(newState)) {
      stateRef.current = newState(stateRef.current);
    } else {
      stateRef.current = newState;
    }

    setInternalState(stateRef.current);
  }, []);

  return [state, setState];
};

/**
 * Helper hook to handle previous comparison of controlled/uncontrolled
 * Prints an error when isControlled value switches between subsequent renders
 * @returns - whether the value is controlled
 */
const useIsControlled = (controlledValue: unknown) => {
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
