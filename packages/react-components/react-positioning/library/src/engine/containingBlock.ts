import { getParent, isHTMLElement } from '@fluentui/react-utilities';

const FORMS_CONTAINING_BLOCK = /transform|perspective|filter/;

// Properties that are not supported are empty strings (i.e. in jsdom)
const isSet = (value: string | undefined): boolean => !!value && value !== 'none';

export function isContainingBlock(style: CSSStyleDeclaration, strategy: 'absolute' | 'fixed'): boolean {
  return (
    (strategy === 'absolute' && !!style.position && style.position !== 'static') ||
    isSet(style.transform) ||
    isSet(style.translate) ||
    isSet(style.scale) ||
    isSet(style.rotate) ||
    isSet(style.perspective) ||
    isSet(style.filter) ||
    isSet(style.backdropFilter) ||
    /auto|hidden/.test(style.contentVisibility) ||
    (!!style.containerType && style.containerType !== 'normal') ||
    FORMS_CONTAINING_BLOCK.test(style.willChange) ||
    /paint|layout|strict|content/.test(style.contain)
  );
}

export function getPhysicalParent(element: Element): Element | null {
  const parent = element.assignedSlot || getParent(element, { skipVirtual: true });
  return parent?.nodeType === 1 ? (parent as Element) : null;
}

export function isTopLayer(element: Element): boolean {
  const css = element.ownerDocument.defaultView?.CSS;
  return [':popover-open', ':modal'].some(
    selector => css?.supports(`selector(${selector})`) && element.matches(selector),
  );
}

/**
 * Finds the element that forms the containing block of the positioned element,
 * `null` is the viewport (`fixed`) or the initial containing block (`absolute`).
 */
export function getContainingBlock(container: HTMLElement, strategy: 'absolute' | 'fixed'): HTMLElement | null {
  const win = container.ownerDocument.defaultView!;
  const root = container.ownerDocument.documentElement;
  for (let node = getPhysicalParent(container); node && node !== root; node = getPhysicalParent(node)) {
    if (isHTMLElement(node) && isContainingBlock(win.getComputedStyle(node), strategy)) {
      return node;
    }
  }
  return null;
}
