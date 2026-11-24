'use client';

import * as React from 'react';
import { useControllableState, useEventCallback, useIsomorphicLayoutEffect } from '@fluentui/react-utilities';
import type { CarouselProps, CarouselIndexChangeData } from './Carousel.types';

type SelectionOptions = Pick<
  CarouselProps,
  'activeIndex' | 'defaultActiveIndex' | 'onActiveIndexChange' | 'transition'
> & {
  pageCount: number;
  groupSize: number;
  paged: boolean;
  circular: boolean;
  dir: 'ltr' | 'rtl';
  targetDocument: Document | undefined;
  reducedMotion: boolean;
  documentVisible: boolean;
  viewportRef: React.RefObject<HTMLDivElement | null>;
};

/** Selection never reads geometry or runs a JavaScript animation loop. */
export function useCarouselSelection(options: SelectionOptions): {
  view: {
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
  const { pageCount, paged, dir, targetDocument, reducedMotion, viewportRef, transition, groupSize } = options;
  const [requested, setRequested] = useControllableState({
    state: options.activeIndex,
    defaultState: options.defaultActiveIndex,
    initialState: 0,
  });
  const index = paged ? Math.min(Math.max(0, requested), Math.max(0, pageCount - 1)) : 0;
  const [view, setView] = React.useState({
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
  const pagedRef = React.useRef(paged);

  const cancel = useEventCallback(() => {
    const current = animations.current;
    animations.current = [];
    current.forEach(animation => animation.cancel());
  });
  const settle = useEventCallback((restoreFocus = true) => {
    cancel();
    const anchor = recovery.current;
    recovery.current = null;
    if (restoreFocus && anchor && anchor === targetDocument?.activeElement) {
      const page = viewportRef.current?.children[view.index];
      page?.querySelector<HTMLElement>('[aria-roledescription="slide"]')?.focus({ preventScroll: true });
    }
    setView(current => (current.busy ? { ...current, busy: false, outgoing: undefined, anchor: undefined } : current));
  });

  useIsomorphicLayoutEffect(() => {
    const wasPaged = pagedRef.current;
    pagedRef.current = paged;
    // Parts register after the first render, so only clamp once the collection is known to be paged.
    if (paged && requested !== index && options.activeIndex === undefined) {
      setRequested(index);
    }
    if (view.index === index) {
      return;
    }
    cancel();
    if (!wasPaged || !paged) {
      // Entering or leaving paged mode is a layout change, not navigation: swap without motion.
      setView({ index, outgoing: undefined, busy: false, direction: 1, anchor: undefined });
      return;
    }
    const focused = targetDocument?.activeElement ?? null;
    const oldPage = viewportRef.current?.children[view.index];
    const inContent = !!focused && !!oldPage?.contains(focused);
    const anchor = focused?.getAttribute('data-carousel-action');
    const boundary =
      !options.circular && ((anchor === 'previous' && index === 0) || (anchor === 'next' && index === pageCount - 1));
    recovery.current = inContent || boundary ? focused : null;
    skipMotion.current = inContent;
    const direction = pending.current?.index === index ? pending.current.direction : index > view.index ? 1 : -1;
    pending.current = undefined;
    setView({
      index,
      outgoing: paged && view.index < pageCount ? view.index : undefined,
      direction,
      busy: true,
      anchor: anchor === 'previous' || anchor === 'next' ? anchor : undefined,
    });
  }, [
    index,
    requested,
    options.activeIndex,
    options.circular,
    view.index,
    pageCount,
    paged,
    targetDocument,
    viewportRef,
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
    let disposed = false;
    if (
      !transition ||
      !incoming ||
      !outgoing ||
      reducedMotion ||
      targetDocument?.hidden ||
      skipMotion.current ||
      !paged
    ) {
      settle();
      return;
    }
    try {
      const running = transition({ incoming, outgoing, direction: view.direction, dir });
      animations.current = running;
      if (!running.length) {
        settle();
      } else {
        Promise.all(running.map(animation => animation.finished.catch(() => undefined))).then(() => {
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
    transition,
    dir,
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
      if (nextIndex < 0 || nextIndex >= pageCount || nextIndex === index) {
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
