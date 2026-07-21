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

/** An instantaneous event-driven transition in a state motion machine. */
export type StateMotionMachineTransition<State extends string> = {
  target: StateMotionStateName<State>;
};

/** A timed animation that begins when its state is entered. */
export type StateMotionMachineAnimation<State extends string, Animation extends string> = {
  id: Animation;
  target: StateMotionStateName<State>;
};

/** A logical state in a state motion machine. */
export type StateMotionMachineNode<
  State extends string,
  Event extends StateMotionEvent<PropertyKey>,
  Animation extends string,
> = {
  animation?: StateMotionMachineAnimation<State, Animation>;
  on?: {
    [Type in Event['type']]?: StateMotionMachineTransition<State>;
  };
};

/** A deterministic flat state machine with no presentation values. */
export type StateMotionMachineDefinition<
  State extends string,
  Event extends StateMotionEvent<PropertyKey>,
  Animation extends string,
> = {
  initialState: StateMotionStateName<State>;
  states: Record<StateMotionStateName<State>, StateMotionMachineNode<State, Event, Animation>>;
};

/** The topology required by a state motion controller. */
export type StateMotionGraphDefinition<State extends string, Event extends StateMotionEvent<PropertyKey>> = {
  initialState: StateMotionStateName<State>;
  states: Record<
    StateMotionStateName<State>,
    {
      animation?: { target: StateMotionStateName<State> };
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

/** A multi-keyframe animation program in a state motion skin. */
export type StateMotionAnimation = Omit<AtomMotion, 'keyframes' | 'reducedMotion'> & {
  keyframes: readonly StateMotionKeyframe[];
  reducedMotion?: Omit<NonNullable<AtomMotion['reducedMotion']>, 'keyframes'> & {
    keyframes?: readonly StateMotionKeyframe[];
  };
};

/** Resolves a state's resting keyframe from caller-provided context. */
export type StateMotionStateKeyframe<Context = undefined> = Keyframe | ((params: { context: Context }) => Keyframe);

/** State presentation and animation programs for a state motion machine. */
export type StateMotionSkin<State extends string, Animation extends string, Context = undefined> = {
  states: Record<StateMotionStateName<State>, StateMotionStateKeyframe<Context>>;
  animations?: Partial<Record<Animation, StateMotionAnimation | readonly StateMotionAnimation[]>>;
};

/** The animation started by the most recently accepted event. */
export type StateMotionAnimationSnapshot<State extends string, Event extends StateMotionEvent<PropertyKey>> = {
  id: number;
  /** The logical state before the event was accepted. */
  source: StateMotionStateName<State>;
  target: StateMotionStateName<State>;
  event: Event;
};

/** The current logical state and active animation. */
export type StateMotionSnapshot<State extends string, Event extends StateMotionEvent<PropertyKey>> = {
  state: StateMotionStateName<State>;
  animation: StateMotionAnimationSnapshot<State, Event> | undefined;
};

/** An event-driven controller for a flat state motion graph. */
export type StateMotionController<State extends string, Event extends StateMotionEvent<PropertyKey>> = {
  readonly definition: StateMotionGraphDefinition<State, Event>;
  /** Commits the target of the matching active animation. */
  completeAnimation(animationId: number): boolean;
  getSnapshot(): StateMotionSnapshot<State, Event>;
  send(event: Event): boolean;
  subscribe(listener: () => void): () => void;
};
