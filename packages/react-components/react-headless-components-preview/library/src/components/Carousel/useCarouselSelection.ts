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

type SelectionOptions = Pick<
  CarouselProps,
  'activeIndex' | 'defaultActiveIndex' | 'onActiveIndexChange' | 'transition'
> & {
  pageCount: number;
  groupSize: number;
  paged: boolean;
  circular: boolean;
  /** Resolved when a transition starts, not during render. */
  getDir: () => 'ltr' | 'rtl';
  targetDocument: Document | undefined;
  rootRef: React.RefObject<HTMLDivElement | null>;
  reducedMotion: boolean;
  documentVisible: boolean;
  viewportRef: React.RefObject<HTMLDivElement | null>;
};

/** Selection never reads geometry or runs a JavaScript animation loop. */
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
  const { pageCount, paged, getDir, targetDocument, reducedMotion, viewportRef, rootRef, transition, groupSize } =
    options;
  // A latest ref: an inline adapter re-created by a parent re-render must not restart a running transition.
  const transitionRef = React.useRef(transition);
  useIsomorphicLayoutEffect(() => {
    transitionRef.current = transition;
  }, [transition]);
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
  const animations = React.useRef<Animation[]>([]);
  const pending = React.useRef<{ index: number; direction: 1 | -1 } | undefined>(undefined);
  const recovery = React.useRef<Element | null>(null);
  const skipMotion = React.useRef(false);

  const cancel = useEventCallback(() => {
    const current = animations.current;
    animations.current = [];
    current.forEach(animation => animation.cancel());
  });
  const settle = useEventCallback((restoreFocus = true) => {
    cancel();
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
      cancel();
      pending.current = undefined;
      recovery.current = null;
      setView({ paged, index, outgoing: undefined, busy: false, direction: 1, anchor: undefined });
      return;
    }
    if (view.index === index) {
      return;
    }
    cancel();
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
    cancel,
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
    const adapter = transitionRef.current;
    let disposed = false;
    if (!adapter || !incoming || !outgoing || reducedMotion || targetDocument?.hidden || skipMotion.current || !paged) {
      settle();
      return;
    }
    try {
      const handles = adapter({ incoming, outgoing, direction: view.direction, dir: getDir() });
      animations.current = handles;
      const finite = handles.filter(isFiniteAndRunning);
      if (!finite.length) {
        settle();
      } else {
        const completions = finite.map(animation => {
          // updatePlaybackRate() can leave the old rate visible until a pending play task becomes ready.
          const completion = animation.pending
            ? animation.ready.then(() => (!disposed && isFiniteAndRunning(animation) ? animation.finished : undefined))
            : animation.finished;
          return completion.catch(() => undefined);
        });
        Promise.all(completions).then(() => {
          if (!disposed) {
            settle();
          }
        });
      }
    } catch (error) {
      settle();
      throw error;
    }
    return () => {
      disposed = true;
      cancel();
    };
  }, [
    view.busy,
    view.index,
    view.outgoing,
    view.direction,
    getDir,
    reducedMotion,
    options.documentVisible,
    targetDocument,
    viewportRef,
    paged,
    groupSize,
    cancel,
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

  useIsomorphicLayoutEffect(() => cancel, [cancel]);
  return { view, request, settle };
}
