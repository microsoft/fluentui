const positioningStyles = [
  'position',
  'inset',
  'top',
  'right',
  'bottom',
  'left',
  'inset-block',
  'inset-inline',
  'inset-block-start',
  'inset-block-end',
  'inset-inline-start',
  'inset-inline-end',
  'margin',
  'margin-top',
  'margin-right',
  'margin-bottom',
  'margin-left',
  'margin-block',
  'margin-inline',
  'margin-block-start',
  'margin-block-end',
  'margin-inline-start',
  'margin-inline-end',
  'width',
  'height',
  'max-width',
  'max-height',
  'overflow',
  'overflow-x',
  'overflow-y',
  'box-sizing',
  'transform',
  'position-anchor',
  'position-area',
  'position-try-fallbacks',
  'place-self',
  'align-self',
  'justify-self',
  '--fui-match-target-size',
];

const positioningAttributes = [
  'data-placement',
  'data-popper-placement',
  'data-popper-is-intersecting',
  'data-popper-escaped',
  'data-popper-reference-hidden',
];

export function preservePositioningStyles(element: HTMLElement): () => void {
  const styles = Array.from(element.style)
    .filter(name => positioningStyles.includes(name))
    .map(name => ({
      name,
      value: element.style.getPropertyValue(name),
      priority: element.style.getPropertyPriority(name),
    }));
  const attributes = positioningAttributes.map(name => ({ name, value: element.getAttribute(name) }));

  return () => {
    // Remove overlapping shorthands first, then restore the caller's declaration order.
    for (const name of positioningStyles) {
      element.style.removeProperty(name);
    }
    for (const { name, value, priority } of styles) {
      element.style.setProperty(name, value, priority);
    }
    for (const { name, value } of attributes) {
      if (value === null) {
        element.removeAttribute(name);
      } else {
        element.setAttribute(name, value);
      }
    }
  };
}
