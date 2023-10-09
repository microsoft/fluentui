import { getDocument, Rectangle } from '@fluentui/utilities';
import * as React from 'react';
import { useWindow } from '@fluentui/react-window-provider';
import type { Point } from '@fluentui/utilities';

export type Target = Element | string | MouseEvent | Point | Rectangle | null | React.RefObject<Element>;

/**
 * Hook to calculate and cache the target element specified by the given target attribute,
 * as well as the target element's (or host element's) parent window
 * @param target- Target selector passed to the component as a property, describing the element that
 * the callout should target
 * @param hostElement- The callout's host element, used for determining the parent window.
 */
export function useTarget<TElement extends HTMLElement = HTMLElement>(
  target: Target | undefined,
  hostElement?: React.RefObject<TElement | null>,
): Readonly<[React.RefObject<Element | MouseEvent | Point | Rectangle | null>, Window | undefined]> {
  const previousTargetProp = React.useRef<
    Element | string | MouseEvent | Point | Rectangle | React.RefObject<Element> | null | undefined
  >();

  const targetRef = React.useRef<Element | MouseEvent | Point | Rectangle | null>(null);
  /**
   * Stores an instance of Window, used to check
   * for server side rendering and if focus was lost.
   */
  const targetWindow = useWindow();

  // If the target element changed, find the new one. If we are tracking
  // target with class name, always find element because we do not know if
  // fabric has rendered a new element and disposed the old element.
  if (!target || target !== previousTargetProp.current || typeof target === 'string') {
    const currentElement = hostElement?.current;
    if (target) {
      if (typeof target === 'string') {
        // const currentDoc: Document = getDocument(currentElement)!;
        // targetRef.current = currentDoc ? currentDoc.querySelector(target) : null;

        // If element is part of shadow dom, then querySelector on shadow root, else query on document
        if ((currentElement?.getRootNode() as ShadowRoot)?.host) {
          targetRef.current = (currentElement?.getRootNode() as ShadowRoot)?.querySelector(target) ?? null;
        } else {
          const currentDoc: Document = getDocument(currentElement)!;
          targetRef.current = currentDoc ? currentDoc.querySelector(target) : null;
        }
      } else if ('stopPropagation' in target) {
        targetRef.current = target;
      } else if ('getBoundingClientRect' in target) {
        targetRef.current = target;
      } else if ('current' in target) {
        targetRef.current = target.current;
      } else {
        targetRef.current = target;
      }
    }
    previousTargetProp.current = target;
  }

  return [targetRef, targetWindow] as const;
}
