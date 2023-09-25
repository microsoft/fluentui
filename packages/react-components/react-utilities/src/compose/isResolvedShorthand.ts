import { isValidElement } from 'react';
import type { ExtractSlotProps, Slot, UnknownSlotProps } from './types';

/**
 * Guard method that validates if a shorthand is a slot
 * can be used to extends properties provided by a slot
 *
 * @example
 * ```
 * const backdropSlot = resolveShorthand(backdrop, {
 *  defaultProps: {
 *    onClick: useEventCallback(event => {
 *     if (isResolvedShorthand(backdrop)) {
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
 *    onClick: useEventCallback(
 *      mergeCallbacks(isResolvedShorthand(backdrop) ? backdrop.onClick : undefined, handleBackdropClick)
 *    )
 * })
 * ```
 */
export function isResolvedShorthand<Shorthand extends Slot<UnknownSlotProps>>(
  shorthand?: Shorthand,
): shorthand is ExtractSlotProps<Shorthand> {
  return shorthand !== null && typeof shorthand === 'object' && !Array.isArray(shorthand) && !isValidElement(shorthand);
}
