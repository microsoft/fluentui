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
 * Refreshes a collection when a matching pending tag upgrades to a FAST element.
 */
export function runAfterPendingDefinitions<T extends Element>(
  elements: readonly Element[],
  predicate: ElementPredicate<T>,
  callback: () => void,
): void {
  const pendingElements = elements.filter(element => predicate(element) && !isUpgradedCustomElement(element));
  const pendingTagNames = new Set(pendingElements.map(element => element.localName));

  pendingTagNames.forEach(tagName => {
    customElements.whenDefined(tagName).then(() => {
      const matchingElements = pendingElements.filter(element => element.localName === tagName);
      matchingElements.forEach(element => customElements.upgrade(element));

      if (matchingElements.some(isUpgradedCustomElement)) {
        callback();
      }
    });
  });
}
