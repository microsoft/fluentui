import * as React from 'react';
import { useEventCallback } from '@fluentui/react-utilities';
import { useOptionWalker } from './useOptionWalker';
import type { ActiveDescendantImperativeRef, ActiveDescendantOptions, UseActiveDescendantReturn } from './types';
import { ACTIVEDESCENDANT_ATTRIBUTE } from './constants';
import { scrollIntoView } from './scrollIntoView';

export function useActiveDescendant<TActiveParentElement extends HTMLElement, TListboxElement extends HTMLElement>(
  options: ActiveDescendantOptions,
): UseActiveDescendantReturn<TActiveParentElement, TListboxElement> {
  const { imperativeRef, matchOption: matchOptionUnstable } = options;
  const activeParentRef = React.useRef<TActiveParentElement>(null);

  const matchOption = useEventCallback(matchOptionUnstable);
  const { listboxRef, optionWalker } = useOptionWalker<TListboxElement>({ matchOption });
  const getActiveDescendant = React.useCallback(() => {
    return listboxRef.current?.querySelector<HTMLElement>(`[${ACTIVEDESCENDANT_ATTRIBUTE}]`);
  }, [listboxRef]);

  const blurActiveDescendant = React.useCallback(() => {
    const active = getActiveDescendant();
    if (active) {
      active.removeAttribute(ACTIVEDESCENDANT_ATTRIBUTE);
    }

    activeParentRef.current?.removeAttribute('aria-activedescendant');
  }, [activeParentRef, getActiveDescendant]);

  const focusActiveDescendant = React.useCallback(
    (nextActive: HTMLElement | null) => {
      if (!nextActive) {
        return;
      }

      blurActiveDescendant();

      nextActive.setAttribute(ACTIVEDESCENDANT_ATTRIBUTE, '');
      scrollIntoView(nextActive, listboxRef.current);
      activeParentRef.current?.setAttribute('aria-activedescendant', nextActive.id);
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

  return { listboxRef, activeParentRef, controller };
}
