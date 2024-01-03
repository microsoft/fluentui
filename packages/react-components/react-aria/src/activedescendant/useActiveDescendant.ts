import * as React from 'react';
import { useMergedRefs } from '@fluentui/react-utilities';
import { useOptionWalker } from './useOptionWalker';
import type { ActiveDescendantImperativeRef, ActiveDescendantOptions } from './types';
import { ACTIVEDESCENDANT_ATTRIBUTE } from './constants';
import { useOnKeyboardNavigationChange } from '@fluentui/react-tabster';
import { useFluent_unstable as useFluent } from '@fluentui/react-shared-contexts';

export function useActiveDescendant<TActiveParentElement extends HTMLElement, TListboxElement extends HTMLElement>(
  options: ActiveDescendantOptions,
) {
  const { targetDocument } = useFluent();
  const focusVisibleRef = React.useRef(false);
  const { imperativeRef: imperativeRefProp, matchOption } = options;
  const activeParentRef = React.useRef<TActiveParentElement>(null);
  const activeIdRef = React.useRef<string | null>(null);
  const { listboxRef, optionWalker } = useOptionWalker<TListboxElement>({ matchOption });
  const imperativeRef = React.useRef<ActiveDescendantImperativeRef>({
    active() {
      return undefined;
    },

    blur() {
      return undefined;
    },

    first() {
      return undefined;
    },

    last() {
      return undefined;
    },

    focus(id) {
      return undefined;
    },

    next() {
      return undefined;
    },

    prev() {
      return undefined;
    },

    find() {
      return undefined;
    },
  });

  const getActiveDescendant = () => {
    if (activeIdRef.current) {
      return targetDocument?.getElementById(activeIdRef.current);
    }

    return null;
  };

  useOnKeyboardNavigationChange(isNavigatingWithKeyboard => {
    focusVisibleRef.current = isNavigatingWithKeyboard;
    const active = getActiveDescendant();
    if (!active) {
      return;
    }

    if (isNavigatingWithKeyboard) {
      active.setAttribute(ACTIVEDESCENDANT_ATTRIBUTE, '');
    } else {
      active.removeAttribute(ACTIVEDESCENDANT_ATTRIBUTE);
    }
  });

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
    activeIdRef.current = null;
    if (active) {
      active.removeAttribute(ACTIVEDESCENDANT_ATTRIBUTE);
    }

    if (nextActive) {
      if (focusVisibleRef.current) {
        nextActive.setAttribute(ACTIVEDESCENDANT_ATTRIBUTE, '');
      }

      activeIdRef.current = nextActive.id;
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
    last: () => {
      if (!listboxRef.current || !activeParentRef.current) {
        return;
      }

      optionWalker.setCurrent(listboxRef.current);
      const last = optionWalker.last();
      if (last) {
        setActiveDescendant(last);
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

    find(pred: (id: string) => boolean) {
      if (!listboxRef.current) {
        return;
      }

      const active = getActiveDescendant();
      if (active) {
        optionWalker.setCurrent(active);
      }

      let cur = active;
      while (cur && !pred(cur.id)) {
        cur = optionWalker.next();
      }

      if (cur) {
        setActiveDescendant(cur);
        return cur.id;
      }

      optionWalker.setCurrent(listboxRef.current);
      cur = optionWalker.next();
      while (cur && cur !== active && !pred(cur.id)) {
        cur = optionWalker.next();
      }

      if (cur && cur !== active) {
        setActiveDescendant(cur);
        return cur.id;
      }
    },
  }));

  return { listboxRef, activeParentRef, imperativeRef };
}
