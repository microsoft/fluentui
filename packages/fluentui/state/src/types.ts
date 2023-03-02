export type AnyAction = (...args: any[]) => void;
export type AnyActions = Record<string, AnyAction>;

export type Middleware<State, Actions> = (prevState: State, nextState: State, actions: Actions) => Partial<State>;

export type SideEffect<State> = (prevState: State, nextState: State) => void;

export type EnhancedAction<
  State,
  Actions extends AnyActions,
  Action extends AnyAction = AnyActions[keyof AnyActions],
> = (...args: Parameters<Action>) => (state: State, actions: Actions) => Partial<State> | void;

export type EnhancedActions<State, Actions extends AnyActions> = {
  [Name in keyof Actions]: EnhancedAction<State, Actions, Actions[Name]>;
};

export type ManagerConfig<State, Actions extends AnyActions> = {
  actions: EnhancedActions<State, Actions>;
  debug?: boolean;
  middleware?: Middleware<State, Actions>[];
  state?: Partial<State>;
  sideEffects?: SideEffect<State>[];
};

export type ManagerFactory<State, Actions extends AnyActions> = (
  config: ManagerConfig<State, Actions>,
) => Manager<State, Actions>;

export type Manager<State, Actions> = {
  readonly state: State;
  actions: Actions;
};
