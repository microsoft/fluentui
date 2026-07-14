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

export type AnimationHandle = Pick<Animation, 'cancel' | 'finish' | 'pause' | 'play' | 'playbackRate' | 'reverse'> & {
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
  target: State;
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
  initialState: State;
  states: Record<State, StateMotionNode<State, Event>>;
};

/** The edge selected by the most recently accepted event. */
export type StateMotionTransitionSnapshot<State extends string, Event extends StateMotionEvent<PropertyKey>> = {
  id: number;
  source: State;
  target: State;
  event: Event;
};

/** The current logical state and most recently selected edge. */
export type StateMotionSnapshot<State extends string, Event extends StateMotionEvent<PropertyKey>> = {
  state: State;
  transition: StateMotionTransitionSnapshot<State, Event> | undefined;
};

/** An event-driven controller for a flat state motion graph. */
export type StateMotionController<State extends string, Event extends StateMotionEvent<PropertyKey>> = {
  readonly definition: StateMotionDefinition<State, Event>;
  getSnapshot(): StateMotionSnapshot<State, Event>;
  send(event: Event): boolean;
  subscribe(listener: () => void): () => void;
};
