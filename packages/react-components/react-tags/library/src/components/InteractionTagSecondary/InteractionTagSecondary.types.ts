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
  Required<Pick<InteractionTagContextValue, 'appearance' | 'disabled' | 'selected' | 'shape' | 'size'>>;

/**
 * InteractionTagSecondary Base Props - same as InteractionTagSecondaryProps (no design-only own props)
 */
export type InteractionTagSecondaryBaseProps = InteractionTagSecondaryProps;

/**
 * InteractionTagSecondary Base State - omits design-only state derived from context
 */
export type InteractionTagSecondaryBaseState = Omit<InteractionTagSecondaryState, 'appearance' | 'size' | 'shape'>;
