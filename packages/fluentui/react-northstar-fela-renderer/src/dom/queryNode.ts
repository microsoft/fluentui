import type { StyleNodeAttributes } from '../types';

export function queryNode(
  { type, media, support, container }: StyleNodeAttributes,
  targetDocument: Document,
): HTMLStyleElement | null {
  const mediaQuery = media ? `[media="${media}"]` : ':not([media])';
  const supportQuery = support ? '[data-fela-support="true"]' : ':not([data-fela-support="true"])';
  const containerQuery = container ? '[data-fela-container="true"]' : ':not([data-fela-container="true"])';

  return targetDocument.querySelector<HTMLStyleElement>(
    `[data-fela-type="${type}"]${supportQuery}${containerQuery}${mediaQuery}`,
  );
}
