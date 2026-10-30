'use client';

import * as React from 'react';
import { isFocusVisible, useEventCallback, useKeyboardModality, useMergedRefs } from '@fluentui/react-utilities';
import { useOptionWalker } from './useOptionWalker';
import type { ActiveDescendantImperativeRef, ActiveDescendantOptions, UseActiveDescendantReturn } from './types';
import { ACTIVEDESCENDANT_ATTRIBUTE, ACTIVEDESCENDANT_FOCUSVISIBLE_ATTRIBUTE } from './constants';
import { scrollIntoView } from './scrollIntoView';

interface ActiveDescendantChangeEventDetail {
  id: string;
  previousId: string | null;
}

export type ActiveDescendantChangeEvent = CustomEvent<ActiveDescendantChangeEventDetail>;

export const createActiveDescendantChangeEvent = (
  detail: ActiveDescendantChangeEventDetail,
): ActiveDescendantChangeEvent =>
  new CustomEvent<ActiveDescendantChangeEventDetail>('activedescendantchange', {
    bubbles: true,
    cancelable: false,
    composed: true,
    detail,
  });

export function useActiveDescendant<TActiveParentElement extends HTMLElement, TListboxElement extends HTMLElement>(
  options: ActiveDescendantOptions,
): UseActiveDescendantReturn<TActiveParentElement, TListboxElement> {
  const { imperativeRef, matchOption: matchOptionUnstable } = options;
  const shouldShowFocusVisibleAttrRef = React.useRef(true);
  const activeIdRef = React.useRef<string | null>(null);
  const lastActiveIdRef = React.useRef<string | null>(null);
  const activeParentRef = React.useRef<TActiveParentElement>(null);
  const attributeVisibilityRef = React.useRef(true);

  const removeAttribute = React.useCallback(() => {
    activeParentRef.current?.removeAttribute('aria-activedescendant');
  }, []);

  const setAttribute = React.useCallback((id?: string) => {
    if (id) {
      activeIdRef.current = id;
    }
    if (attributeVisibilityRef.current && activeIdRef.current) {
      activeParentRef.current?.setAttribute('aria-activedescendant', activeIdRef.current);
    }
  }, []);

  const getKeyboardModality = useKeyboardModality(isKeyboard => {
    // eslint-disable-next-line react-hooks/immutability, react-hooks/preserve-manual-memoization
    const active = getActiveDescendant();
    if (!active) {
      return;
    }

    if (isKeyboard && shouldShowFocusVisibleAttrRef.current) {
      active.setAttribute(ACTIVEDESCENDANT_FOCUSVISIBLE_ATTRIBUTE, '');
    } else {
      active.removeAttribute(ACTIVEDESCENDANT_FOCUSVISIBLE_ATTRIBUTE);
    }
  });

  // DOM focus stays on the active parent, so the active descendant can't rely on native `:focus-visible`.
  // When no interaction was tracked yet (e.g. a keydown mounted the component), fall back to the active parent.
  const isNavigatingWithKeyboard = React.useCallback(() => {
    const activeParent = activeParentRef.current;
    return getKeyboardModality() ?? (activeParent ? isFocusVisible(activeParent) ?? false : false);
  }, [getKeyboardModality]);

  const matchOption = useEventCallback(matchOptionUnstable);
  const listboxRef = React.useRef<TListboxElement>(null);
  const { optionWalker, listboxCallbackRef } = useOptionWalker<TListboxElement>({ matchOption });

  // eslint-disable-next-line react-hooks/preserve-manual-memoization
  const getActiveDescendant = React.useCallback(() => {
    return listboxRef.current?.querySelector<HTMLElement>(`#${activeIdRef.current}`);
  }, [listboxRef]);

  const setShouldShowFocusVisibleAttribute = React.useCallback(
    (shouldShow: boolean) => {
      shouldShowFocusVisibleAttrRef.current = shouldShow;

      const active = getActiveDescendant();
      if (!active) {
        return;
      }

      if (shouldShow && isNavigatingWithKeyboard()) {
        active.setAttribute(ACTIVEDESCENDANT_FOCUSVISIBLE_ATTRIBUTE, '');
      } else {
        active.removeAttribute(ACTIVEDESCENDANT_FOCUSVISIBLE_ATTRIBUTE);
      }
    },
    [getActiveDescendant, isNavigatingWithKeyboard],
  );

  const blurActiveDescendant = React.useCallback(() => {
    const active = getActiveDescendant();
    if (active) {
      active.removeAttribute(ACTIVEDESCENDANT_ATTRIBUTE);
      active.removeAttribute(ACTIVEDESCENDANT_FOCUSVISIBLE_ATTRIBUTE);
    }

    removeAttribute();
    lastActiveIdRef.current = activeIdRef.current;
    activeIdRef.current = null;
    return active?.id ?? null;
  }, [getActiveDescendant, removeAttribute]);

  const focusActiveDescendant = React.useCallback(
    (nextActive: HTMLElement | null) => {
      if (!nextActive) {
        return;
      }

      const previousActiveId = blurActiveDescendant();

      scrollIntoView(nextActive);
      setAttribute(nextActive.id);
      nextActive.setAttribute(ACTIVEDESCENDANT_ATTRIBUTE, '');

      if (shouldShowFocusVisibleAttrRef.current && isNavigatingWithKeyboard()) {
        nextActive.setAttribute(ACTIVEDESCENDANT_FOCUSVISIBLE_ATTRIBUTE, '');
      }

      const event = createActiveDescendantChangeEvent({ id: nextActive.id, previousId: previousActiveId });
      nextActive.dispatchEvent(event);
    },
    [blurActiveDescendant, isNavigatingWithKeyboard, setAttribute],
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
      focusLastActive: () => {
        if (!listboxRef.current || !lastActiveIdRef.current) {
          return;
        }

        const target = listboxRef.current.querySelector<HTMLElement>(`#${lastActiveIdRef.current}`);
        if (target) {
          focusActiveDescendant(target);
          return true;
        }
      },
      find(predicate, { passive, startFrom } = {}) {
        const target = optionWalker.find(predicate, startFrom);
        if (!passive) {
          focusActiveDescendant(target);
        }

        return target?.id;
      },
      scrollActiveIntoView: () => {
        if (!listboxRef.current) {
          return;
        }

        const active = getActiveDescendant();
        if (!active) {
          return;
        }

        scrollIntoView(active);
      },
      showAttributes() {
        attributeVisibilityRef.current = true;
        setAttribute();
      },
      hideAttributes() {
        attributeVisibilityRef.current = false;
        removeAttribute();
      },
      showFocusVisibleAttributes() {
        setShouldShowFocusVisibleAttribute(true);
      },
      hideFocusVisibleAttributes() {
        setShouldShowFocusVisibleAttribute(false);
      },
    }),
    [
      optionWalker,
      listboxRef,
      setAttribute,
      removeAttribute,
      focusActiveDescendant,
      blurActiveDescendant,
      getActiveDescendant,
      setShouldShowFocusVisibleAttribute,
    ],
  );

  React.useImperativeHandle(imperativeRef, () => controller);

  return { listboxRef: useMergedRefs(listboxRef, listboxCallbackRef), activeParentRef, controller };
}
