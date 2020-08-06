import { Point, getDocument, getWindow } from '@uifabric/utilities';
import * as React from 'react';

export type Target = Element | string | MouseEvent | Point | null | React.RefObject<Element>;

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
): Readonly<[React.RefObject<Element | MouseEvent | Point | null>, React.RefObject<Window | undefined>]> {
  const previousTargetProp = React.useRef<
    Element | string | MouseEvent | Point | React.RefObject<Element> | null | undefined
  >();

  const targetRef = React.useRef<Element | MouseEvent | Point | null>(null);
  /**
   * Stores an instance of Window, used to check
   * for server side rendering and if focus was lost.
   */
  const targetWindowRef = React.useRef<Window>();

  // If the target element changed, find the new one. If we are tracking
  // target with class name, always find element because we do not know if
  // fabric has rendered a new element and disposed the old element.
  if (!target || target !== previousTargetProp.current || typeof target === 'string') {
    const currentElement = hostElement?.current;
    if (target) {
      if (typeof target === 'string') {
        const currentDoc: Document = getDocument(currentElement)!;
        targetRef.current = currentDoc ? currentDoc.querySelector(target) : null;
        targetWindowRef.current = getWindow(currentElement)!;
      } else if ('stopPropagation' in target) {
        targetWindowRef.current = getWindow(target.target as Element)!;
        targetRef.current = target;
      } else if ('getBoundingClientRect' in target) {
        targetWindowRef.current = getWindow(currentElement)!;
        targetRef.current = target;
      } else if ('current' in target && target.current !== undefined) {
        targetRef.current = target.current;
        targetWindowRef.current = getWindow(target.current)!;
      } else {
        targetWindowRef.current = getWindow(currentElement)!;
        targetRef.current = target as Point;
      }
    } else {
      targetWindowRef.current = getWindow(currentElement)!;
    }
    previousTargetProp.current = target;
  }

  return [targetRef, targetWindowRef] as const;
}
