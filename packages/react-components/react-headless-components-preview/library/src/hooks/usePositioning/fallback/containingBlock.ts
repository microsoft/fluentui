import type { FallbackRect } from './computeFallbackPosition';

const FORMS_CONTAINING_BLOCK = /transform|perspective|filter/;

// Properties that are not supported are empty strings (i.e. in jsdom)
const isSet = (value: string | undefined): boolean => !!value && value !== 'none';

function isContainingBlock(style: CSSStyleDeclaration, strategy: 'absolute' | 'fixed'): boolean {
  return (
    (strategy === 'absolute' && style.position !== 'static') ||
    isSet(style.transform) ||
    isSet(style.perspective) ||
    isSet(style.filter) ||
    isSet(style.backdropFilter) ||
    (!!style.containerType && style.containerType !== 'normal') ||
    FORMS_CONTAINING_BLOCK.test(style.willChange) ||
    /paint|layout|strict|content/.test(style.contain)
  );
}

/**
 * Finds the element that forms the containing block of the positioned element,
 * `null` is the viewport (`fixed`) or the initial containing block (`absolute`).
 */
export function getContainingBlock(
  container: HTMLElement,
  strategy: 'absolute' | 'fixed',
): [element: HTMLElement | null, bounds: FallbackRect, originLeft: number, originTop: number] {
  const win = container.ownerDocument.defaultView;
  const root = container.ownerDocument.documentElement;
  let node = container.parentElement;

  while (win && node && node !== root) {
    if (isContainingBlock(win.getComputedStyle(node), strategy)) {
      break;
    }
    node = node.parentElement;
  }

  if (node && node !== root) {
    const rect = node.getBoundingClientRect();
    const originLeft = rect.left + node.clientLeft - node.scrollLeft;
    const originTop = rect.top + node.clientTop - node.scrollTop;

    return [
      node,
      { left: originLeft, top: originTop, width: node.clientWidth, height: node.clientHeight },
      originLeft,
      originTop,
    ];
  }

  const originLeft = strategy === 'fixed' ? 0 : -(win?.scrollX ?? 0);
  const originTop = strategy === 'fixed' ? 0 : -(win?.scrollY ?? 0);

  return [
    null,
    { left: originLeft, top: originTop, width: root.clientWidth, height: root.clientHeight },
    originLeft,
    originTop,
  ];
}
