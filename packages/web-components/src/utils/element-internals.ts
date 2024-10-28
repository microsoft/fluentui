/**
 * Inference type for a CSS custom state selector.
 * @public
 */
export type StateSelector<S> = S extends string ? `:state(${S})` | `[state--${S}]` : never;

/**
 * Check if the browser supports Custom States.
 * @public
 */
export const CustomStatesSetSupported = CSS.supports('selector(:state(g))');

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
export function toggleState(elementInternals: ElementInternals, state: string, force?: boolean): void {
  if (!CustomStatesSetSupported) {
    elementInternals.shadowRoot!.host.toggleAttribute(`state--${state}`, force);
    return;
  }
  // @ts-expect-error - Baseline 2024
  if (force ?? !elementInternals.states.has(state)) {
    // @ts-expect-error - Baseline 2024
    elementInternals.states.add(state);
    return;
  }
  // @ts-expect-error - Baseline 2024
  elementInternals.states.delete(state);
}
