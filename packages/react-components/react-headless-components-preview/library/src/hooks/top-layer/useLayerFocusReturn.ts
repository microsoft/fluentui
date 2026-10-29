'use client';

import * as React from 'react';
import { useEventCallback } from '@fluentui/react-utilities';
import { getActiveElement, getDeepActiveElement, isDialogElement } from './utils';
import { useElementListeners } from './useElementListeners';
import type { LayerLifecycleCallbacks, UseLayerFocusReturnOptions } from './types';

const FOCUSOUT = ['focusout'];
const NO_EVENTS: string[] = [];

/**
 * Returns focus when a top-layer element closes, where the browser doesn't: `manual` and `hint` popovers, light
 * dismiss, and a `<dialog>` shown as a popover. Spread the result into `useLayerOpenState` or
 * `useDialogLayerOpenState`, which call it before the show and around the hide.
 */
export const useLayerFocusReturn = (
  ref: React.RefObject<HTMLElement | null>,
  options: UseLayerFocusReturnOptions = {},
): Required<LayerLifecycleCallbacks> => {
  const { target, when = 'inside' } = options;
  const previouslyFocused = React.useRef<HTMLElement | null>(null);
  const focusWasInside = React.useRef<boolean | null>(null);

  const onBeforeShow = useEventCallback((element: HTMLElement) => {
    // The focused control itself, even when it is in another shadow root than the element.
    previouslyFocused.current = getDeepActiveElement(element.ownerDocument) as HTMLElement | null;
    focusWasInside.current = null;
  });

  const onBeforeHide = useEventCallback((element: HTMLElement) => {
    focusWasInside.current = element.contains(getActiveElement(element));
  });

  const onHide = useEventCallback((element: HTMLElement) => {
    const wasInside = focusWasInside.current;
    const focusTarget = target?.current ?? previouslyFocused.current;
    focusWasInside.current = null;
    previouslyFocused.current = null;

    if (!when || !focusTarget?.isConnected) {
      return;
    }

    const activeElement = getActiveElement(element);
    if (
      when === 'always' ||
      ((wasInside ?? element.contains(activeElement)) &&
        (!activeElement || activeElement === element.ownerDocument.body || element.contains(activeElement)))
    ) {
      focusTarget.focus();
    }
  });

  const handleFocusOut = useEventCallback((event: Event) => {
    const element = event.currentTarget as HTMLDialogElement;
    focusWasInside.current = element.open ? null : true;
  });

  useElementListeners(ref, handleFocusOut, element =>
    isDialogElement(element) && !element.hasAttribute('popover') ? FOCUSOUT : NO_EVENTS,
  );

  return { onBeforeShow, onBeforeHide, onHide };
};
