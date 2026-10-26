'use client';

import type * as React from 'react';
import { useEventCallback, useIsomorphicLayoutEffect } from '@fluentui/react-utilities';
import { isEscapeForLayer } from './utils';
import type { UseLayerEscapeOptions } from './types';

/**
 * Whether the browser leaves Escape to the page. A `popover="hint"` reads back as `manual` where `hint` is unsupported.
 */
const needsEscapeHandling = (element: HTMLElement): boolean =>
  (element as HTMLElement & { popover?: string | null }).popover === 'manual';

/**
 * Closes a top-layer element on Escape where the browser doesn't, or reports every Escape with `when: 'always'`.
 * Handled Escapes are prevented and stopped after `onEscape`, so outer layers and the browser leave them alone.
 */
export const useLayerEscape = (
  ref: React.RefObject<HTMLElement | null>,
  options: UseLayerEscapeOptions,
): { onKeyDown: (event: React.KeyboardEvent) => void } => {
  const { open, onEscape, when = 'manual', listen = 'layer' } = options;

  const isEscapeToHandle = (event: KeyboardEvent | React.KeyboardEvent, element: HTMLElement | null) =>
    event.key === 'Escape' &&
    !event.defaultPrevented &&
    open &&
    !!element &&
    (when === 'always' || needsEscapeHandling(element));

  const onKeyDown = useEventCallback((event: React.KeyboardEvent) => {
    const element = ref.current;
    if (
      listen !== 'layer' ||
      !isEscapeToHandle(event, element) ||
      !isEscapeForLayer(element!, event.target as Element)
    ) {
      return;
    }
    // Reported first: a consumer can veto by preventing the event.
    onEscape(event);
    event.preventDefault();
    event.stopPropagation();
  });

  const onDocumentKeyDown = useEventCallback((event: KeyboardEvent) => {
    if (!isEscapeToHandle(event, ref.current)) {
      return;
    }
    onEscape(event);
    event.preventDefault();
    event.stopPropagation();
  });

  useIsomorphicLayoutEffect(() => {
    const targetDocument = ref.current?.ownerDocument;
    if (!open || listen !== 'document' || !targetDocument) {
      return;
    }
    targetDocument.addEventListener('keydown', onDocumentKeyDown, { capture: true });
    return () => targetDocument.removeEventListener('keydown', onDocumentKeyDown, { capture: true });
  }, [open, listen, onDocumentKeyDown, ref]);

  return { onKeyDown };
};
