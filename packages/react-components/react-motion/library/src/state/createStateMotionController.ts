import type {
  StateMotionController,
  StateMotionDefinition,
  StateMotionEvent,
  StateMotionGraphDefinition,
  StateMotionMachineDefinition,
  StateMotionSnapshot,
  StateMotionStateName,
} from '../types';

/** Options for creating a state motion controller. */
export type StateMotionControllerOptions<State extends string> = {
  /** Overrides the definition's initial state. */
  initialState?: StateMotionStateName<State>;
};

/**
 * Creates an event-driven controller for a flat state motion graph.
 *
 * Event transitions commit synchronously. A state can start an animation whose target is committed with
 * `completeAnimation()`.
 */
export function createStateMotionController<State extends string, Event extends StateMotionEvent<PropertyKey>>(
  definition: StateMotionDefinition<State, Event>,
  options?: StateMotionControllerOptions<State>,
): StateMotionController<State, Event>;
/** Creates an event-driven controller for a state motion machine. */
export function createStateMotionController<
  State extends string,
  Event extends StateMotionEvent<PropertyKey>,
  Animation extends string,
>(
  definition: StateMotionMachineDefinition<State, Event, Animation>,
  options?: StateMotionControllerOptions<State>,
): StateMotionController<State, Event>;
export function createStateMotionController<State extends string, Event extends StateMotionEvent<PropertyKey>>(
  definition: StateMotionGraphDefinition<State, Event>,
  options: StateMotionControllerOptions<State> = {},
): StateMotionController<State, Event> {
  const hasReservedStateTarget = (Object.keys(definition.states) as StateMotionStateName<State>[]).some(stateName => {
    const node = definition.states[stateName];
    const transitions = node.on;

    return (
      node.animation?.target === 'target' ||
      Reflect.ownKeys(transitions ?? {}).some(
        eventType => transitions?.[eventType as Event['type']]?.target === 'target',
      )
    );
  });

  if (
    definition.initialState === 'target' ||
    options.initialState === 'target' ||
    Object.prototype.hasOwnProperty.call(definition.states, 'target') ||
    hasReservedStateTarget
  ) {
    throw new Error('createStateMotionController: "target" is reserved and cannot be used as a state name.');
  }

  let animationId = 0;
  let snapshot: StateMotionSnapshot<State, Event> = {
    state: options.initialState ?? definition.initialState,
    animation: undefined,
  };
  const listeners = new Set<() => void>();

  return {
    definition,
    completeAnimation: id => {
      const animation = snapshot.animation;
      if (!animation || animation.id !== id || snapshot.state === animation.target) {
        return false;
      }

      snapshot = { state: animation.target, animation: undefined };
      listeners.forEach(listener => listener());
      return true;
    },
    getSnapshot: () => snapshot,
    send: event => {
      const source = snapshot.state;
      const sourceNode = definition.states[source];
      const transitions = definition.states[source].on as
        | Partial<Record<Event['type'], { target: StateMotionStateName<State> }>>
        | undefined;
      const transition = transitions?.[event.type as Event['type']];

      if (!transition) {
        return false;
      }

      const state = transition.target;
      const enteredNode = definition.states[state];
      const stateAnimation = enteredNode.animation;
      const isVisualDefinition = 'keyframe' in sourceNode;

      snapshot = {
        state,
        animation: stateAnimation
          ? { id: ++animationId, source, target: stateAnimation.target, event }
          : isVisualDefinition
          ? { id: ++animationId, source, target: state, event }
          : undefined,
      };

      listeners.forEach(listener => listener());
      return true;
    },
    subscribe: listener => {
      listeners.add(listener);
      return () => listeners.delete(listener);
    },
  };
}
