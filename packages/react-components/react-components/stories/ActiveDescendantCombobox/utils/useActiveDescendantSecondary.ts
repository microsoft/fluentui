import * as React from 'react';
import { isHTMLElement } from '@fluentui/react-utilities';
import { ActiveDescendantImperativeRef } from './types';
import { ACTIVEDESCENDANT_ATTRIBUTE } from './constants';

export function useActiveDescendantSecondary(imperativeRef: React.RefObject<ActiveDescendantImperativeRef>) {
  const activeParentRef = React.useRef<HTMLInputElement>(null);
  const treeWalkerRef = React.useRef<TreeWalker>();
  const listboxRef = React.useRef<HTMLDivElement | null>(null);

  const listboxCbRef = React.useCallback((el: HTMLDivElement | null) => {
    if (el) {
      listboxRef.current = el;
      treeWalkerRef.current = el.ownerDocument.createTreeWalker(listboxRef.current, NodeFilter.SHOW_ELEMENT, node => {
        if (!isHTMLElement(node)) {
          return NodeFilter.FILTER_SKIP;
        }

        return node.role === 'button' || node.role === 'option' ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
      });
    }
  }, []);

  const getActiveDescendant = () => {
    return listboxRef.current?.querySelector<HTMLElement>(`[${ACTIVEDESCENDANT_ATTRIBUTE}]`);
  };

  const setActiveDescendant = (nextActive: HTMLElement | undefined) => {
    const active = getActiveDescendant();
    if (active) {
      active.removeAttribute(ACTIVEDESCENDANT_ATTRIBUTE);
    }

    if (nextActive) {
      nextActive.setAttribute(ACTIVEDESCENDANT_ATTRIBUTE, '');
      activeParentRef.current?.setAttribute('aria-activedescendant', nextActive.id);
    } else {
      activeParentRef.current?.removeAttribute('aria-activedescendant');
    }
  };

  React.useImperativeHandle(imperativeRef, () => ({
    first() {},
    next() {
      if (!listboxRef.current || !treeWalkerRef.current) {
        return;
      }

      const active = getActiveDescendant();
      if (!active) {
        return;
      }

      treeWalkerRef.current.currentNode = active;
      const nextActive = treeWalkerRef.current.nextNode() as HTMLElement | null;

      if (nextActive && nextActive.role !== 'option') {
        setActiveDescendant(nextActive);
        return true;
      }
    },
    prev() {
      if (!listboxRef.current || !treeWalkerRef.current) {
        return;
      }

      const active = getActiveDescendant();
      if (!active || active.role === 'option') {
        return;
      }

      treeWalkerRef.current.currentNode = active;
      const nextActive = treeWalkerRef.current.previousNode() as HTMLElement | null;

      if (nextActive) {
        setActiveDescendant(nextActive);
        return true;
      }
    },
    blur() {
      if (!activeParentRef.current) {
        return;
      }

      setActiveDescendant(undefined);
    },
    focus(id) {
      if (!listboxRef.current || !treeWalkerRef.current) {
        return;
      }

      const active = getActiveDescendant();
      if (!active) {
        return;
      }

      const el = listboxRef.current.querySelector<HTMLElement>(`#${id}`);

      if (el) {
        setActiveDescendant(el);
      }
    },
    active() {
      return getActiveDescendant()?.id;
    },
  }));
  return { listboxRef: listboxCbRef, activeParentRef };
}
