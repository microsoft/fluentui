import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';
import { InteractionTagContextValue } from '../../contexts/interactionTagContext';

export type SecondarySlots = {
  root: Slot<'button'>;
};

/**
 * Secondary Props
 */
export type SecondaryProps = ComponentProps<SecondarySlots> & {};

/**
 * State used in rendering Secondary
 */
export type SecondaryState = ComponentState<SecondarySlots> &
  Required<Pick<InteractionTagContextValue, 'shape' | 'size' | 'appearance' | 'disabled'>>;
