import { isValidElement } from 'react';
import type { ExtractSlotProps, Slot, SlotShorthandValue, UnknownSlotProps } from './types';

/**
 * Guard method that validates if a shorthand is a slot
 * can be used to extends properties provided by a slot
 *
 * @example
 * ```
 * const backdropSlot = resolveShorthand(backdrop, {
 *  defaultProps: {
 *    onClick: useEventCallback(event => {
 *     if (isSlot(backdrop)) {
 *        backdrop.onClick?.(event)
 *      }
 *      // do something after passing click down the line
 *    }),
 *  },
 * })
 * ```
 * @example
 * ```
 * const handleBackDropClick = (event) => {
 *  // do your thing
 * }
 * const backdropSlot = resolveShorthand(backdrop, {
 *  defaultProps: {
 *    onClick: useEventCallback(mergeCallbacks(isSlot(backdrop) ? backdrop.onClick : undefined, handleBackdropClick))
 * })
 * ```
 */
export function isSlot<Shorthand extends Slot<UnknownSlotProps>>(
  shorthand?: Shorthand,
): shorthand is ExtractSlotProps<Shorthand> {
  return (
    shorthand !== null &&
    typeof shorthand !== 'string' &&
    typeof shorthand !== 'number' &&
    !Array.isArray(shorthand) &&
    !isValidElement(shorthand) &&
    typeof shorthand === 'object'
  );
}

/**
 * @internal
 * The "opposite" of being a slot is being a shorthand value. which means being either:
 * 1. string
 * 2. number
 * 3. Array
 * 4. JSX element
 */
export function isShorthandValue<Shorthand extends Slot<UnknownSlotProps>>(
  shorthand?: Shorthand,
): shorthand is Extract<Shorthand, SlotShorthandValue | null | undefined> {
  return (
    typeof shorthand === 'string' ||
    typeof shorthand === 'number' ||
    Array.isArray(shorthand) ||
    isValidElement(shorthand)
  );
}
