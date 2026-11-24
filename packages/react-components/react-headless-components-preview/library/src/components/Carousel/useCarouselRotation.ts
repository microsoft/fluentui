'use client';

import * as React from 'react';
import { useEventCallback, useIsomorphicLayoutEffect } from '@fluentui/react-utilities';

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
    const observer = new Observer(entries => setVisible(entries.some(entry => entry.isIntersecting)));
    observer.observe(rootRef.current);
    return () => observer.disconnect();
  }, [enabled, targetDocument, rootRef]);

  return { visible, documentVisible, reducedMotion };
}

export function useCarouselRotation(
  targetDocument: Document | undefined,
  enabled: boolean,
  interval: number,
  index: number,
  busy: boolean,
  advance: () => boolean,
  environment: Environment,
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
  const stop = useEventCallback(() => setPlaying(false));
  useIsomorphicLayoutEffect(() => {
    if (!enabled || reducedMotion) {
      stop();
    }
  }, [enabled, reducedMotion, stop]);
  React.useEffect(() => {
    const win = targetDocument?.defaultView;
    if (!win || !enabled || !playing || busy || hovered || !visible || !documentVisible || reducedMotion) {
      return;
    }
    const timer = win.setTimeout(() => {
      if (!advance()) {
        stop();
      }
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
    advance,
    targetDocument,
    stop,
  ]);

  return {
    playing: enabled && playing && !reducedMotion,
    stop,
    play: useEventCallback(() => {
      if (enabled && !reducedMotion) {
        setPlaying(true);
      }
    }),
    onPointerOver: useEventCallback((event: React.PointerEvent<HTMLDivElement>) => {
      const target = event.target as HTMLElement;
      setHovered(!target.closest('[data-carousel-action="autoplay"]'));
    }),
    onPointerLeave: useEventCallback(() => setHovered(false)),
    interrupt: useEventCallback((event: React.SyntheticEvent<HTMLDivElement>) => {
      const target = event.target as HTMLElement;
      if (!target.closest('[data-carousel-action="autoplay"]')) {
        stop();
      }
    }),
  };
}
