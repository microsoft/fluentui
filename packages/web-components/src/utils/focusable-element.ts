export const isARIADisabledElement = (el: Element): boolean => {
  return (
    el.getAttribute('aria-disabled') === 'true' ||
    ((el as any).elementInternals as ElementInternals | undefined)?.ariaDisabled === 'true'
  );
};

export const isHiddenElement = (el: Element): boolean => {
  return el.hasAttribute('hidden');
};

export const isFocusableElement = (el: Element): boolean => {
  return !isARIADisabledElement(el) && !isHiddenElement(el);
};
