import { ISlotProp } from './ISlots';

/**
 * Generic slot definition allowing common HTML attributes. Applicable for most intrinsic slots.
 */
export type IHTMLGenericSlot = ISlotProp<React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>, React.ReactNode>;

/**
 * Optional HTML element typing to confine or expand HTML attribute usage for an intrinsic slot.
 * Useful for slots that need to allow access to specialized HTML attributes, such as for buttons and inputs.
 * Example usage: root?: IHTMLElementSlot<'button'>;
 */
export type IHTMLElementSlot<TElement extends keyof JSX.IntrinsicElements> = ISlotProp<JSX.IntrinsicElements[TElement], React.ReactNode>;
