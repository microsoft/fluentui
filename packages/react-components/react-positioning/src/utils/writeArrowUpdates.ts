import { MiddlewareData } from '@floating-ui/dom';

/**
 * Writes all DOM element updates after position is computed
 */
export function writeArrowUpdates(options: { arrow: HTMLElement | null; middlewareData: MiddlewareData }) {
  const { arrow, middlewareData } = options;
  if (!middlewareData.arrow || !arrow) {
    return;
  }

  const { x: arrowX, y: arrowY } = middlewareData.arrow;

  Object.assign(arrow.style, {
    left: `${arrowX}px`,
    top: `${arrowY}px`,
  });
}
