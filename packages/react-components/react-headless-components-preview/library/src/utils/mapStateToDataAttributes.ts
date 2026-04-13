/**
 * Maps a state object to a set of data attributes based on a list of attribute keys. If the value of an attribute is `true`, it will be added as a boolean attribute (e.g., `data-attribute`). If the value is a string or any other truthy value, it will be added as a string attribute (e.g., `data-attribute="value"`). Falsy values (except for `true`) will not be included in the resulting object.
 *
 * @param state
 * @param attributes
 * @returns An object containing the mapped data attributes.
 */
export function mapStateToDataAttributes<State, Attribute extends keyof State>(
  state: State,
  attributes: Attribute[],
): Partial<Record<`data-${string}`, string>> {
  return Object.fromEntries(
    attributes
      .filter(attribute => Boolean(state[attribute]))
      .map(attribute => {
        const value = state[attribute];
        return [`data-${kebabCase(String(attribute))}`, value === true ? '' : String(value)];
      }),
  );
}

function kebabCase(str: string) {
  return str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
}
