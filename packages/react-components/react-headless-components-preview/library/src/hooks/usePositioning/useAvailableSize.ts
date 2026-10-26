'use client';

import { useEventCallback, useIsomorphicLayoutEffect } from '@fluentui/react-utilities';
import type { PositioningProps } from './types';

export const AVAILABLE_HEIGHT_PROPERTY = '--fui-positioning-available-height';
export const AVAILABLE_WIDTH_PROPERTY = '--fui-positioning-available-width';

export const positioningSizeStyles = {
  maxHeight: `var(${AVAILABLE_HEIGHT_PROPERTY}, revert-layer)`,
  maxWidth: `var(${AVAILABLE_WIDTH_PROPERTY}, revert-layer)`,
};

function getAvailableSpace(
  area: string,
  axis: 'block' | 'inline',
  start: number,
  end: number,
  targetStart: number,
  targetEnd: number,
  reverse = false,
): number {
  if (area.startsWith(`${axis}-start`)) {
    return reverse ? end - targetEnd : targetStart - start;
  }
  if (area.startsWith(`${axis}-end`)) {
    return reverse ? targetStart - start : end - targetEnd;
  }
  if (area.includes(`span-${axis}-start`)) {
    return reverse ? end - targetStart : targetEnd - start;
  }
  if (area.includes(`span-${axis}-end`)) {
    return reverse ? targetEnd - start : end - targetStart;
  }
  return end - start;
}

function getBoxSpacing(styles: CSSStyleDeclaration, sides: readonly string[]): [number, number] {
  let margins = 0;
  let insets = 0;
  for (const side of sides) {
    margins += parseFloat(styles.getPropertyValue(`margin-${side}`)) || 0;
    if (styles.boxSizing !== 'border-box') {
      insets +=
        (parseFloat(styles.getPropertyValue(`padding-${side}`)) || 0) +
        (parseFloat(styles.getPropertyValue(`border-${side}-width`)) || 0);
    }
  }
  return [margins, insets];
}

function getMaximumSize(
  available: number[],
  crossAvailable: number[],
  crossSize: number,
  extent: number,
  spacing: number,
): string {
  const fitting = available.filter((_, index) => crossSize <= crossAvailable[index]);
  return `${Math.max(0, Math.min(extent, Math.max(...(fitting.length ? fitting : available))) - spacing)}px`;
}

export function useAvailableSize(
  container: HTMLElement | null,
  target: HTMLElement | null,
  targetDocument: Document | undefined,
  autoSize: PositioningProps['autoSize'],
  areas: readonly string[],
): () => void {
  const bothEnabled = autoSize === true || autoSize === 'always';
  const heightEnabled = bothEnabled || autoSize === 'height' || autoSize === 'height-always';
  const widthEnabled = bothEnabled || autoSize === 'width' || autoSize === 'width-always';
  const enabled = heightEnabled || widthEnabled;
  const update = useEventCallback(() => {
    const win = targetDocument?.defaultView;
    if (!container || !win) {
      return;
    }

    // Invalid custom-property values block inheritance and let consumer CSS remain authoritative when disabled.
    let height = 'initial';
    let width = 'initial';
    if (enabled && target) {
      const viewport = win.visualViewport;
      let top = viewport?.offsetTop ?? 0;
      let bottom = top + (viewport?.height ?? targetDocument.documentElement.clientHeight);
      let left = viewport?.offsetLeft ?? 0;
      let right = left + (viewport?.width ?? targetDocument.documentElement.clientWidth);
      const targetRect = target.getBoundingClientRect();
      const styles = win.getComputedStyle(container);
      const containingBlock = container.offsetParent;
      if (styles.position === 'absolute' && containingBlock instanceof win.HTMLElement) {
        const rect = containingBlock.getBoundingClientRect();
        top = Math.max(top, rect.top + containingBlock.clientTop);
        bottom = Math.min(bottom, rect.top + containingBlock.clientTop + containingBlock.clientHeight);
        left = Math.max(left, rect.left + containingBlock.clientLeft);
        right = Math.min(right, rect.left + containingBlock.clientLeft + containingBlock.clientWidth);
      }
      const [margins, insets] = getBoxSpacing(styles, ['top', 'bottom']);
      const rtl = styles.direction === 'rtl';
      const [inlineMargins, inlineInsets] = getBoxSpacing(styles, ['left', 'right']);
      const surfaceRect = container.getBoundingClientRect();
      const available = areas.map(area =>
        getAvailableSpace(area, 'block', top, bottom, targetRect.top, targetRect.bottom),
      );
      const inlineAvailable = areas.map(area =>
        getAvailableSpace(area, 'inline', left, right, targetRect.left, targetRect.right, rtl),
      );
      // A cap based only on the requested area would shrink the menu before native fallbacks can run.
      if (heightEnabled) {
        height = getMaximumSize(
          available,
          inlineAvailable,
          widthEnabled ? -Infinity : surfaceRect.width + inlineMargins,
          bottom - top,
          margins + insets,
        );
      }
      if (widthEnabled) {
        width = getMaximumSize(
          inlineAvailable,
          available,
          heightEnabled ? -Infinity : surfaceRect.height + margins,
          right - left,
          inlineMargins + inlineInsets,
        );
      }
    }

    const heightChanged = container.style.getPropertyValue(AVAILABLE_HEIGHT_PROPERTY) !== height;
    if (heightChanged) {
      container.style.setProperty(AVAILABLE_HEIGHT_PROPERTY, height);
    }
    if (container.style.getPropertyValue(AVAILABLE_WIDTH_PROPERTY) !== width) {
      container.style.setProperty(AVAILABLE_WIDTH_PROPERTY, width);
    }

    if (heightChanged && heightEnabled) {
      const root = container.getRootNode();
      const active = root instanceof win.ShadowRoot ? root.activeElement : targetDocument.activeElement;
      if (active instanceof win.HTMLElement && active !== container && active.closest('[popover]') === container) {
        const surfaceTop = container.getBoundingClientRect().top + container.clientTop;
        const surfaceBottom = surfaceTop + container.clientHeight;
        const focusedRect = active.getBoundingClientRect();
        if (focusedRect.bottom > surfaceBottom) {
          container.scrollBy({ top: focusedRect.bottom - surfaceBottom, behavior: 'instant' });
        } else if (focusedRect.top < surfaceTop) {
          container.scrollBy({ top: focusedRect.top - surfaceTop, behavior: 'instant' });
        }
      }
    }
  });

  useIsomorphicLayoutEffect(() => {
    update();
  });

  useIsomorphicLayoutEffect(() => {
    const win = targetDocument?.defaultView;
    if (!container || !win) {
      return;
    }

    const observer = win.ResizeObserver ? new win.ResizeObserver(update) : undefined;
    const eventTargets = [win, win.visualViewport];
    const events = ['resize', 'scroll'];
    const listenerOptions = { capture: true, passive: true };
    if (enabled && target) {
      observer?.observe(target);
      observer?.observe(container);
      for (const eventTarget of eventTargets) {
        for (const event of events) {
          eventTarget?.addEventListener(event, update, listenerOptions);
        }
      }
    }

    return () => {
      observer?.disconnect();
      for (const eventTarget of eventTargets) {
        for (const event of events) {
          eventTarget?.removeEventListener(event, update, listenerOptions);
        }
      }
      container.style.removeProperty(AVAILABLE_HEIGHT_PROPERTY);
      container.style.removeProperty(AVAILABLE_WIDTH_PROPERTY);
    };
  }, [container, target, targetDocument, enabled, update]);

  return update;
}
