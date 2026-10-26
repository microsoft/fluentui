'use client';

import { useEventCallback, useIsomorphicLayoutEffect } from '@fluentui/react-utilities';
import type { PositioningProps } from './types';

export const AVAILABLE_HEIGHT_PROPERTY = '--fui-positioning-available-height';
export const AVAILABLE_WIDTH_PROPERTY = '--fui-positioning-available-width';

export const positioningSizeStyles = {
  maxHeight: `var(${AVAILABLE_HEIGHT_PROPERTY}, revert-layer)`,
  maxWidth: `var(${AVAILABLE_WIDTH_PROPERTY}, revert-layer)`,
};

export function useAvailableSize(
  container: HTMLElement | null,
  target: HTMLElement | null,
  targetDocument: Document | undefined,
  autoSize: PositioningProps['autoSize'],
  areas: readonly string[],
): () => void {
  const heightEnabled =
    autoSize === true || autoSize === 'always' || autoSize === 'height' || autoSize === 'height-always';
  const widthEnabled =
    autoSize === true || autoSize === 'always' || autoSize === 'width' || autoSize === 'width-always';
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
      const margins = (parseFloat(styles.marginTop) || 0) + (parseFloat(styles.marginBottom) || 0);
      const insets =
        styles.boxSizing === 'border-box'
          ? 0
          : (parseFloat(styles.paddingTop) || 0) +
            (parseFloat(styles.paddingBottom) || 0) +
            (parseFloat(styles.borderTopWidth) || 0) +
            (parseFloat(styles.borderBottomWidth) || 0);
      const rtl = styles.direction === 'rtl';
      const inlineMargins = (parseFloat(styles.marginLeft) || 0) + (parseFloat(styles.marginRight) || 0);
      const inlineInsets =
        styles.boxSizing === 'border-box'
          ? 0
          : (parseFloat(styles.paddingLeft) || 0) +
            (parseFloat(styles.paddingRight) || 0) +
            (parseFloat(styles.borderLeftWidth) || 0) +
            (parseFloat(styles.borderRightWidth) || 0);
      const inlineAvailable = areas.map(area => {
        if (area.startsWith('inline-start')) {
          return rtl ? right - targetRect.right : targetRect.left - left;
        }
        if (area.startsWith('inline-end')) {
          return rtl ? targetRect.left - left : right - targetRect.right;
        }
        if (area.includes('span-inline-start')) {
          return rtl ? right - targetRect.left : targetRect.right - left;
        }
        if (area.includes('span-inline-end')) {
          return rtl ? targetRect.right - left : right - targetRect.left;
        }
        return right - left;
      });
      const available = areas.map(area => {
        if (area.startsWith('block-start')) {
          return targetRect.top - top;
        }
        if (area.startsWith('block-end')) {
          return bottom - targetRect.bottom;
        }
        if (area.includes('span-block-start')) {
          return targetRect.bottom - top;
        }
        if (area.includes('span-block-end')) {
          return bottom - targetRect.top;
        }
        return bottom - top;
      });
      // A cap based only on the requested area would shrink the menu before native fallbacks can run.
      if (heightEnabled) {
        const surfaceWidth = container.getBoundingClientRect().width;
        const fittingAreas = widthEnabled
          ? available
          : available.filter((_, index) => surfaceWidth + inlineMargins <= inlineAvailable[index]);
        const candidates = fittingAreas.length ? fittingAreas : available;
        height = `${Math.max(0, Math.min(bottom - top, Math.max(...candidates)) - margins - insets)}px`;
      }
      if (widthEnabled) {
        const surfaceHeight = container.getBoundingClientRect().height;
        const fittingAreas = heightEnabled
          ? inlineAvailable
          : inlineAvailable.filter((_, index) => surfaceHeight + margins <= available[index]);
        const candidates = fittingAreas.length ? fittingAreas : inlineAvailable;
        width = `${Math.max(0, Math.min(right - left, Math.max(...candidates)) - inlineMargins - inlineInsets)}px`;
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
    if (enabled && target) {
      observer?.observe(target);
      observer?.observe(container);
      win.addEventListener('resize', update);
      win.addEventListener('scroll', update, { capture: true, passive: true });
      win.visualViewport?.addEventListener('resize', update);
      win.visualViewport?.addEventListener('scroll', update);
    }

    return () => {
      observer?.disconnect();
      win.removeEventListener('resize', update);
      win.removeEventListener('scroll', update, { capture: true });
      win.visualViewport?.removeEventListener('resize', update);
      win.visualViewport?.removeEventListener('scroll', update);
      container.style.removeProperty(AVAILABLE_HEIGHT_PROPERTY);
      container.style.removeProperty(AVAILABLE_WIDTH_PROPERTY);
    };
  }, [container, target, targetDocument, enabled, update]);

  return update;
}
