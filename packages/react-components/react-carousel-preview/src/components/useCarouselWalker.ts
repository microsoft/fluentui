import * as React from 'react';
import { isHTMLElement } from '@fluentui/react-utilities';
import { useFluent_unstable as useFluent } from '@fluentui/react-shared-contexts';

import { CAROUSEL_ACTIVE_ITEM, CAROUSEL_ITEM } from './constants';

export type CarouselWalker = {
  find(value: string): { el: HTMLElement; value: string } | null;
  nextPage(value: string, circular?: Boolean): { el: HTMLElement; value: string } | null;
  prevPage(value: string, circular?: Boolean): { el: HTMLElement; value: string } | null;
  active(): { el: HTMLElement; value: string } | null;
};

export const useCarouselWalker_unstable = () => {
  const { targetDocument } = useFluent();

  const treeWalkerRef = React.useRef<TreeWalker | undefined>(targetDocument?.createTreeWalker(targetDocument.body));
  const htmlRef = React.useRef<HTMLDivElement | null>(null);

  const ref = React.useCallback(
    (el: HTMLDivElement | null) => {
      if (!targetDocument) {
        return;
      }

      if (!el) {
        return;
      }

      htmlRef.current = el;
      treeWalkerRef.current = targetDocument.createTreeWalker(el, NodeFilter.SHOW_ELEMENT, {
        acceptNode(node) {
          if (!isHTMLElement(node)) {
            return NodeFilter.FILTER_SKIP;
          }

          return node.hasAttribute(CAROUSEL_ITEM) ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP;
        },
      });
    },
    [targetDocument],
  );

  return {
    ref,
    walker: React.useMemo<CarouselWalker>(
      () => ({
        active() {
          if (!htmlRef.current) {
            return null;
          }

          const activeEl = htmlRef.current.querySelector(`[${CAROUSEL_ACTIVE_ITEM}="true"]`)!;

          if (isHTMLElement(activeEl)) {
            return {
              el: activeEl,
              value: activeEl.getAttribute(CAROUSEL_ITEM)!,
            };
          }

          return null;
        },
        find(value: string) {
          if (!treeWalkerRef.current?.currentNode || !htmlRef.current) {
            return null;
          }

          treeWalkerRef.current.currentNode = htmlRef.current;
          let nextNode: Node | null = null;
          while ((nextNode = treeWalkerRef.current.nextNode())) {
            if (!isHTMLElement(nextNode)) {
              continue;
            }

            if (nextNode.getAttribute(CAROUSEL_ITEM) === value) {
              return {
                el: nextNode,
                value: nextNode.getAttribute(CAROUSEL_ITEM)!,
              };
            }
          }

          return null;
        },
        nextPage(value: string, circular?: Boolean) {
          const res = this.find(value);
          if (!res || !treeWalkerRef.current?.currentNode) {
            return null;
          }

          treeWalkerRef.current.currentNode = res.el;

          let next = treeWalkerRef.current.nextNode();
          if (circular && !isHTMLElement(next) && htmlRef.current) {
            treeWalkerRef.current.currentNode = htmlRef.current;
            next = treeWalkerRef.current.firstChild();
          }

          if (isHTMLElement(next)) {
            return {
              el: next,
              value: next.getAttribute(CAROUSEL_ITEM)!,
            };
          }

          return null;
        },
        prevPage(value: string, circular?: Boolean) {
          const res = this.find(value);
          if (!res || !treeWalkerRef.current?.currentNode) {
            return null;
          }

          treeWalkerRef.current.currentNode = res.el;
          let next = treeWalkerRef.current.previousNode();

          if (circular && !isHTMLElement(next) && htmlRef.current) {
            treeWalkerRef.current.currentNode = htmlRef.current;
            next = treeWalkerRef.current.lastChild();
          }

          if (isHTMLElement(next)) {
            return {
              el: next,
              value: next.getAttribute(CAROUSEL_ITEM)!,
            };
          }

          return null;
        },
      }),
      [],
    ),
  };
};
