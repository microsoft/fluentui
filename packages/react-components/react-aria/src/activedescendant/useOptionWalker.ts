import * as React from 'react';
import { useFluent_unstable as useFluent } from '@fluentui/react-shared-contexts';
import { isHTMLElement, useIsomorphicLayoutEffect } from '@fluentui/react-utilities';

interface UseOptionWalkerOptions {
  matchOption: (el: HTMLElement) => boolean;
}

export function useOptionWalker<TListboxElement extends HTMLElement>(options: UseOptionWalkerOptions) {
  const { matchOption } = options;
  const { targetDocument } = useFluent();
  const treeWalkerRef = React.useRef<TreeWalker | null>(null);
  const listboxRef = React.useRef<TListboxElement | null>(null);

  const optionFilter = React.useCallback(
    (node: Node) => {
      if (isHTMLElement(node) && matchOption(node)) {
        return NodeFilter.FILTER_ACCEPT;
      }

      return NodeFilter.FILTER_SKIP;
    },
    [matchOption],
  );

  useIsomorphicLayoutEffect(() => {
    if (!targetDocument || !listboxRef.current) {
      return;
    }

    treeWalkerRef.current = targetDocument.createTreeWalker(listboxRef.current, NodeFilter.SHOW_ELEMENT, optionFilter);
  }, [targetDocument, optionFilter]);

  const optionWalker = React.useMemo(
    () => ({
      first: () => {
        if (!treeWalkerRef.current) {
          return;
        }

        const node = treeWalkerRef.current.firstChild() as HTMLElement | null;
        return node;
      },
      next: () => {
        if (!treeWalkerRef.current) {
          return;
        }

        const node = treeWalkerRef.current.nextNode() as HTMLElement | null;
        return node;
      },
      prev: () => {
        if (!treeWalkerRef.current) {
          return;
        }

        const node = treeWalkerRef.current.previousNode() as HTMLElement | null;
        return node;
      },
      setCurrent: (el: HTMLElement) => {
        if (!treeWalkerRef.current) {
          return;
        }

        treeWalkerRef.current.currentNode = el;
      },
    }),
    [],
  );

  return {
    optionWalker,
    listboxRef,
  };
}
