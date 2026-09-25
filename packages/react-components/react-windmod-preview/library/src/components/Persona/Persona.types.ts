import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';
import type {
  PersonaProps as PersonaHeadlessProps,
  PersonaSlots as PersonaHeadlessSlots,
  PersonaState as PersonaHeadlessState,
} from '@fluentui/react-headless-components-preview/persona';

import type { Avatar } from '../Avatar';

/**
 * The headless slots type the avatar against the headless Avatar, which carries none of the look
 * props windmod's Avatar adds and does not narrow `color`. Re-exporting them unchanged makes both
 * the slot call and every consumer avatar shorthand fail to type-check.
 */
export type PersonaSlots = Omit<PersonaHeadlessSlots, 'avatar'> & {
  avatar?: Slot<typeof Avatar>;
};

/** Size of the coin and of the text ladder above it. */
export type PersonaSize = 'extra-small' | 'small' | 'medium' | 'large' | 'extra-large' | 'huge';

/** Vertical alignment of the text block against the coin. Ignored when the text sits below it. */
export type PersonaTextAlignment = 'center' | 'start';

/**
 * Windmod Persona props: the headless persona plus the look props the headless surface
 * deliberately omits (they exist purely to select styles).
 */
export type PersonaProps = ComponentProps<PersonaSlots> &
  Pick<PersonaHeadlessProps, 'name' | 'textPosition'> & {
    /** @default 'medium' */
    size?: PersonaSize;
    /** @default 'start' */
    textAlignment?: PersonaTextAlignment;
  };

/** Windmod Persona state: headless state plus the resolved look props. */
export type PersonaState = ComponentState<PersonaSlots> &
  Pick<PersonaHeadlessState, 'numTextLines' | 'textPosition'> & {
    root: PersonaHeadlessState['root'];
  } & Required<Pick<PersonaProps, 'size' | 'textAlignment'>>;
