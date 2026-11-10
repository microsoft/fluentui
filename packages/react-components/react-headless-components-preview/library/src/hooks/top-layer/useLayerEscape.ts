'use client';

import type * as React from 'react';
import { Escape } from '@fluentui/keyboard-keys';
import { useFluent_unstable as useFluent } from '@fluentui/react-shared-contexts';
import { useEventCallback, useIsomorphicLayoutEffect } from '@fluentui/react-utilities';
import { isEscapeForLayer, isInTopLayer } from './utils';
import type { UseLayerEscapeOptions } from './types';

/**
 * Whether the browser leaves Escape to the page. A `popover="hint"` reads back as `manual` where `hint` is unsupported.
 */
const needsEscapeHandling = (element: HTMLElement): boolean =>
  (element as HTMLElement & { popover?: string | null }).popover === 'manual';

type DocumentLayer = { ref: React.RefObject<HTMLElement | null>; onKeyDown: (event: KeyboardEvent) => void };

// Open `listen: 'document'` layers per document, oldest first; only the newest shown one handles Escape.
const documentLayers = new WeakMap<Document, DocumentLayer[]>();

// A browser close leaves a controlled `open` true while the element is hidden.
const isShown = ({ ref }: DocumentLayer): boolean => !!ref.current && isInTopLayer(ref.current);

const getDocumentLayers = (targetDocument: Document): DocumentLayer[] => {
  let layers = documentLayers.get(targetDocument);
  if (!layers) {
    layers = [];
    documentLayers.set(targetDocument, layers);
  }
  return layers;
};

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

  const handleEscape = (event: KeyboardEvent | React.KeyboardEvent, isForLayer: (element: HTMLElement) => boolean) => {
    const element = ref.current;
    if (
      event.key !== Escape ||
      event.defaultPrevented ||
      !open ||
      !element ||
      (when !== 'always' && !needsEscapeHandling(element)) ||
      !isForLayer(element)
    ) {
      return;
    }
    // Before `preventDefault()`, so `onEscape` can detect a veto.
    onEscape(event);
    event.preventDefault();
    event.stopPropagation();
  };

  const onKeyDown = useEventCallback((event: React.KeyboardEvent) => {
    if (listen === 'layer') {
      handleEscape(event, element => isEscapeForLayer(element, event.nativeEvent));
    }
  });

  const onDocumentKeyDown = useEventCallback((event: KeyboardEvent) => {
    const layers = getDocumentLayers(event.currentTarget as Document);
    handleEscape(event, () => layers.filter(isShown).pop()?.onKeyDown === onDocumentKeyDown);
  });

  // Independent of the element, so one mounted after opening is covered.
  useIsomorphicLayoutEffect(() => {
    if (!open || listen !== 'document' || !targetDocument) {
      return;
    }
    const layers = getDocumentLayers(targetDocument);
    const layer = { ref, onKeyDown: onDocumentKeyDown };
    layers.push(layer);
    targetDocument.addEventListener('keydown', onDocumentKeyDown, { capture: true });
    return () => {
      layers.splice(layers.indexOf(layer), 1);
      targetDocument.removeEventListener('keydown', onDocumentKeyDown, { capture: true });
    };
  }, [ref, open, listen, onDocumentKeyDown, targetDocument]);

  return { onKeyDown };
};
