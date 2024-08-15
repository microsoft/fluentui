import * as React from 'react';
import { useFluent_unstable as useFluent } from '@fluentui/react-shared-contexts';
import { isHTMLElement } from '@fluentui/react-utilities';

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

  const setListbox = React.useCallback(
    (el: TListboxElement) => {
      if (el && targetDocument) {
        listboxRef.current = el;
        treeWalkerRef.current = targetDocument.createTreeWalker(el, NodeFilter.SHOW_ELEMENT, optionFilter);
      } else {
        listboxRef.current = null;
      }
    },
    [targetDocument, optionFilter],
  );

  const optionWalker = React.useMemo(
    () => ({
      first: () => {
        if (!treeWalkerRef.current || !listboxRef.current) {
          return null;
        }

        treeWalkerRef.current.currentNode = listboxRef.current;
        return treeWalkerRef.current.firstChild() as HTMLElement | null;
      },
      last: () => {
        if (!treeWalkerRef.current || !listboxRef.current) {
          return null;
        }

        treeWalkerRef.current.currentNode = listboxRef.current;
        return treeWalkerRef.current.lastChild() as HTMLElement | null;
      },
      next: () => {
        if (!treeWalkerRef.current) {
          return null;
        }

        return treeWalkerRef.current.nextNode() as HTMLElement | null;
      },
      prev: () => {
        if (!treeWalkerRef.current) {
          return null;
        }

        return treeWalkerRef.current.previousNode() as HTMLElement | null;
      },
      find: (predicate: (id: string) => boolean, startFrom?: string) => {
        if (!treeWalkerRef.current || !listboxRef.current) {
          return null;
        }

        const start = startFrom ? targetDocument?.getElementById(startFrom) : null;
        treeWalkerRef.current.currentNode = start ?? listboxRef.current;
        let cur: HTMLElement | null = treeWalkerRef.current.currentNode as HTMLElement;
        while (cur && !predicate(cur.id)) {
          cur = treeWalkerRef.current.nextNode() as HTMLElement | null;
        }

        return cur;
      },
      setCurrent: (el: HTMLElement) => {
        if (!treeWalkerRef.current) {
          return;
        }

        treeWalkerRef.current.currentNode = el;
      },
    }),
    [targetDocument],
  );

  return {
    optionWalker,
    listboxCallbackRef: setListbox,
  };
}
