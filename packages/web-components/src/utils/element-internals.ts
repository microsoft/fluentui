import { CustomStatesSetSupported } from './support.js';

/**
 * Inference type for a CSS custom state selector.
 * @public
 */
export type StateSelector<S> = S extends string ? `:state(${S})` | `[state--${S}]` : never;

export { CustomStatesSetSupported };

/**
 * Map to store the state values.
 * @internal
 */
const statesMap = new Map<string, StateSelector<string>>();

/**
 * Returns a string that represents a CSS custom state selector.
 *
 * @param state - the state value.
 * @returns a string that represents a CSS state selector, or a custom attribute selector if the browser does not
 * support Custom States.
 *
 * @public
 */
export function stateSelector<S extends string>(state: S): StateSelector<S> {
  return (statesMap.get(state) ??
    statesMap
      .set(state, CustomStatesSetSupported ? `:state(${state})` : `[state--${state}]`)
      .get(state)) as StateSelector<S>;
}

/**
 * This function is used to toggle a state on the control. If the browser supports Custom States, the state is toggled
 * on the `ElementInternals.states` set. If the browser does not support Custom States, the state is toggled on the host
 * element as an attribute with the format `state--{state}`.
 *
 * @see The {@link https://developer.mozilla.org/en-US/docs/Web/API/CustomStateSet | CustomStateSet} interface
 * @see The {@link https://developer.mozilla.org/en-US/docs/Web/API/ElementInternals | ElementInternals} interface
 * @see The CSS {@link https://developer.mozilla.org/en-US/docs/Web/CSS/:state | `:state()`} pseudo-class
 *
 * @param elementInternals - the `ElementInternals` instance for the component
 * @param state - the state to toggle
 * @param force - force the state to be toggled on or off
 * @internal
 */
export function toggleState(
  elementInternals: ElementInternals | undefined,
  state: string | undefined,
  force?: boolean,
): void {
  if (!state || !elementInternals) {
    return;
  }

  if (!CustomStatesSetSupported) {
    elementInternals.shadowRoot!.host.toggleAttribute(`state--${state}`, force);
    return;
  }
  if (force ?? !elementInternals.states.has(state)) {
    elementInternals.states.add(state);
    return;
  }
  elementInternals.states.delete(state);
}

/**
 * A weak map to store the valid states for attributes.
 * @internal
 */
const matchingStateMap = new WeakMap<Record<string, string>, Set<string>>();

/**
 * Check if a given attribute value is a valid state. Attribute values are often kebab-cased, so this function converts
 * the kebab-cased `state` to camelCase and checks if it exists in as a key in the `States` object.
 *
 * @param States  - the object containing valid states for the attribute
 * @param state - the state to check
 * @returns true if the state is in the States object
 * @internal
 */
export function hasMatchingState(States: Record<string, string> | undefined, state: string | undefined): boolean {
  if (!States || !state) {
    return false;
  }

  if (matchingStateMap.has(States)) {
    return matchingStateMap.get(States)!.has(state);
  }

  const stateSet = new Set(Object.values(States));
  matchingStateMap.set(States, stateSet);
  return stateSet.has(state);
}

/**
 * Swap an old state for a new state.
 *
 * @param elementInternals - the `ElementInternals` instance for the component
 * @param prev - the previous state to remove
 * @param next - the new state to add
 * @param States - the object containing valid states for the attribute
 * @param prefix - an optional prefix to add to the state
 *
 * @internal
 */
export function swapStates(
  elementInternals: ElementInternals,
  prev: string | undefined = '',
  next: string | undefined = '',
  States?: Record<string, string>,
  prefix: string = '',
): void {
  toggleState(elementInternals, `${prefix}${prev}`, false);

  if (!States || hasMatchingState(States, next)) {
    toggleState(elementInternals, `${prefix}${next}`, true);
  }
}
