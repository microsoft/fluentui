//Copied from @microsoft/fast-foundation

/**
 * Helper for enumerating a type from a const object
 * Example: export type Foo = ValuesOf\<typeof Foo\>
 * @public
 */
export type ValuesOf<T> = T[keyof T];

/**
 * Creates a type guard that checks if a node is a custom element whose tag name ends with the given suffix.
 *
 * @param tagSuffix - The tag name suffix to match (e.g., '-dropdown', '-option').
 * @returns A predicate function that narrows the node to the specified element type.
 * @public
 */
export function isCustomElement<T extends HTMLElement>(tagSuffix: string): (element?: Node | null) => element is T {
  return (element?: Node | null): element is T => {
    if (element?.nodeType !== Node.ELEMENT_NODE) {
      return false;
    }

    return (element as Element).tagName.toLowerCase().endsWith(tagSuffix);
  };
}
