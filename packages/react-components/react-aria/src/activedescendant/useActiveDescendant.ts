import * as React from 'react';
import { useEventCallback } from '@fluentui/react-utilities';
import { useOnKeyboardNavigationChange } from '@fluentui/react-tabster';
import { useOptionWalker } from './useOptionWalker';
import type { ActiveDescendantImperativeRef, ActiveDescendantOptions, UseActiveDescendantReturn } from './types';
import { ACTIVEDESCENDANT_ATTRIBUTE, ACTIVEDESCENDANT_FOCUSVISIBLE_ATTRIBUTE } from './constants';
import { scrollIntoView } from './scrollIntoView';

export function useActiveDescendant<TActiveParentElement extends HTMLElement, TListboxElement extends HTMLElement>(
  options: ActiveDescendantOptions,
): UseActiveDescendantReturn<TActiveParentElement, TListboxElement> {
  const { imperativeRef, matchOption: matchOptionUnstable } = options;
  const focusVisibleRef = React.useRef(false);
  const activeIdRef = React.useRef<string | null>(null);
  const activeParentRef = React.useRef<TActiveParentElement>(null);

  useOnKeyboardNavigationChange(isNavigatingWithKeyboard => {
    focusVisibleRef.current = isNavigatingWithKeyboard;
    const active = getActiveDescendant();
    if (!active) {
      return;
    }

    if (isNavigatingWithKeyboard) {
      active.setAttribute(ACTIVEDESCENDANT_FOCUSVISIBLE_ATTRIBUTE, '');
    } else {
      active.removeAttribute(ACTIVEDESCENDANT_FOCUSVISIBLE_ATTRIBUTE);
    }
  });

  const matchOption = useEventCallback(matchOptionUnstable);
  const { listboxRef, optionWalker, listboxCallbackRef } = useOptionWalker<TListboxElement>({ matchOption });
  const getActiveDescendant = React.useCallback(() => {
    return listboxRef.current?.querySelector<HTMLElement>(`#${activeIdRef.current}`);
  }, [listboxRef]);

  const blurActiveDescendant = React.useCallback(() => {
    const active = getActiveDescendant();
    if (active) {
      active.removeAttribute(ACTIVEDESCENDANT_ATTRIBUTE);
      active.removeAttribute(ACTIVEDESCENDANT_FOCUSVISIBLE_ATTRIBUTE);
    }

    activeParentRef.current?.removeAttribute('aria-activedescendant');
    activeIdRef.current = null;
  }, [activeParentRef, getActiveDescendant]);

  const focusActiveDescendant = React.useCallback(
    (nextActive: HTMLElement | null) => {
      if (!nextActive) {
        return;
      }

      blurActiveDescendant();

      scrollIntoView(nextActive, listboxRef.current);
      activeParentRef.current?.setAttribute('aria-activedescendant', nextActive.id);
      activeIdRef.current = nextActive.id;
      nextActive.setAttribute(ACTIVEDESCENDANT_ATTRIBUTE, '');

      if (focusVisibleRef.current) {
        nextActive.setAttribute(ACTIVEDESCENDANT_FOCUSVISIBLE_ATTRIBUTE, '');
      }
    },
    [activeParentRef, listboxRef, blurActiveDescendant],
  );

  const controller: ActiveDescendantImperativeRef = React.useMemo(
    () => ({
      first: ({ passive } = {}) => {
        const first = optionWalker.first();
        if (!passive) {
          focusActiveDescendant(first);
        }

        return first?.id;
      },
      last: ({ passive } = {}) => {
        const last = optionWalker.last();
        if (!passive) {
          focusActiveDescendant(last);
        }

        return last?.id;
      },
      next: ({ passive } = {}) => {
        const active = getActiveDescendant();
        if (!active) {
          return;
        }

        optionWalker.setCurrent(active);
        const next = optionWalker.next();
        if (!passive) {
          focusActiveDescendant(next);
        }

        return next?.id;
      },
      prev: ({ passive } = {}) => {
        const active = getActiveDescendant();
        if (!active) {
          return;
        }

        optionWalker.setCurrent(active);
        const next = optionWalker.prev();

        if (!passive) {
          focusActiveDescendant(next);
        }

        return next?.id;
      },
      blur: () => {
        blurActiveDescendant();
      },
      active: () => {
        return getActiveDescendant()?.id;
      },

      focus: (id: string) => {
        if (!listboxRef.current) {
          return;
        }

        const target = listboxRef.current.querySelector<HTMLElement>(`#${id}`);
        if (target) {
          focusActiveDescendant(target);
        }
      },

      find(predicate, { passive } = {}) {
        const target = optionWalker.find(predicate);
        if (!passive) {
          focusActiveDescendant(target);
        }

        return target?.id;
      },
    }),
    [optionWalker, listboxRef, focusActiveDescendant, blurActiveDescendant, getActiveDescendant],
  );

  React.useImperativeHandle(imperativeRef, () => controller);

  return { listboxRef: listboxCallbackRef, activeParentRef, controller };
}
