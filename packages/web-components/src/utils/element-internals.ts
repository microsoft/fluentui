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

/**
 * A decorator for toggling the element internals of an element
 *
 * @internal
 */
export function toggleAttrState(target: any, attr: string): any {
  // Stash the original method
  const method = target[`${attr}Changed`];

  // Replace the attrChanged method with a new one
  target[`${attr}Changed`] = function (prev: string | boolean | undefined, next: string | boolean | undefined): void {
    // Call original method
    if (method) {
      method.call(this, prev, next);
    }
    // Update elementInternals state for booleans
    if (typeof next === 'boolean') {
      toggleState(this.elementInternals, attr, next);
      return;
    }

    // Update elementInternals state for strings
    // TODO: Flip to `${attr}-${next}` when Custom States are supported
    if (prev) {
      toggleState(this.elementInternals, `${prev}`, false);
    }
    if (next) {
      toggleState(this.elementInternals, `${next}`, true);
    }
  };
}
