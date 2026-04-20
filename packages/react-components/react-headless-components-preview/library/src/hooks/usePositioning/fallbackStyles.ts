import type { PositioningShorthandValue } from './types';
import { ALIGNMENTS, POSITIONS } from './constants';
import { FALLBACK_NAME_PREFIX, POSITION_AREA_MAP } from './constants';

/**
 * Tracks documents that already have the `@position-try` fallback stylesheet
 * injected. Keyed by Document so iframes, test renderers, and multiple windows
 * each get their own injection.
 */
const fallbackStylesInjected = new WeakSet<Document>();

/**
 * Injects `@position-try` rules for every (position, align) combination into
 * the given document, once per document. Idempotent — subsequent calls with
 * the same document are no-ops.
 *
 * Each rule mirrors the primary-placement style: `position-area: X`, plus
 * `justify-self/align-self: center` for the center alignment case to match
 * `applyPositionAreaStyles`.
 */
export function ensureFallbackStyles(targetDocument: Document | undefined): void {
  if (!targetDocument || fallbackStylesInjected.has(targetDocument)) {
    return;
  }

  fallbackStylesInjected.add(targetDocument);

  let css = '';

  for (const position of Object.values(POSITIONS)) {
    for (const align of Object.values(ALIGNMENTS)) {
      const suffix = align === ALIGNMENTS.center ? '' : `-${align}`;
      const name = `${FALLBACK_NAME_PREFIX}${position}${suffix}`;
      const area = POSITION_AREA_MAP[position][align];
      const isBlockMain = position === POSITIONS.above || position === POSITIONS.below;
      const selfValue = align === ALIGNMENTS.center ? 'center' : 'initial';
      const justifySelf = isBlockMain ? selfValue : 'initial';
      const alignSelf = isBlockMain ? 'initial' : selfValue;

      const body = `position-area: ${area}; justify-self: ${justifySelf}; align-self: ${alignSelf};`;

      css += `@position-try ${name} {\n  ${body}\n}\n`;
    }
  }

  const style = targetDocument.createElement('style');
  style.setAttribute('data-fluent-positioning-fallbacks', '');
  style.textContent = css;
  targetDocument.head.appendChild(style);
}

/** Maps a shorthand placement ("below", "above-end") to its `@position-try` rule name. */
export function shorthandToFallbackName(shorthand: PositioningShorthandValue): string {
  return `${FALLBACK_NAME_PREFIX}${shorthand}`;
}
