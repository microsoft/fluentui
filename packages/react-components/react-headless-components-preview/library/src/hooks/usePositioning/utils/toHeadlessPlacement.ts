import type { PositioningShorthandValue } from '@fluentui/react-positioning';

/**
 * Floating UI reports placement in physical terms (`top-start`, `right-end`), while headless
 * components and every consumer stylesheet keyed on `data-placement` use the logical vocabulary
 * (`above-start`, `after-bottom`).
 *
 * Without this mapping an injected engine silently breaks placement-keyed styling — most visibly
 * arrows, which are positioned entirely by consumer CSS selecting on `data-placement`.
 *
 * Note the alignment suffix is not a straight copy: for the block positions the physical
 * `start`/`end` match the logical ones, but for the inline positions headless uses `top`/`bottom`.
 */
const PLACEMENT_MAP: Record<string, PositioningShorthandValue> = {
  top: 'above',
  'top-start': 'above-start',
  'top-end': 'above-end',
  bottom: 'below',
  'bottom-start': 'below-start',
  'bottom-end': 'below-end',
  left: 'before',
  'left-start': 'before-top',
  'left-end': 'before-bottom',
  right: 'after',
  'right-start': 'after-top',
  'right-end': 'after-bottom',
};

/**
 * Converts a physical placement into the headless `data-placement` vocabulary.
 *
 * Returns `undefined` for an unrecognised placement so the caller can leave the attribute alone
 * rather than writing a value consumers cannot style against.
 */
export function toHeadlessPlacement(placement: string): PositioningShorthandValue | undefined {
  return PLACEMENT_MAP[placement];
}
