import { MiddlewareData } from '@floating-ui/dom';

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
    left: arrowX !== null && arrowX !== undefined ? `${arrowX}px` : '',
    top: arrowY !== null && arrowY !== undefined ? `${arrowY}px` : '',
  });
}
