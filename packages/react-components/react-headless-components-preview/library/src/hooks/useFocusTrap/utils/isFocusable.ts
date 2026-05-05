import { isHTMLElement } from '@fluentui/react-utilities';
import { TABBABLE_NODES } from '../constants';
import { getTabIndex } from './getTabIndex';
import { isVisible } from './isVisible';

/**
 * Predicate: can the element receive programmatic focus?
 * Considers element type, `disabled`, `tabindex`, anchor `href`, and visibility.
 */
export function isFocusable(element: HTMLElement): boolean {
  const nodeName = element.nodeName.toLowerCase();
  const hasExplicitTabIndex = !Number.isNaN(getTabIndex(element));
  const isAnchor = isHTMLElement(element, { constructorName: 'HTMLAnchorElement' });
  const isFormControl = TABBABLE_NODES.test(nodeName);
  const isDisabled = (element as { disabled?: boolean }).disabled === true;

  const focusable =
    (isFormControl && !isDisabled) || (isAnchor ? Boolean(element.href) || hasExplicitTabIndex : hasExplicitTabIndex);

  return focusable && isVisible(element);
}
