import type { NodeAttributes } from '../types';

export function queryNode({ type, media, support }: NodeAttributes, targetDocument: Document): HTMLStyleElement | null {
  const mediaQuery = media ? `[media="${media}"]` : ':not([media])';
  const supportQuery = support ? '[data-fela-support="true"]' : ':not([data-fela-support="true"])';

  return targetDocument.querySelector<HTMLStyleElement>(`[data-fela-type="${type}"]${supportQuery}${mediaQuery}`);
}
