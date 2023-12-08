import * as React from 'react';
import { useOptionWalker } from './useOptionWalker';
import type { ActiveDescendantImperativeRef, ActiveDescendantOptions } from './types';
import { ACTIVEDESCENDANT_ATTRIBUTE } from './constants';
import { useMergedRefs } from '@fluentui/react-utilities';

export function useActiveDescendant<TActiveParentElement extends HTMLElement, TListboxElement extends HTMLElement>(
  options: ActiveDescendantOptions,
) {
  const { imperativeRef: imperativeRefProp, matchOption } = options;
  const activeParentRef = React.useRef<TActiveParentElement>(null);
  const { listboxRef, optionWalker } = useOptionWalker<TListboxElement>({ matchOption });
  const imperativeRef = React.useRef<ActiveDescendantImperativeRef>();
  const getActiveDescendant = () => {
    return listboxRef.current?.querySelector<HTMLElement>(`[${ACTIVEDESCENDANT_ATTRIBUTE}]`);
  };

  const scrollActiveIntoView = (active: HTMLElement) => {
    if (!listboxRef.current) {
      return;
    }

    if (listboxRef.current.offsetHeight >= listboxRef.current.scrollHeight) {
      return;
    }

    const { offsetHeight, offsetTop } = active;
    const { offsetHeight: parentOffsetHeight, scrollTop } = listboxRef.current;

    const isAbove = offsetTop < scrollTop;
    const isBelow = offsetTop + offsetHeight > scrollTop + parentOffsetHeight;

    const buffer = 2;

    if (isAbove) {
      listboxRef.current.scrollTo(0, offsetTop - buffer);
    }

    if (isBelow) {
      listboxRef.current.scrollTo(0, offsetTop - parentOffsetHeight + offsetHeight + buffer);
    }
  };

  const setActiveDescendant = (nextActive: HTMLElement | undefined) => {
    const active = getActiveDescendant();
    if (active) {
      active.removeAttribute(ACTIVEDESCENDANT_ATTRIBUTE);
    }

    if (nextActive) {
      nextActive.setAttribute(ACTIVEDESCENDANT_ATTRIBUTE, '');
      scrollActiveIntoView(nextActive);
      activeParentRef.current?.setAttribute('aria-activedescendant', nextActive.id);
    } else {
      activeParentRef.current?.removeAttribute('aria-activedescendant');
    }
  };

  React.useImperativeHandle(useMergedRefs(imperativeRef, imperativeRefProp), () => ({
    first: () => {
      if (!listboxRef.current || !activeParentRef.current) {
        return;
      }

      optionWalker.setCurrent(listboxRef.current);
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
      if (!matchOption(active)) {
        optionWalker.prev();
      }

      const next = optionWalker.prev();

      if (next && next !== listboxRef.current) {
        setActiveDescendant(next);
      }
    },
    blur: () => {
      if (!activeParentRef.current) {
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

  return { listboxRef, activeParentRef, imperativeRef };
}
