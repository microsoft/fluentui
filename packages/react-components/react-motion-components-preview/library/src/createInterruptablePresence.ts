import type { PresenceMotion } from '@fluentui/react-motion';

const SYMBOL = Symbol.for('interruptablePresence');

/**
 * An experimental API to mark a presence as interruptable.
 *
 * API shape and behavior may change in the future. Don't use in production code.
 */
export function createInterruptablePresence(motion: PresenceMotion): PresenceMotion {
  // TODO: validate that motion is reversible?

  return {
    ...motion,
    [SYMBOL]: true,
  } as PresenceMotion;
}
