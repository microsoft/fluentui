import { AnyAction, SideEffect } from '@fluentui/state';
import * as React from 'react';

type Dispatch<Action extends AnyAction> = (e: DispatchEvent, action: Action, ...args: Parameters<Action>) => void;

type DispatchEffect<State> = (e: DispatchEvent, prevState: State, nextState: State) => void;

type DispatchEvent = React.SyntheticEvent | Event;

export const useDispatchEffect = <State>(
  dispatchEffect: DispatchEffect<State>,
): [Dispatch<AnyAction>, SideEffect<State>] => {
  const latestEffect = React.useRef<DispatchEffect<State>>(dispatchEffect);
  const latestEvent = React.useRef<DispatchEvent | null>(null);

  latestEffect.current = dispatchEffect;

  const dispatch = React.useCallback<Dispatch<AnyAction>>((e, action, ...args) => {
    latestEvent.current = e;

    action(...args);
    latestEvent.current = null;
  }, []);
  const sideEffect = React.useCallback<SideEffect<State>>((prevState, nextState) => {
    return latestEffect.current(latestEvent.current as DispatchEvent, prevState, nextState);
  }, []);

  return [dispatch, sideEffect];
};
