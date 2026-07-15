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
 * The controller commits a transition's target synchronously. Animation is a separate effect of the selected edge.
 */
export function createStateMotionController<State extends string, Event extends StateMotionEvent<PropertyKey>>(
  definition: StateMotionDefinition<State, Event>,
  options?: StateMotionControllerOptions<State>,
): StateMotionController<State, Event>;
export function createStateMotionController<
  State extends string,
  Event extends StateMotionEvent<PropertyKey>,
  Transition extends string,
>(
  definition: StateMotionMachineDefinition<State, Event, Transition>,
  options?: StateMotionControllerOptions<State>,
): StateMotionController<State, Event>;
export function createStateMotionController<State extends string, Event extends StateMotionEvent<PropertyKey>>(
  definition: StateMotionGraphDefinition<State, Event>,
  options: StateMotionControllerOptions<State> = {},
): StateMotionController<State, Event> {
  const hasReservedTransitionTarget = (Object.keys(definition.states) as StateMotionStateName<State>[]).some(
    stateName => {
      const transitions = definition.states[stateName].on;

      return Reflect.ownKeys(transitions ?? {}).some(
        eventType => transitions?.[eventType as Event['type']]?.target === 'target',
      );
    },
  );

  if (
    definition.initialState === 'target' ||
    options.initialState === 'target' ||
    Object.prototype.hasOwnProperty.call(definition.states, 'target') ||
    hasReservedTransitionTarget
  ) {
    throw new Error('createStateMotionController: "target" is reserved and cannot be used as a state name.');
  }

  let transitionId = 0;
  let snapshot: StateMotionSnapshot<State, Event> = {
    state: options.initialState ?? definition.initialState,
    transition: undefined,
  };
  const listeners = new Set<() => void>();

  return {
    definition,
    getSnapshot: () => snapshot,
    send: event => {
      const source = snapshot.state;
      const transitions = definition.states[source].on as
        | Partial<Record<Event['type'], { target: StateMotionStateName<State> }>>
        | undefined;
      const transition = transitions?.[event.type as Event['type']];

      if (!transition) {
        return false;
      }

      snapshot = {
        state: transition.target,
        transition: {
          id: ++transitionId,
          source,
          target: transition.target,
          event,
        },
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
