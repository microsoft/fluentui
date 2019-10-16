import * as React from 'react';
import { ISlotProp } from './ISlots';

/**
 * Generic slot definition allowing common HTML attributes. Applicable for most intrinsic slots. Please note certain
 * elements such as buttons and inputs should make use of IHTMLElementSlot to provide access to specialized attributes
 * of those elements.
 */
export type IHTMLSlot = ISlotProp<React.DetailedHTMLProps<React.HTMLAttributes<any>, any>>;

/**
 * Optional HTML element typing to confine or expand HTML attribute usage for an intrinsic slot.
 * Useful for slots that need to allow access to specialized HTML attributes, such as for buttons and inputs.
 * Example usage: root?: IHTMLElementSlot\<'button'\>;
 */
export type IHTMLElementSlot<TElement extends keyof JSX.IntrinsicElements> = ISlotProp<JSX.IntrinsicElements[TElement]>;
