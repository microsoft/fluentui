import * as React from 'react';
import { isHTMLElement } from '@fluentui/react-utilities';
import { useOptionWalker } from './useOptionWalker';
import { ActiveDescendantOptions } from './types';
import { ACTIVEDESCENDANT_ATTRIBUTE } from './constants';

export function useActiveDescendant<TActiveParentElement extends HTMLElement, TListboxElement extends HTMLElement>(
  options: ActiveDescendantOptions,
) {
  const { imperativeRef, matchOption } = options;
  const activeParentRef = React.useRef<TActiveParentElement>(null);
  const { listboxRef, optionWalker } = useOptionWalker<TListboxElement>({ matchOption });
  const getActiveDescendant = () => {
    return listboxRef.current?.querySelector(`[${ACTIVEDESCENDANT_ATTRIBUTE}]`);
  };

  const setActiveDescendant = (nextActive: HTMLElement | undefined) => {
    const active = getActiveDescendant();
    if (isHTMLElement(active)) {
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
    first: () => {
      if (!listboxRef.current || !activeParentRef.current) {
        return;
      }

      const first = optionWalker.first();

      if (!first || !isHTMLElement(first)) {
        return;
      }

      setActiveDescendant(first);
    },
    next: () => {
      if (!listboxRef.current || !activeParentRef.current) {
        return;
      }

      const active = getActiveDescendant();
      if (!isHTMLElement(active)) {
        return;
      }

      optionWalker.setCurrent(active);
      const next = optionWalker.next();
      if (!next) {
        return;
      }

      setActiveDescendant(next);
    },
    prev: () => {
      if (!listboxRef.current || !activeParentRef.current) {
        return;
      }

      const active = getActiveDescendant();
      if (!isHTMLElement(active)) {
        return;
      }

      optionWalker.setCurrent(active);
      const next = optionWalker.prev();
      if (!next || next === listboxRef.current) {
        return;
      }

      active.removeAttribute(ACTIVEDESCENDANT_ATTRIBUTE);
      next.setAttribute(ACTIVEDESCENDANT_ATTRIBUTE, '');
      activeParentRef.current.setAttribute('aria-activedescendant', next.id);
      setActiveDescendant(next);
    },
    blur: () => {
      if (!listboxRef.current || !activeParentRef.current) {
        return;
      }

      setActiveDescendant(undefined);
    },
    active: () => {
      if (!listboxRef.current) {
        return;
      }
      const active = getActiveDescendant();
      if (!isHTMLElement(active)) {
        return;
      }

      return active.id;
    },

    focus: (id: string) => {
      if (!listboxRef.current) {
        return;
      }

      optionWalker.setCurrent(listboxRef.current);
      let cur = optionWalker.next();

      while (cur && cur.id !== id) {
        cur = optionWalker.next();
      }

      if (cur) {
        setActiveDescendant(cur);
      }
    },
  }));

  return { listboxRef, activeParentRef };
}
