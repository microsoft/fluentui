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
export function getContainingBlockElement(container: HTMLElement, strategy: 'absolute' | 'fixed'): HTMLElement | null {
  const win = container.ownerDocument.defaultView;
  const root = container.ownerDocument.documentElement;
  let node = container.parentElement;

  while (win && node && node !== root) {
    if (isContainingBlock(win.getComputedStyle(node), strategy)) {
      return node;
    }
    node = node.parentElement;
  }

  return null;
}

export interface ContainingBlock {
  /** Padding box of the containing block, in the coordinates of the viewport */
  bounds: FallbackRect;
  /** The point where `left: 0; top: 0` is, in the coordinates of the viewport */
  originLeft: number;
  originTop: number;
}

export function measureContainingBlock(
  container: HTMLElement,
  element: HTMLElement | null,
  strategy: 'absolute' | 'fixed',
): ContainingBlock {
  const doc = container.ownerDocument;
  const root = doc.documentElement;

  if (element) {
    const rect = element.getBoundingClientRect();
    // Positioned elements scroll together with the content of their containing block
    const originLeft = rect.left + element.clientLeft - element.scrollLeft;
    const originTop = rect.top + element.clientTop - element.scrollTop;

    return {
      bounds: { left: originLeft, top: originTop, width: element.clientWidth, height: element.clientHeight },
      originLeft,
      originTop,
    };
  }

  const win = doc.defaultView;
  const originLeft = strategy === 'fixed' ? 0 : -(win?.scrollX ?? 0);
  const originTop = strategy === 'fixed' ? 0 : -(win?.scrollY ?? 0);

  return {
    bounds: { left: originLeft, top: originTop, width: root.clientWidth, height: root.clientHeight },
    originLeft,
    originTop,
  };
}
