import { AnyActions, EnhancedAction, Manager, ManagerConfig } from './types';

export const createManager = <State extends {}, Actions extends AnyActions>(
  config: ManagerConfig<State, Actions>,
): Manager<State, Actions> => {
  const { actions, debug, middleware = [], sideEffects = [], state } = config;
  const _state: State = { ...state } as State;

  const getState = (): State => ({ ..._state });
  const setState = (partial: Partial<State>): State => Object.assign(_state, partial);

  const manager: Manager<State, Actions> = {
    actions: {} as Actions,
    get state() {
      return getState();
    },
  };

  // assign actions to manager's api
  Object.keys(actions).forEach(actionName => {
    const enhancedAction = actions[actionName];
    const action = (...args: Parameters<typeof enhancedAction>) => {
      const prevState = getState();

      applyAction(enhancedAction, ...args);

      applyMiddleware(prevState);
      applySideEffects(prevState);
    };
    (manager.actions as any)[actionName] = action;
  });

  const applyAction = <A extends EnhancedAction<State, Actions>>(action: A, ...args: Parameters<A>) => {
    if (process.env.NODE_ENV !== 'production') {
      if (debug) {
        // eslint-disable-next-line no-console
        console.log('manager ACTION', action.name || 'Anonymous');
      }
    }
    const actionResult = action(...args)(getState(), manager.actions);

    if (actionResult) {
      setState(actionResult);
    }
  };

  const applyMiddleware = (prevState: State) => {
    middleware.forEach((middlewareItem, index) => {
      if (process.env.NODE_ENV !== 'production') {
        if (debug) {
          // eslint-disable-next-line no-console
          console.log(`manager MIDDLEWARE[${index}]`, {
            prev: prevState,
            next: getState(),
          });
        }
      }

      setState(middlewareItem(prevState, getState(), manager.actions));
    });
  };

  const applySideEffects = (prevState: State): void => {
    sideEffects.forEach((sideEffect, index) => {
      if (process.env.NODE_ENV !== 'production') {
        if (debug) {
          // eslint-disable-next-line no-console
          console.log(`manager SIDE_EFFECT[${index}]`);
        }
      }

      sideEffect(prevState, manager.state);
    });
  };

  return manager;
};
