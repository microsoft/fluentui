/**
 * Assert whether a child selector is or is not present in a parent node.
 *
 * @param parentNode - A parent DOM node
 * @param childSelector - A DOM selector for the child node
 * @param isPresent - Indicating whether to assert is present or is not present
 */
export const assertNodeContains = (parentNode: Element, childSelector: string, isPresent: boolean = true) => {
  const didFind = parentNode.querySelector(childSelector) !== null;
  try {
    expect(didFind).toEqual(isPresent);
  } catch (err) {
    throw new Error(`${didFind ? 'Found' : 'Did not find'} "${childSelector}" in the ${parentNode}.`);
  }
};

/**
 * Assert whether node is or is not a child of the document.body.
 *
 * @param selector - A DOM selector for the parent node
 * @param isPresent - Indicating whether to assert is present or is not present
 */
export const assertBodyContains = (selector: string, isPresent: boolean = true) =>
  assertNodeContains(document.body, selector, isPresent);
