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
      if (!isHTMLElement(node)) {
        return NodeFilter.FILTER_SKIP;
      }

      return matchOption(node) ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP;
    },
    [matchOption],
  );

  useIsomorphicLayoutEffect(() => {
    if (!targetDocument || !listboxRef.current) {
      return;
    }

    treeWalkerRef.current = targetDocument.createTreeWalker(listboxRef.current, NodeFilter.SHOW_ELEMENT, optionFilter);
  }, [targetDocument, optionFilter]);

  const first = React.useCallback(() => {
    if (!treeWalkerRef.current) {
      return;
    }

    const node = treeWalkerRef.current.firstChild();
    if (!isHTMLElement(node)) {
      return null;
    }

    return node;
  }, []);

  const next = React.useCallback(() => {
    if (!treeWalkerRef.current) {
      return;
    }

    const node = treeWalkerRef.current.nextNode();
    if (!isHTMLElement(node)) {
      return null;
    }

    return node;
  }, []);

  const prev = React.useCallback(() => {
    if (!treeWalkerRef.current) {
      return;
    }

    const node = treeWalkerRef.current.previousNode();
    if (!isHTMLElement(node)) {
      return null;
    }

    return node;
  }, []);

  const setCurrent = React.useCallback((el: HTMLElement) => {
    if (!treeWalkerRef.current) {
      return;
    }

    treeWalkerRef.current.currentNode = el;
  }, []);

  return {
    optionWalker: {
      first,
      next,
      prev,
      setCurrent,
    },
    listboxRef,
  };
}
