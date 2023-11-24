import * as React from 'react';
import { useOptionWalker } from './useOptionWalker';
import type { ActiveDescendantOptions } from './types';
import { ACTIVEDESCENDANT_ATTRIBUTE } from './constants';

export function useActiveDescendant<TActiveParentElement extends HTMLElement, TListboxElement extends HTMLElement>(
  options: ActiveDescendantOptions,
) {
  const { imperativeRef, matchOption } = options;
  const activeParentRef = React.useRef<TActiveParentElement>(null);
  const { listboxRef, optionWalker } = useOptionWalker<TListboxElement>({ matchOption });
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
    first: () => {
      if (!listboxRef.current || !activeParentRef.current) {
        return;
      }

      const first = optionWalker.first();
      if (first) {
        setActiveDescendant(first);
      }
    },
    next: () => {
      if (!listboxRef.current || !activeParentRef.current) {
        return;
      }

      const active = getActiveDescendant();
      if (!active) {
        return;
      }

      optionWalker.setCurrent(active);
      const next = optionWalker.next();
      if (next) {
        setActiveDescendant(next);
      }
    },
    prev: () => {
      if (!listboxRef.current || !activeParentRef.current) {
        return;
      }

      const active = getActiveDescendant();
      if (!active) {
        return;
      }

      optionWalker.setCurrent(active);
      const next = optionWalker.prev();

      if (next && next !== listboxRef.current) {
        setActiveDescendant(next);
      }
    },
    blur: () => {
      if (!listboxRef.current || !activeParentRef.current) {
        return;
      }

      setActiveDescendant(undefined);
    },
    active: () => {
      if (listboxRef.current) {
        return getActiveDescendant()?.id;
      }
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
