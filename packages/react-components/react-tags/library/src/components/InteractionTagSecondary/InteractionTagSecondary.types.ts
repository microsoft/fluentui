import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';
import { InteractionTagContextValue } from '../../contexts/interactionTagContext';

export type InteractionTagSecondarySlots = {
  root: NonNullable<Slot<'button'>>;
};

/**
 * InteractionTagSecondary Props
 */
export type InteractionTagSecondaryProps = ComponentProps<InteractionTagSecondarySlots>;

/**
 * State used in rendering InteractionTagSecondary
 */
export type InteractionTagSecondaryState = ComponentState<InteractionTagSecondarySlots> &
  Required<Pick<InteractionTagContextValue, 'appearance' | 'disabled' | 'shape' | 'size'>>;
