/**
 * This is the order in which state mixins should be applied
 */
const stateOrder: string[] = ['expanded', 'selected', 'shaded', 'primary', 'disabled'];

/**
 * Take an object, likely with some boolean flags for states to enable, and turn it into a state
 * string in a standard order
 *
 * @param mask - some kind of object where any values with keys matching the states in ILayerStates
 * where the values are truthy will cause that state to be added
 *
 * @internal This is an experimental interface and will be changed post design review.
 */
export function getStatesForLayer(mask: object): string | undefined {
  let states: string | undefined;
  for (const stateKey of stateOrder) {
    if (typeof stateKey === 'string' && mask[stateKey]) {
      states = states ? states + ' ' + stateKey : stateKey;
    }
  }
  return states;
}
