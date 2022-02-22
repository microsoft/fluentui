import { arrow as middleware } from '@floating-ui/dom';

export interface ArrowMiddlewareOptions {
  arrowElement: HTMLElement;
  arrowPadding?: number;
}

export function arrow(options: ArrowMiddlewareOptions) {
  const { arrowElement, arrowPadding } = options;

  return middleware({ element: arrowElement, padding: arrowPadding });
}
