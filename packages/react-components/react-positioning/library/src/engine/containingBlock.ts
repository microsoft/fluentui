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

export function getPhysicalParent(element: Element): HTMLElement | null {
  const parent = getParent(element, { skipVirtual: true });
  return isHTMLElement(parent) ? parent : null;
}

/**
 * Finds the element that forms the containing block of the positioned element,
 * `null` is the viewport (`fixed`) or the initial containing block (`absolute`).
 */
export function getContainingBlock(container: HTMLElement, strategy: 'absolute' | 'fixed'): HTMLElement | null {
  const win = container.ownerDocument.defaultView!;
  const root = container.ownerDocument.documentElement;
  for (let node = getPhysicalParent(container); node && node !== root; node = getPhysicalParent(node)) {
    if (isContainingBlock(win.getComputedStyle(node), strategy)) {
      return node;
    }
  }
  return null;
}
import { getParent, isHTMLElement } from '@fluentui/react-utilities';
