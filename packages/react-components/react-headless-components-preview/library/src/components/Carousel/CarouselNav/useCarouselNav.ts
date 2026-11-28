'use client';

import * as React from 'react';
import {
  mergeCallbacks,
  slot,
  useEventCallback,
  useIsomorphicLayoutEffect,
  useMergedRefs,
} from '@fluentui/react-utilities';
import type { ExtractSlotProps } from '@fluentui/react-utilities';
import { getActiveElement } from '../../../hooks/top-layer/utils';
import {
  isControlDisabled,
  isControlHidden,
  useCarouselContext,
  useCarouselPartRegistration,
} from '../carouselContext';
import { CarouselNavButton } from '../CarouselNavButton/CarouselNavButton';
import { focusSelectedPage } from '../focusCarouselPage';
import type {
  CarouselNavProps,
  CarouselNavSlots,
  CarouselNavState,
  NavButtonRenderFunction,
} from './CarouselNav.types';

/** Create the state required to render CarouselNav. */
export const useCarouselNav = (props: CarouselNavProps, ref: React.Ref<HTMLDivElement>): CarouselNavState => {
  const { pageCount, activeIndex, viewportRef } = useCarouselContext();
  const { children, ...rest } = props;
  const tabs = React.useRef(new Set<{ index: number; autoFocusTarget?: HTMLButtonElement }>());
  // Undefined until the first registration pass; null once autofocus is consumed or declined.
  const mountFocus = React.useRef<HTMLButtonElement | null | undefined>(undefined);
  const [revision, refresh] = React.useReducer((value: number) => value + 1, 0);
  const [complete, setComplete] = React.useState(false);
  const navRef = React.useRef<HTMLDivElement>(null);
  // The last nav element to hold focus, kept when focus is dropped because it became unavailable.
  const lastFocused = React.useRef<HTMLElement | null>(null);
  // Keeps a nav that is no longer rendered mounted for one commit, so focus inside it can be recovered.
  const [ownsFocus, setOwnsFocus] = React.useState(false);
  const trackFocus = useEventCallback((event: React.FocusEvent<HTMLDivElement>) => {
    lastFocused.current = event.target;
    setOwnsFocus(true);
  });
  const trackBlur = useEventCallback((event: React.FocusEvent<HTMLDivElement>) => {
    const target = event.target;
    const unavailable = !target.isConnected || target.matches(':disabled') || !!target.closest('[hidden], [inert]');
    if (event.relatedTarget || !unavailable) {
      lastFocused.current = null;
      setOwnsFocus(false);
    }
  });
  const registerTab = React.useCallback((index: number, autoFocusTarget?: HTMLButtonElement) => {
    const entry = { index, autoFocusTarget };
    tabs.current.add(entry);
    refresh();
    return () => {
      tabs.current.delete(entry);
      refresh();
    };
  }, []);
  const rendered = pageCount > 1 && !isControlHidden(props) && !isControlDisabled(props);
  const retiring = ownsFocus && !rendered;
  const shown = complete && rendered;
  // Read after child layout effects. A page-count change and its tabs are one commit, not a lost route.
  useIsomorphicLayoutEffect(() => {
    const entries = Array.from(tabs.current);
    const ready = rendered && entries.length === pageCount && new Set(entries.map(tab => tab.index)).size === pageCount;
    if (pageCount > 1 && mountFocus.current === undefined) {
      mountFocus.current = (ready && entries.find(tab => tab.autoFocusTarget)?.autoFocusTarget) || null;
    }
    // Staging hides and disables the whole tablist, so move only focus that it owns, before it is lost.
    const node = navRef.current;
    const active = node && getActiveElement(node);
    const last = lastFocused.current;
    // A focused tab that became disabled or hidden may already have dropped focus to the body.
    const dropped =
      (!active || active === node?.ownerDocument.body) &&
      !!last &&
      (!last.isConnected || last.matches(':disabled') || !!last.closest('[hidden], [inert]'));
    if (complete && !ready && node && (node.contains(active) || dropped)) {
      focusSelectedPage(viewportRef.current, activeIndex);
    } else if (complete && ready && node && dropped) {
      // The focused tab was removed (e.g. its group went away) while the remaining tablist is still complete.
      const remaining = Array.from(node.querySelectorAll<HTMLElement>('[role="tab"]'));
      lastFocused.current = null;
      remaining[Math.min(activeIndex, remaining.length - 1)]?.focus();
    }
    if (!rendered) {
      lastFocused.current = null;
      setOwnsFocus(false);
    }
    setComplete(ready);
  }, [rendered, pageCount, revision, complete, activeIndex, viewportRef]);
  const register = useCarouselPartRegistration('nav', rendered && complete);
  useIsomorphicLayoutEffect(() => register(true), [register]);
  const inertRef = React.useCallback(
    (node: HTMLDivElement | null) => {
      node?.toggleAttribute('inert', !shown);
      if (node && shown && mountFocus.current) {
        const target = mountFocus.current;
        mountFocus.current = null;
        if (
          node.contains(target) &&
          !target.closest('[hidden], [inert], [aria-hidden="true"], [aria-disabled="true"]')
        ) {
          target.focus();
        }
      }
    },
    [shown],
  );
  const rootRef = useMergedRefs(shown ? ref : undefined, inertRef, navRef);
  return {
    components: { root: 'div' },
    root: slot.always<ExtractSlotProps<CarouselNavSlots['root']>>(
      // Keep the templates mounted to detect when they become operable. An incomplete set gets only
      // a hidden staging container: do not apply the public tablist's role, display styles or handlers.
      {
        ...(shown
          ? { 'aria-label': 'Choose a page', ...rest, role: 'tablist' }
          : { hidden: true, 'aria-hidden': true }),
        ref: rootRef,
        onFocus: mergeCallbacks(shown ? rest.onFocus : undefined, trackFocus),
        onBlur: mergeCallbacks(shown ? rest.onBlur : undefined, trackBlur),
      },
      { elementType: 'div' },
    ),
    pageCount,
    rendered: rendered || retiring,
    registerTab,
    renderNavButton:
      typeof children === 'function'
        ? (children as NavButtonRenderFunction)
        : () => (children === undefined ? React.createElement(CarouselNavButton) : children),
  };
};
