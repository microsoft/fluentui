/**
 * Check if the browser supports Custom States.
 * @public
 */
export const CustomStatesSetSupported = CSS.supports('selector(:state(g))');

/**
 * This function is used to toggle a state on the control. If the browser supports Custom States, the state is toggled
 * on the `ElementInternals.states` set. If the browser does not support Custom States, the state is toggled on the host
 * element as an attribute with the format `state--{state}`.
 *
 * @param state - The state to toggle
 * @param force - true to add the state, false to remove it
 * @internal
 */
export function toggleState(elementInternals: ElementInternals, state: string, force?: boolean): void {
  if (!CustomStatesSetSupported) {
    elementInternals.shadowRoot!.host.toggleAttribute(`state--${state}`, force);
    return;
  }

  force = force ?? !elementInternals.states.has(state);

  if (force) {
    elementInternals.states.add(state);
    return;
  }

  elementInternals.states.delete(state);
}
