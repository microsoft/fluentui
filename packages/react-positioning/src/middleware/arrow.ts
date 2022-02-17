import { arrow as middleware } from '@floating-ui/dom';

export interface ArrowMiddlewareOptions {
  arrowElement: HTMLElement | null;
  arrowPadding?: number;
}

export function arrow(options: ArrowMiddlewareOptions) {
  const { arrowElement, arrowPadding } = options;
  if (!arrowElement) {
    return { fn: () => ({}) };
  }

  return middleware({ element: arrowElement, padding: arrowPadding });
}
