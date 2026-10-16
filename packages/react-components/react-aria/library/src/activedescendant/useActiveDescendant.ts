'use client';

import * as React from 'react';
import { useEventCallback, useMergedRefs } from '@fluentui/react-utilities';
import { useFluent_unstable as useFluent } from '@fluentui/react-shared-contexts';
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
  const focusVisibleRef = React.useRef<boolean | undefined>(undefined);
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

  const { targetDocument } = useFluent();

  const onKeyboardNavigationChange = useEventCallback((isNavigatingWithKeyboard: boolean) => {
    if (focusVisibleRef.current === isNavigatingWithKeyboard) {
      return;
    }

    focusVisibleRef.current = isNavigatingWithKeyboard;

    // eslint-disable-next-line react-hooks/immutability
    const active = getActiveDescendant();
    if (!active) {
      return;
    }

    if (isNavigatingWithKeyboard && shouldShowFocusVisibleAttrRef.current) {
      active.setAttribute(ACTIVEDESCENDANT_FOCUSVISIBLE_ATTRIBUTE, '');
    } else {
      active.removeAttribute(ACTIVEDESCENDANT_FOCUSVISIBLE_ATTRIBUTE);
    }
  });

  // Tracks whether the user navigates with the keyboard or a pointer, to decide whether the active descendant
  // shows focus-visible styles. DOM focus stays on the active parent, so native `:focus-visible` can't be used.
  // Intentionally does not use keyborg, so that consumers without tabster don't pay for it.
  React.useEffect(() => {
    if (!targetDocument) {
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      const eventTarget = event.composedPath()[0] ?? event.target;
      const activeParent = activeParentRef.current;
      const NodeConstructor = targetDocument.defaultView?.Node;
      const isWithinActiveParent =
        activeParent !== null &&
        NodeConstructor !== undefined &&
        eventTarget instanceof NodeConstructor &&
        activeParent.contains(eventTarget);

      // Keyboard navigation can either happen in the active parent or transfer focus from another control.
      if (event.key === 'Tab' || eventTarget === activeParent || !isWithinActiveParent) {
        onKeyboardNavigationChange(true);
      }
    };
    const onPointerDown = (event: MouseEvent | TouchEvent) => {
      // Screen readers dispatch synthetic mouse events without buttons or coordinates, those keep the keyboard mode
      if (
        event.type === 'mousedown' &&
        ((event as MouseEvent).buttons === 0 ||
          ((event as MouseEvent).clientX === 0 &&
            (event as MouseEvent).clientY === 0 &&
            (event as MouseEvent).screenX === 0 &&
            (event as MouseEvent).screenY === 0))
      ) {
        return;
      }

      onKeyboardNavigationChange(false);
    };

    targetDocument.addEventListener('keydown', onKeyDown, true);
    targetDocument.addEventListener('mousedown', onPointerDown, true);
    targetDocument.addEventListener('touchstart', onPointerDown, true);

    return () => {
      targetDocument.removeEventListener('keydown', onKeyDown, true);
      targetDocument.removeEventListener('mousedown', onPointerDown, true);
      targetDocument.removeEventListener('touchstart', onPointerDown, true);
    };
  }, [targetDocument, onKeyboardNavigationChange]);

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

      if (shouldShow && focusVisibleRef.current) {
        active.setAttribute(ACTIVEDESCENDANT_FOCUSVISIBLE_ATTRIBUTE, '');
      } else {
        active.removeAttribute(ACTIVEDESCENDANT_FOCUSVISIBLE_ATTRIBUTE);
      }
    },
    [getActiveDescendant],
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

      if (focusVisibleRef.current && shouldShowFocusVisibleAttrRef.current) {
        nextActive.setAttribute(ACTIVEDESCENDANT_FOCUSVISIBLE_ATTRIBUTE, '');
      }

      const event = createActiveDescendantChangeEvent({ id: nextActive.id, previousId: previousActiveId });
      nextActive.dispatchEvent(event);
    },
    [blurActiveDescendant, setAttribute],
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
        if (focusVisibleRef.current === undefined && activeParentRef.current) {
          try {
            focusVisibleRef.current = activeParentRef.current.matches(':focus-visible');
          } catch {
            focusVisibleRef.current = false;
          }
        }

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
