'use client';

import * as React from 'react';
import { useFluent_unstable as useFluent } from '@fluentui/react-shared-contexts';
import { useEventCallback, useIsomorphicLayoutEffect } from '@fluentui/react-utilities';
import { isEscapeForLayer } from './utils';
import type { UseLayerEscapeOptions } from './types';

/**
 * Whether the browser leaves Escape to the page. A `popover="hint"` reads back as `manual` where `hint` is unsupported.
 */
const needsEscapeHandling = (element: HTMLElement): boolean =>
  (element as HTMLElement & { popover?: string | null }).popover === 'manual';

/**
 * Open layers with `listen: 'document'`, oldest first. Only the newest handles Escape, as the browser closes the topmost
 * layer first.
 */
const documentLayers: object[] = [];

/**
 * Closes a top-layer element on Escape where the browser doesn't, or reports every Escape with `when: 'always'`.
 * Handled Escapes are prevented and stopped after `onEscape`, so outer layers and the browser leave them alone.
 */
export const useLayerEscape = (
  ref: React.RefObject<HTMLElement | null>,
  options: UseLayerEscapeOptions,
): { onKeyDown: (event: React.KeyboardEvent) => void } => {
  const { open, onEscape, when = 'manual', listen = 'layer' } = options;
  const { targetDocument } = useFluent();
  const documentLayerRef = React.useRef<object>({});

  const isEscapeToHandle = (event: KeyboardEvent | React.KeyboardEvent, element: HTMLElement | null) =>
    event.key === 'Escape' &&
    !event.defaultPrevented &&
    open &&
    !!element &&
    (when === 'always' || needsEscapeHandling(element));

  const onKeyDown = useEventCallback((event: React.KeyboardEvent) => {
    const element = ref.current;
    if (listen !== 'layer' || !isEscapeToHandle(event, element) || !isEscapeForLayer(element!, event.nativeEvent)) {
      return;
    }
    // Reported first: a consumer can veto by preventing the event.
    onEscape(event);
    event.preventDefault();
    event.stopPropagation();
  });

  const onDocumentKeyDown = useEventCallback((event: KeyboardEvent) => {
    const isNewest = documentLayers[documentLayers.length - 1] === documentLayerRef.current;
    if (!isNewest || !isEscapeToHandle(event, ref.current)) {
      return;
    }
    onEscape(event);
    event.preventDefault();
    event.stopPropagation();
  });

  // Doesn't need the element yet, so an element that mounts after `open` turned true is covered.
  useIsomorphicLayoutEffect(() => {
    if (!open || listen !== 'document' || !targetDocument) {
      return;
    }
    const layer = documentLayerRef.current;
    documentLayers.push(layer);
    targetDocument.addEventListener('keydown', onDocumentKeyDown, { capture: true });
    return () => {
      documentLayers.splice(documentLayers.indexOf(layer), 1);
      targetDocument.removeEventListener('keydown', onDocumentKeyDown, { capture: true });
    };
  }, [open, listen, onDocumentKeyDown, targetDocument]);

  return { onKeyDown };
};
