const INERT_ATTRIBUTES = { inert: '', 'aria-hidden': 'true' };

const savedAttributes = new WeakMap<HTMLElement, Record<string, string | null>>();

export const setInert = (element: HTMLElement, inert: boolean): void => {
  const saved = savedAttributes.get(element);

  if (inert) {
    if (!saved) {
      savedAttributes.set(
        element,
        Object.fromEntries(Object.keys(INERT_ATTRIBUTES).map(name => [name, element.getAttribute(name)])),
      );
      Object.entries(INERT_ATTRIBUTES).forEach(([name, value]) => element.setAttribute(name, value));
    }

    return;
  }

  if (!saved) {
    return;
  }

  savedAttributes.delete(element);
  Object.entries(INERT_ATTRIBUTES).forEach(([name, value]) => {
    if (element.getAttribute(name) !== value) {
      return;
    }

    const previous = saved[name];
    if (previous === null) {
      element.removeAttribute(name);
    } else {
      element.setAttribute(name, previous);
    }
  });
};
