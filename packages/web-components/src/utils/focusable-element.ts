export const isARIADisabledElement = (el: Element): boolean => {
  return el.getAttribute('aria-disabled') === 'true';
};

export const isHiddenElement = (el: Element): boolean => {
  return el.hasAttribute('hidden');
};

export const isFocusableElement = (el: Element): boolean => {
  return !isARIADisabledElement(el) && !isHiddenElement(el);
};
