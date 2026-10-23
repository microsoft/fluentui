import type { MiddlewareData } from '@floating-ui/dom';

/**
 * Writes all DOM element updates after position is computed
 */
export function writeArrowUpdates(options: { arrow: HTMLElement | null; middlewareData: MiddlewareData }): void {
  const { arrow, middlewareData } = options;
  if (!middlewareData.arrow || !arrow) {
    return;
  }

  const { x: arrowX, y: arrowY } = middlewareData.arrow;

  Object.assign(arrow.style, {
    left: typeof arrowX === 'number' ? `${arrowX}px` : '',
    top: typeof arrowY === 'number' ? `${arrowY}px` : '',
  });
}
