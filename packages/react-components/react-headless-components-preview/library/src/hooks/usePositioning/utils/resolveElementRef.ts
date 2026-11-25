import type { PositioningVirtualElement } from '@fluentui/react-positioning';

/**
 * Narrows a `TargetElement` (HTMLElement or virtual) to an `HTMLElement`. CSS
 * anchor positioning requires a real DOM node to write `anchor-name` onto, so
 * virtual elements are not supported and resolve to `null`.
 */
export function resolveElementRef(
  source: HTMLElement | PositioningVirtualElement | null | undefined,
): HTMLElement | null {
  if (!source) {
    return null;
  }
  return 'nodeType' in source ? (source as HTMLElement) : null;
}
