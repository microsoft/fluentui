import { AnyAction, EnhancedActions, Manager, ManagerFactory, SideEffect } from '@fluentui/state';
import * as React from 'react';

type UseStateManagerOptions<State> = {
  mapPropsToInitialState?: () => Partial<State>;
  mapPropsToState?: () => Partial<State>;
  sideEffects?: SideEffect<State>[];
};

type UseStateManagerResult<State, Actions> = {
  state: Readonly<State>;
  actions: Readonly<Actions>;
};

const getDefinedProps = <Props extends Record<string, any>>(props: Props): Partial<Props> => {
  const definedProps: Partial<Props> = {};

  Object.keys(props).forEach(propName => {
    if (props[propName] !== undefined) {
      (<Record<string, any>>definedProps)[propName] = props[propName];
    }
  });

  return definedProps;
};

export const useStateManager = <State extends Record<string, any>, Actions extends Record<string, AnyAction>>(
  managerFactory: ManagerFactory<State, Actions>,
  options: UseStateManagerOptions<State> = {},
): UseStateManagerResult<State, Actions> => {
  const {
    mapPropsToInitialState = () => ({} as Partial<State>),
    mapPropsToState = () => ({} as Partial<State>),
    sideEffects = [],
  } = options;
  const latestActions = React.useMemo<Actions>(
    () => ({} as Actions),
    // The change of `managerFactory` should trigger recreation of `latestActions` as they can be different between
    // managers
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [managerFactory],
  );
  const latestManager = React.useRef<Manager<State, Actions> | null>(null);

  // Heads up! forceUpdate() is used only for triggering rerenders, stateManager is SSOT
  const [, forceUpdate] = React.useReducer((c: number) => c + 1, 0) as [never, () => void];

  // If manager exists, the current state will be used
  const initialState = latestManager.current ? latestManager.current.state : getDefinedProps(mapPropsToInitialState());

  latestManager.current = managerFactory({
    // Factory has already configured actions
    actions: {} as EnhancedActions<State, Actions>,
    state: { ...initialState, ...getDefinedProps(mapPropsToState()) },
    sideEffects: [
      ...sideEffects,
      // `sideEffect` is called with two arguments, but hooks don't support the second callback
      // argument
      () => forceUpdate(),
    ],
  });

  // We need to keep the same reference to an object with actions to allow usage them as
  // a dependency in useCallback() hook
  Object.assign(latestActions, latestManager.current.actions);

  // For development environments we disallow ability to extend object with other properties to
  // avoid misusage
  if (process.env.NODE_ENV !== 'production') {
    if (Object.isExtensible(latestActions)) Object.preventExtensions(latestActions);
  }

  // We need to pass exactly `manager.state` to provide the same state object during the same render
  // frame.
  // It keeps behavior consistency between React state tools and our managers
  // https://github.com/facebook/react/issues/11527#issuecomment-360199710
  // Object.freeze() is used only in dev-mode to avoid usage mistakes

  return {
    state:
      process.env.NODE_ENV === 'production' ? latestManager.current.state : Object.freeze(latestManager.current.state),
    actions: latestActions,
  };
};
