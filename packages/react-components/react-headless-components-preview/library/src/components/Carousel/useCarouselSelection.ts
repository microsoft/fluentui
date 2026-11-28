'use client';

import * as React from 'react';
import { useControllableState, useEventCallback, useIsomorphicLayoutEffect } from '@fluentui/react-utilities';
import { getActiveElement } from '../../hooks/top-layer/utils';
import { focusCarouselPage } from './focusCarouselPage';
import { getOwnCarouselAction } from './carouselControls';
import type { CarouselProps, CarouselIndexChangeData } from './Carousel.types';

const isFiniteAndRunning = (animation: Animation): boolean =>
  animation.playState === 'running' &&
  animation.playbackRate !== 0 &&
  Number.isFinite(animation.effect?.getComputedTiming().endTime);

/** Animations on the page element itself; ones inside the slides (a looping spinner, a hover effect) don't count. */
const getPageAnimations = (page: HTMLElement): Animation[] =>
  typeof page.getAnimations === 'function' ? page.getAnimations() : [];

type SelectionOptions = Pick<CarouselProps, 'activeIndex' | 'defaultActiveIndex' | 'onActiveIndexChange'> & {
  pageCount: number;
  groupSize: number;
  paged: boolean;
  circular: boolean;
  targetDocument: Document | undefined;
  rootRef: React.RefObject<HTMLDivElement | null>;
  documentVisible: boolean;
  viewportRef: React.RefObject<HTMLDivElement | null>;
};

/**
 * Selection never reads geometry or runs a JavaScript animation loop. A page change marks the pages with
 * `data-incoming` and `data-outgoing`, then settles once the finite animations on both page elements finish.
 */
export function useCarouselSelection(options: SelectionOptions): {
  view: {
    paged: boolean;
    index: number;
    outgoing: number | undefined;
    busy: boolean;
    direction: 1 | -1;
    anchor: 'previous' | 'next' | undefined;
  };
  request: (
    index: number,
    reason: CarouselIndexChangeData['reason'],
    event?: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>,
    direction?: 1 | -1,
  ) => void;
  settle: (restoreFocus?: boolean) => void;
} {
  const { pageCount, paged, targetDocument, viewportRef, rootRef, groupSize } = options;
  const [requested, setRequested] = useControllableState({
    state: options.activeIndex,
    defaultState: options.defaultActiveIndex,
    initialState: 0,
  });
  const index = paged ? Math.min(Math.max(0, requested), Math.max(0, pageCount - 1)) : 0;
  const [view, setView] = React.useState({
    paged,
    index,
    outgoing: undefined as number | undefined,
    busy: false,
    direction: 1 as 1 | -1,
    anchor: undefined as 'previous' | 'next' | undefined,
  });
  const pending = React.useRef<{ index: number; direction: 1 | -1 } | undefined>(undefined);
  const recovery = React.useRef<Element | null>(null);
  const skipMotion = React.useRef(false);

  const settle = useEventCallback((restoreFocus = true) => {
    // The animations belong to the page styles: removing `data-outgoing` and hiding the group in one commit ends them.
    const anchor = recovery.current;
    recovery.current = null;
    const viewport = viewportRef.current;
    if (restoreFocus && anchor && viewport) {
      // Root-aware: inside a shadow root the document's active element is only the host.
      const active = getActiveElement(viewport);
      // Hiding the outgoing group can make the browser drop focus before settlement; nothing else took it.
      const dropped =
        (!active || active === viewport.ownerDocument.body) &&
        (!anchor.isConnected || !!anchor.closest('[hidden], [inert]'));
      const page = viewport.children[view.index] as HTMLElement | undefined;
      if (page && (anchor === active || dropped)) {
        focusCarouselPage(page);
      }
    }
    setView(current => (current.busy ? { ...current, busy: false, outgoing: undefined, anchor: undefined } : current));
  });

  useIsomorphicLayoutEffect(() => {
    // Parts register after the first render, so only clamp once the collection is known to be paged.
    if (paged && requested !== index && options.activeIndex === undefined) {
      setRequested(index);
    }
    const viewport = viewportRef.current;
    if (view.paged !== paged) {
      // The DOM still shows the static collection. Move only focus the upcoming hidden/inert update would displace.
      if (paged && viewport) {
        const active = getActiveElement(viewport);
        const selected = viewport.children[index] as HTMLElement | undefined;
        if (selected && active && active !== viewport && viewport.contains(active) && !selected.contains(active)) {
          focusCarouselPage(selected);
        }
      }
      pending.current = undefined;
      recovery.current = null;
      setView({ paged, index, outgoing: undefined, busy: false, direction: 1, anchor: undefined });
      return;
    }
    if (view.index === index) {
      return;
    }
    const active = viewport ? getActiveElement(viewport) : null;
    // Focus in another carousel (or elsewhere on the page) is neither an anchor nor content of this one.
    const focused = active && rootRef.current?.contains(active) ? active : null;
    const oldPage = viewport?.children[view.index];
    const inContent = !!focused && !!oldPage?.contains(focused);
    // Only this carousel's own Previous/Next buttons anchor focus; a nested carousel's are content.
    const action = getOwnCarouselAction(viewportRef, focused);
    const anchor = action === 'previous' || action === 'next' ? action : undefined;
    const boundary =
      !options.circular && ((anchor === 'previous' && index === 0) || (anchor === 'next' && index === pageCount - 1));
    recovery.current = inContent || boundary ? focused : null;
    skipMotion.current = inContent;
    const direction = pending.current?.index === index ? pending.current.direction : index > view.index ? 1 : -1;
    pending.current = undefined;
    setView({
      paged,
      index,
      outgoing: paged && view.index < pageCount ? view.index : undefined,
      direction,
      busy: true,
      anchor,
    });
  }, [
    index,
    requested,
    options.activeIndex,
    options.circular,
    view.paged,
    view.index,
    pageCount,
    paged,
    viewportRef,
    rootRef,
    setRequested,
  ]);

  useIsomorphicLayoutEffect(() => {
    if (!view.busy) {
      return;
    }
    const incoming = viewportRef.current?.children[view.index] as HTMLElement | undefined;
    const outgoing =
      view.outgoing === undefined
        ? undefined
        : (viewportRef.current?.children[view.outgoing] as HTMLElement | undefined);
    let disposed = false;
    if (!incoming || !outgoing || targetDocument?.hidden || skipMotion.current || !paged) {
      settle();
      return;
    }
    // getAnimations() flushes styles, so CSS animations started by this commit's data attributes are listed.
    const finite = [...getPageAnimations(incoming), ...getPageAnimations(outgoing)].filter(isFiniteAndRunning);
    if (!finite.length) {
      settle();
      return;
    }
    const completions = finite.map(animation => {
      // updatePlaybackRate() can leave the old rate visible until a pending play task becomes ready.
      const completion = animation.pending
        ? animation.ready.then(() => (!disposed && isFiniteAndRunning(animation) ? animation.finished : undefined))
        : animation.finished;
      // A canceled animation (its attribute or name removed) counts as done.
      return completion.catch(() => undefined);
    });
    Promise.all(completions).then(() => {
      if (!disposed) {
        settle();
      }
    });
    return () => {
      disposed = true;
    };
  }, [
    view.busy,
    view.index,
    view.outgoing,
    view.direction,
    options.documentVisible,
    targetDocument,
    viewportRef,
    paged,
    groupSize,
    settle,
  ]);

  const request = useEventCallback(
    (
      nextIndex: number,
      reason: CarouselIndexChangeData['reason'],
      event?: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>,
      direction: 1 | -1 = nextIndex > view.index ? 1 : -1,
    ) => {
      if (!paged || !Number.isInteger(nextIndex) || nextIndex < 0 || nextIndex >= pageCount || nextIndex === index) {
        return;
      }
      pending.current = { index: nextIndex, direction };
      setRequested(nextIndex);
      const EventConstructor = targetDocument?.defaultView?.Event;
      const changeEvent = event ?? (EventConstructor && new EventConstructor('autoplay'));
      if (changeEvent) {
        options.onActiveIndexChange?.(changeEvent, { type: 'select', event: changeEvent, index: nextIndex, reason });
      }
    },
  );

  return { view, request, settle };
}
