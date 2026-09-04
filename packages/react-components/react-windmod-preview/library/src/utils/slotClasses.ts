import { clsx } from 'clsx';
import type { ClassValue } from 'clsx';

/**
 * Re-stacks one slot's class list — the component's own classes first, the slot's incoming
 * `className` last, so a consumer declaration wins the cascade at equal specificity.
 *
 * A falsy slot is returned unchanged rather than materialised: an optional slot the headless hook
 * decided not to build must stay absent, because a renderer draws any slot object it is handed.
 *
 * Not a hook and deliberately not `use`-named — see `useNavItemStyles`.
 */
export const slotClasses = <TSlot extends { className?: string } | undefined>(
  slot: TSlot,
  ...classes: ClassValue[]
): TSlot => (slot && { ...slot, className: clsx(...classes, slot.className) }) as TSlot;
