'use client';

import * as React from 'react';
import { useEventCallback } from '@fluentui/react-utilities';
import { getActiveElement, isDialogElement } from '../../utils/topLayer';
import type { UseTopLayerOptions } from './useTopLayer.types';

type TrackOptions = { keepExisting?: boolean };

export type TopLayerFocus = {
  rememberPrevious: (element: HTMLElement, options?: TrackOptions) => void;
  trackFocusOnClose: (element: HTMLElement, options?: TrackOptions) => void;
  resetCloseTracking: () => void;
  getLastFocusedInside: () => HTMLElement | null;
  focusOnShow: (initialTarget: HTMLElement | null | false) => void;
  keepFocusAfterSwitch: (element: HTMLElement, keepFocus: HTMLElement | null) => void;
  restoreFocus: (element: HTMLElement) => void;
  handleFocusIn: (event: Event) => void;
  handleDialogFocusOut: (event: Event) => void;
};

/**
 * Focus state of a top-layer element: the element to return focus to, the last focused element inside, and whether
 * focus was inside when it closed.
 */
export const useTopLayerFocus = (returnFocus: NonNullable<UseTopLayerOptions['returnFocus']>): TopLayerFocus => {
  const previouslyFocusedElement = React.useRef<HTMLElement | null>(null);
  const lastFocusedInside = React.useRef<HTMLElement | null>(null);
  const focusWasInside = React.useRef<boolean | null>(null);

  /**
   * Remembers the focused element as the one to return focus to. With `keepExisting`, only when none is remembered.
   */
  const rememberPrevious = (element: HTMLElement, { keepExisting = false }: TrackOptions = {}) => {
    if (!keepExisting || !previouslyFocusedElement.current) {
      previouslyFocusedElement.current = getActiveElement(element) as HTMLElement | null;
    }
  };

  /**
   * Records whether focus is inside the element as it closes. With `keepExisting`, only when not recorded yet.
   */
  const trackFocusOnClose = (element: HTMLElement, { keepExisting = false }: TrackOptions = {}) => {
    if (!keepExisting || focusWasInside.current === null) {
      focusWasInside.current = element.contains(getActiveElement(element));
    }
  };

  const resetCloseTracking = () => {
    focusWasInside.current = null;
  };

  const getLastFocusedInside = () => lastFocusedInside.current;

  /**
   * Moves focus after a fresh show: to `initialTarget`, or back to the previous element when it is `false`.
   */
  const focusOnShow = (initialTarget: HTMLElement | null | false) => {
    const previous = previouslyFocusedElement.current;
    if (initialTarget) {
      initialTarget.focus();
    } else if (initialTarget === false && previous?.isConnected) {
      previous.focus({ preventScroll: true });
    }
  };

  /**
   * Showing again after a mode or `popover` change: keeps focus on the control that had it.
   */
  const keepFocusAfterSwitch = (element: HTMLElement, keepFocus: HTMLElement | null) => {
    if (keepFocus?.isConnected && element.contains(keepFocus)) {
      keepFocus.focus({ preventScroll: true });
    }
  };

  /**
   * Returns focus after the element closed, following `returnFocus`, and clears the focus state.
   */
  const restoreFocus = useEventCallback((element: HTMLElement) => {
    const wasInside = focusWasInside.current;
    const previous = previouslyFocusedElement.current;
    focusWasInside.current = null;
    previouslyFocusedElement.current = null;
    lastFocusedInside.current = null;

    if (!returnFocus) {
      return;
    }

    const target = (typeof returnFocus === 'object' ? returnFocus.current : null) ?? previous;
    if (!target?.isConnected) {
      return;
    }

    if (returnFocus === 'always') {
      target.focus();
      return;
    }

    const activeElement = getActiveElement(element);
    if (
      wasInside &&
      (!activeElement || activeElement === element.ownerDocument.body || element.contains(activeElement))
    ) {
      target.focus({ preventScroll: true });
    }
  });

  const handleFocusIn = useEventCallback((event: Event) => {
    lastFocusedInside.current = event.target as HTMLElement;
  });

  const handleDialogFocusOut = useEventCallback((event: Event) => {
    const element = event.currentTarget as HTMLElement;
    if (isDialogElement(element)) {
      focusWasInside.current = element.open ? null : true;
    }
  });

  return {
    rememberPrevious,
    trackFocusOnClose,
    resetCloseTracking,
    getLastFocusedInside,
    focusOnShow,
    keepFocusAfterSwitch,
    restoreFocus,
    handleFocusIn,
    handleDialogFocusOut,
  };
};
