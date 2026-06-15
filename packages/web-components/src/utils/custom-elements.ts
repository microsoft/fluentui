type ElementPredicate<T extends Element> = (element: Element) => element is T;

/**
 * Returns true once FAST has upgraded the element instance.
 */
export function isUpgradedCustomElement(element: Element): boolean {
  return '$fastController' in element;
}

/**
 * Filters matching custom elements down to instances that have finished upgrading.
 */
export function getUpgradedCustomElements<T extends Element>(
  elements: readonly Element[],
  predicate: ElementPredicate<T>,
): T[] {
  return elements.filter((element): element is T => predicate(element) && isUpgradedCustomElement(element));
}

/**
 * Runs a callback after all matching, still-pending custom element tag definitions resolve.
 */
export function runAfterPendingDefinitions<T extends Element>(
  elements: readonly Element[],
  predicate: ElementPredicate<T>,
  callback: () => void,
): void {
  const pendingTagNames = [
    ...new Set(
      elements
        .filter(element => predicate(element) && !isUpgradedCustomElement(element))
        .map(element => element.localName),
    ),
  ];

  if (pendingTagNames.length === 0) {
    return;
  }

  Promise.all(pendingTagNames.map(tagName => customElements.whenDefined(tagName))).then(callback);
}
