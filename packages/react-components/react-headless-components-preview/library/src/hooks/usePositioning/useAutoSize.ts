'use client';

import * as React from 'react';
import { useEventCallback, useIsomorphicLayoutEffect } from '@fluentui/react-utilities';
import { computeAvailableSize, getBoundarySize } from './utils';
import type { NormalizedAutoSize } from '@fluentui/react-positioning';
import type { AvailableSizeOptions } from './utils';

const MAX_BLOCK_SIZE = 'max-block-size';
const MAX_INLINE_SIZE = 'max-inline-size';
const OVERFLOW_BLOCK = 'overflow-block';
const OVERFLOW_INLINE = 'overflow-inline';

interface OverflowOwnership {
  block: boolean;
  inline: boolean;
}

export interface UseAutoSizeOptions extends AvailableSizeOptions {
  containerEl: HTMLElement | null;
  targetEl: HTMLElement | null;
  targetDocument: Document | undefined;
  autoSize: NormalizedAutoSize | false;
}

function supportsAnchorPositioning(targetDocument: Document | undefined): boolean {
  return Boolean(targetDocument?.defaultView?.CSS?.supports?.('anchor-name', '--x'));
}

function setIfChanged(element: HTMLElement, property: string, value: string): void {
  if (element.style.getPropertyValue(property) !== value) {
    element.style.setProperty(property, value);
  }
}

/**
 * Applies (or removes) the constraint for one axis.
 *
 * Overflow is only written when the consumer has not already set it inline, and only removed again
 * when this hook was the one that wrote it — a consumer's own value must survive teardown.
 */
function applyAxis(
  element: HTMLElement,
  enabled: boolean,
  size: number,
  maxProperty: string,
  overflowProperty: string,
  owned: boolean,
): boolean {
  if (!enabled || size <= 0) {
    element.style.removeProperty(maxProperty);

    if (owned) {
      element.style.removeProperty(overflowProperty);
    }

    return false;
  }

  setIfChanged(element, maxProperty, `${size}px`);

  if (!owned && !element.style.getPropertyValue(overflowProperty)) {
    element.style.setProperty(overflowProperty, 'auto');
    return true;
  }

  return owned;
}

export function useAutoSize(options: UseAutoSizeOptions): () => void {
  const { containerEl, targetEl, targetDocument, autoSize, ...sizeOptions } = options;
  const { position, offset, pinned, coverTarget } = sizeOptions;

  const ownershipRef = React.useRef<OverflowOwnership>({ block: false, inline: false });

  const apply = useEventCallback(() => {
    if (!containerEl) {
      return;
    }

    const boundary = getBoundarySize(targetDocument);

    const enabled = [autoSize, targetEl, boundary].every(Boolean) && supportsAnchorPositioning(targetDocument);

    const available =
      enabled && targetEl && boundary
        ? computeAvailableSize(targetEl.getBoundingClientRect(), boundary, sizeOptions)
        : { blockSize: 0, inlineSize: 0 };

    const ownership = ownershipRef.current;

    ownership.block = applyAxis(
      containerEl,
      enabled && autoSize !== false && autoSize.applyMaxHeight,
      available.blockSize,
      MAX_BLOCK_SIZE,
      OVERFLOW_BLOCK,
      ownership.block,
    );

    ownership.inline = applyAxis(
      containerEl,
      enabled && autoSize !== false && autoSize.applyMaxWidth,
      available.inlineSize,
      MAX_INLINE_SIZE,
      OVERFLOW_INLINE,
      ownership.inline,
    );
  });

  useIsomorphicLayoutEffect(() => {
    const ownership = ownershipRef.current;

    apply();

    return () => {
      if (!containerEl) {
        return;
      }

      containerEl.style.removeProperty(MAX_BLOCK_SIZE);
      containerEl.style.removeProperty(MAX_INLINE_SIZE);

      if (ownership.block) {
        containerEl.style.removeProperty(OVERFLOW_BLOCK);
      }

      if (ownership.inline) {
        containerEl.style.removeProperty(OVERFLOW_INLINE);
      }

      ownership.block = false;
      ownership.inline = false;
    };
  }, [
    apply,
    containerEl,
    targetEl,
    targetDocument,
    autoSize,
    position,
    offset.mainAxis,
    offset.crossAxis,
    pinned,
    coverTarget,
  ]);

  return apply;
}
