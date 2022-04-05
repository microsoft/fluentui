import * as React from 'react';
import { DATAKTP_TARGET, DATAKTP_EXECUTE_TARGET, DATAKTP_ARIA_TARGET } from '../../utilities/keytips/index';
import { useKeytipData } from './useKeytipData';
import type { KeytipDataOptions } from './KeytipData.types';

/**
 * Hook that creates a ref which is used for passing to Keytip target element.
 * The ref will handle setting the attributes needed for Keytip to work.
 */
export function useKeytipRef<TElement extends HTMLElement = HTMLElement>(
  options: KeytipDataOptions,
): React.Ref<TElement> {
  const { keytipId, ariaDescribedBy } = useKeytipData(options);

  const contentRef: React.Ref<TElement> = React.useCallback(
    (contentElement: TElement | null): void => {
      if (!contentElement) {
        return;
      }

      const targetElement = findFirstElement(contentElement, DATAKTP_TARGET) || contentElement;
      const executeElement = findFirstElement(contentElement, DATAKTP_EXECUTE_TARGET) || targetElement;
      const ariaElement = findFirstElement(contentElement, DATAKTP_ARIA_TARGET) || executeElement;

      setAttribute(targetElement, DATAKTP_TARGET, keytipId);
      setAttribute(executeElement, DATAKTP_EXECUTE_TARGET, keytipId);
      setAttribute(ariaElement, 'aria-describedby', ariaDescribedBy, true);
    },
    [keytipId, ariaDescribedBy],
  );

  return contentRef;
}

export function setAttribute(
  element: HTMLElement | null,
  attributeName: string,
  attributeValue: string | undefined,
  append: boolean = false,
): void {
  if (element && attributeValue) {
    let value = attributeValue;
    if (append) {
      const currentValue = element.getAttribute(attributeName);
      if (currentValue && currentValue.indexOf(attributeValue) === -1) {
        value = `${currentValue} ${attributeValue}`;
      }
    }

    element.setAttribute(attributeName, value);
  }
}

function findFirstElement(rootElement: HTMLElement, dataAttribute: string): HTMLElement | null {
  return rootElement.querySelector(`[${dataAttribute}]`);
}
