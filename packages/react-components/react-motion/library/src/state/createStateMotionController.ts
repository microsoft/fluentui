import type {
  StateMotionController,
  StateMotionDefinition,
  StateMotionEvent,
  StateMotionSnapshot,
  StateMotionTransition,
} from '../types';

/** Options for creating a state motion controller. */
export type StateMotionControllerOptions<State extends string> = {
  /** Overrides the definition's initial state. */
  initialState?: State;
};

/**
 * Creates an event-driven controller for a flat state motion graph.
 *
 * The controller commits a transition's target synchronously. Animation is a separate effect of the selected edge.
 */
export function createStateMotionController<State extends string, Event extends StateMotionEvent<PropertyKey>>(
  definition: StateMotionDefinition<State, Event>,
  options: StateMotionControllerOptions<State> = {},
): StateMotionController<State, Event> {
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
        | Partial<Record<Event['type'], StateMotionTransition<State, Event>>>
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
