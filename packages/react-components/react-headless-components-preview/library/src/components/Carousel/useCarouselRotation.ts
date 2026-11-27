'use client';

import * as React from 'react';
import { useEventCallback, useIsomorphicLayoutEffect } from '@fluentui/react-utilities';
import { getOwnCarouselAction } from './carouselControls';

type Environment = { visible: boolean; documentVisible: boolean; reducedMotion: boolean };

export function useCarouselEnvironment(
  targetDocument: Document | undefined,
  rootRef: React.RefObject<HTMLDivElement | null>,
  enabled: boolean,
): Environment {
  const [visible, setVisible] = React.useState(false);
  const [documentVisible, setDocumentVisible] = React.useState(true);
  const [reducedMotion, setReducedMotion] = React.useState(false);

  useIsomorphicLayoutEffect(() => {
    const media = targetDocument?.defaultView?.matchMedia?.('(prefers-reduced-motion: reduce)');
    const updateMotion = () => {
      setReducedMotion(!!media?.matches);
    };
    const updateVisibility = () => {
      setDocumentVisible(!targetDocument?.hidden);
    };
    updateMotion();
    updateVisibility();
    media?.addEventListener('change', updateMotion);
    targetDocument?.addEventListener('visibilitychange', updateVisibility);
    return () => {
      media?.removeEventListener('change', updateMotion);
      targetDocument?.removeEventListener('visibilitychange', updateVisibility);
    };
  }, [targetDocument]);

  React.useEffect(() => {
    if (!enabled) {
      return;
    }
    const Observer = targetDocument?.defaultView?.IntersectionObserver;
    if (!Observer || !rootRef.current) {
      setVisible(true);
      return;
    }
    setVisible(false);
    const root = rootRef.current;
    const observer = new Observer(entries => {
      for (let i = entries.length - 1; i >= 0; --i) {
        if (entries[i].target === root) {
          setVisible(entries[i].isIntersecting);
          break;
        }
      }
    });
    observer.observe(root);
    return () => observer.disconnect();
  }, [enabled, targetDocument, rootRef]);

  return { visible, documentVisible, reducedMotion };
}

const isOwnPlayback = (owner: object, target: EventTarget): boolean =>
  getOwnCarouselAction(owner, target as Node) === 'autoplay';

export function useCarouselRotation(
  targetDocument: Document | undefined,
  enabled: boolean,
  interval: number,
  index: number,
  busy: boolean,
  /** The selection is the last group of a non-circular collection. */
  atEnd: boolean,
  advance: () => void,
  environment: Environment,
  /** Identifies this carousel's own playback control (see `useCarouselControlRef`); a nested carousel's is content. */
  owner: object,
): {
  playing: boolean;
  stop: () => void;
  play: () => void;
  onPointerOver: React.PointerEventHandler<HTMLDivElement>;
  onPointerLeave: () => void;
  interrupt: (event: React.SyntheticEvent<HTMLDivElement>) => void;
} {
  const { visible, documentVisible, reducedMotion } = environment;
  const [playing, setPlaying] = React.useState(false);
  const [hovered, setHovered] = React.useState(false);
  // Counts fired timers so the next one is armed even when a controlled owner declines the request.
  const [tick, setTick] = React.useState(0);
  const stop = useEventCallback(() => setPlaying(false));
  useIsomorphicLayoutEffect(() => {
    if (!enabled || reducedMotion) {
      stop();
    }
  }, [enabled, reducedMotion, stop]);
  // Stop when the selection arrives at the last group (not when it is merely requested, which an owner may decline).
  // Leaving it, as Play does by restarting from the first group, never stops playback.
  const wasAtEnd = React.useRef(atEnd);
  useIsomorphicLayoutEffect(() => {
    if (atEnd && !wasAtEnd.current) {
      stop();
    }
    wasAtEnd.current = atEnd;
  }, [atEnd, stop]);
  React.useEffect(() => {
    const win = targetDocument?.defaultView;
    if (!win || !enabled || !playing || busy || hovered || !visible || !documentVisible || reducedMotion) {
      return;
    }
    const timer = win.setTimeout(() => {
      advance();
      setTick(current => current + 1);
    }, interval);
    return () => win.clearTimeout(timer);
  }, [
    enabled,
    playing,
    busy,
    hovered,
    visible,
    documentVisible,
    reducedMotion,
    interval,
    index,
    tick,
    advance,
    targetDocument,
  ]);

  return {
    playing: enabled && playing && !reducedMotion,
    stop,
    play: useEventCallback(() => {
      if (enabled && !reducedMotion) {
        setPlaying(true);
      }
    }),
    // Pointing at the playback control neither starts nor ends a suspension: rotation started there runs,
    // but moving from a slide onto Pause keeps it suspended until the pointer leaves the carousel.
    // A nested carousel's playback control is content of this one.
    onPointerOver: useEventCallback((event: React.PointerEvent<HTMLDivElement>) => {
      if (!isOwnPlayback(owner, event.target)) {
        setHovered(true);
      }
    }),
    onPointerLeave: useEventCallback(() => setHovered(false)),
    interrupt: useEventCallback((event: React.SyntheticEvent<HTMLDivElement>) => {
      if (!isOwnPlayback(owner, event.target)) {
        stop();
      }
    }),
  };
}
