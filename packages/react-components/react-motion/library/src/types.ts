type AtomCore = { keyframes: Keyframe[] } & KeyframeEffectOptions;

export type AtomMotion = AtomCore & {
  /**
   * Allows to specify a reduced motion version of the animation. If provided, the settings will be used when the
   * user has enabled the reduced motion setting in the operating system (i.e `prefers-reduced-motion` media query is
   * active). If not provided, the duration of the animation will be overridden to be 1ms.
   *
   * Note, if `keyframes` are provided, they will be used instead of the regular `keyframes`.
   */
  reducedMotion?: Partial<AtomCore>;
};

export type PresenceDirection = 'enter' | 'exit';

export type PresenceMotion = Record<PresenceDirection, AtomMotion | AtomMotion[]>;

/**
 * A motion param should be a primitive value that can be serialized to JSON and could be potentially used a plain
 * dependency for React hooks.
 */
export type MotionParam = boolean | number | string;

export type AtomMotionFn<MotionParams extends Record<string, MotionParam> = {}> = (
  params: { element: HTMLElement } & MotionParams,
) => AtomMotion | AtomMotion[];

export type PresenceMotionFn<MotionParams extends Record<string, MotionParam> = {}> = (
  params: { element: HTMLElement } & MotionParams,
) => PresenceMotion;

// ---

export type AnimationHandle = Pick<
  Animation,
  'cancel' | 'commitStyles' | 'finish' | 'pause' | 'play' | 'playbackRate' | 'reverse'
> & {
  setMotionEndCallbacks: (onfinish: () => void, oncancel: () => void) => void;
  isRunning: () => boolean;
  dispose: () => void;
};

export type MotionImperativeRef = {
  /** Sets the playback rate of the animation, where 1 is normal speed. */
  setPlaybackRate: (rate: number) => void;

  /** Sets the state of the animation to running or paused. */
  setPlayState: (state: 'running' | 'paused') => void;
};

/** An event accepted by a state motion graph. */
export type StateMotionEvent<Type extends PropertyKey = string> = { type: Type };

/** Excludes names reserved by the state motion keyframe syntax. */
export type StateMotionStateName<State extends string> = State extends 'target' ? never : State;

/** A named resting state in a state motion graph. */
export type StateMotionNode<State extends string, Event extends StateMotionEvent<PropertyKey>> = {
  /** The visual values associated with the resting state. */
  keyframe: Keyframe;

  /** Event-driven transitions available from this state. */
  on?: {
    [Type in Event['type']]?: StateMotionTransition<State, Extract<Event, { type: Type }>>;
  };
};

/** A transition to another named state, optionally with a custom motion. */
export type StateMotionTransition<State extends string, Event extends StateMotionEvent<PropertyKey>> = {
  target: StateMotionStateName<State>;
  motion?: AtomMotion | AtomMotion[] | StateMotionTransitionMotionFn<State, Event>;
};

/** Runtime values available when a transition resolves its motion. */
export type StateMotionTransitionMotionFnParams<State extends string, Event extends StateMotionEvent<PropertyKey>> = {
  element: HTMLElement;
  event: Event;
  source: StateMotionNode<State, Event>;
  target: StateMotionNode<State, Event>;
};

/** Creates the motion for a selected state transition. */
export type StateMotionTransitionMotionFn<State extends string, Event extends StateMotionEvent<PropertyKey>> = (
  params: StateMotionTransitionMotionFnParams<State, Event>,
) => AtomMotion | AtomMotion[];

/** A deterministic flat graph of named motion states and event-driven transitions. */
export type StateMotionDefinition<State extends string, Event extends StateMotionEvent<PropertyKey>> = {
  initialState: StateMotionStateName<State>;
  states: Record<StateMotionStateName<State>, StateMotionNode<State, Event>>;
};

/** A transition in a state motion machine, identified independently from its motion treatment. */
export type StateMotionMachineTransition<State extends string, Transition extends string> = {
  id: Transition;
  target: StateMotionStateName<State>;
};

/** A logical state in a state motion machine. */
export type StateMotionMachineNode<
  State extends string,
  Event extends StateMotionEvent<PropertyKey>,
  Transition extends string,
> = {
  on?: {
    [Type in Event['type']]?: StateMotionMachineTransition<State, Transition>;
  };
};

/** A deterministic flat state machine with no presentation values. */
export type StateMotionMachineDefinition<
  State extends string,
  Event extends StateMotionEvent<PropertyKey>,
  Transition extends string,
> = {
  initialState: StateMotionStateName<State>;
  states: Record<StateMotionStateName<State>, StateMotionMachineNode<State, Event, Transition>>;
};

/** The topology required by a state motion controller. */
export type StateMotionGraphDefinition<State extends string, Event extends StateMotionEvent<PropertyKey>> = {
  initialState: StateMotionStateName<State>;
  states: Record<
    StateMotionStateName<State>,
    {
      on?: {
        [Type in Event['type']]?: { target: StateMotionStateName<State> };
      };
    }
  >;
};

/** Resolves a transition endpoint from the live presentation or the target state's resting keyframe. */
export type StateMotionKeyframeReference = { state: 'current' | 'target' };

/** A concrete transition keyframe or a symbolic endpoint reference. */
export type StateMotionKeyframe = Keyframe | StateMotionKeyframeReference;

/** A multi-keyframe edge program in a state motion skin. */
export type StateMotionTransitionMotion = Omit<AtomMotion, 'keyframes' | 'reducedMotion'> & {
  keyframes: readonly StateMotionKeyframe[];
  reducedMotion?: Omit<NonNullable<AtomMotion['reducedMotion']>, 'keyframes'> & {
    keyframes?: readonly StateMotionKeyframe[];
  };
};

/** Resting state presentation and directed edge programs for a state motion machine. */
export type StateMotionSkin<State extends string, Transition extends string> = {
  states: Record<StateMotionStateName<State>, Keyframe>;
  transitions?: Partial<Record<Transition, StateMotionTransitionMotion | readonly StateMotionTransitionMotion[]>>;
};

/** The edge selected by the most recently accepted event. */
export type StateMotionTransitionSnapshot<State extends string, Event extends StateMotionEvent<PropertyKey>> = {
  id: number;
  source: StateMotionStateName<State>;
  target: StateMotionStateName<State>;
  event: Event;
};

/** The current logical state and most recently selected edge. */
export type StateMotionSnapshot<State extends string, Event extends StateMotionEvent<PropertyKey>> = {
  state: StateMotionStateName<State>;
  transition: StateMotionTransitionSnapshot<State, Event> | undefined;
};

/** An event-driven controller for a flat state motion graph. */
export type StateMotionController<State extends string, Event extends StateMotionEvent<PropertyKey>> = {
  readonly definition: StateMotionGraphDefinition<State, Event>;
  getSnapshot(): StateMotionSnapshot<State, Event>;
  send(event: Event): boolean;
  subscribe(listener: () => void): () => void;
};
