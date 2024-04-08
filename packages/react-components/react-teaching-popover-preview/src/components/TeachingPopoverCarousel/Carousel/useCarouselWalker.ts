import * as React from 'react';
import { CAROUSEL_ACTIVE_ITM, CAROUSEL_ITEM } from './constants';
import { createContext } from 'react';
import { Context, ContextSelector } from '@fluentui/react-context-selector';
import { useContextSelector } from '@fluentui/react-context-selector';
import { isHTMLElement } from '@fluentui/react-utilities';
import { useFluent_unstable as useFluent } from '@fluentui/react-shared-contexts';

export const useCarouselWalker_unstable = () => {
  const { targetDocument } = useFluent();

  const treeWalkerRef = React.useRef<TreeWalker | undefined>(targetDocument?.createTreeWalker(targetDocument.body));
  const htmlRef = React.useRef<HTMLDivElement | undefined>(targetDocument?.createElement('div'));
  const ref = React.useCallback(
    (el: HTMLDivElement | null) => {
      if (!targetDocument) {
        return;
      }

      if (!el) {
        htmlRef.current = targetDocument.createElement('div');
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
    walker: React.useMemo(
      () => ({
        active() {
          if (!htmlRef.current) {
            return null;
          }

          const activeEl = htmlRef.current.querySelector(`[${CAROUSEL_ACTIVE_ITM}="true"]`)!;
          if (!activeEl) {
            return null;
          }
          return {
            el: activeEl,
            value: activeEl.getAttribute(CAROUSEL_ITEM)!,
          };
        },
        find(value: string) {
          if (!treeWalkerRef.current?.currentNode || !htmlRef.current) {
            return;
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
                value: nextNode.getAttribute(CAROUSEL_ITEM),
              };
            }
          }

          return null;
        },
        nextPage(value: string) {
          const res = this.find(value);
          if (!res || !treeWalkerRef.current?.currentNode) {
            return null;
          }

          treeWalkerRef.current.currentNode = res.el;
          const next = treeWalkerRef.current.nextNode();
          if (isHTMLElement(next)) {
            return { el: next, value: next.getAttribute(CAROUSEL_ITEM)! };
          }

          return null;
        },

        prevPage(value: string) {
          const res = this.find(value);
          if (!res || !treeWalkerRef.current?.currentNode) {
            return null;
          }

          treeWalkerRef.current.currentNode = res.el;
          const next = treeWalkerRef.current.previousNode();
          if (isHTMLElement(next)) {
            return { el: next, value: next.getAttribute(CAROUSEL_ITEM)! };
          }

          return null;
        },
      }),
      [],
    ),
  };
};

export type CarouselWalkerContextValue = ReturnType<typeof useCarouselWalker_unstable>['walker'];
export const carouselWalkerContextDefaultValue: CarouselWalkerContextValue = {
  find: () => {
    return null;
  },
  nextPage: () => {
    return null;
  },
  prevPage: () => {
    return null;
  },
  active: () => {
    return null;
  },
};

export const CarouselWalkerContext: Context<CarouselWalkerContextValue> = createContext<
  CarouselWalkerContextValue | undefined
>(undefined) as Context<CarouselWalkerContextValue>;

export const CarouselWalkerProvider = CarouselWalkerContext.Provider;

export const useCarouselWalkerContext_unstable = <T>(selector: ContextSelector<CarouselWalkerContextValue, T>): T =>
  useContextSelector(CarouselWalkerContext, (ctx = carouselWalkerContextDefaultValue) => selector(ctx));
