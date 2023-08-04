import { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';
import { InteractionTagContextValue } from '../../contexts/interactionTagContext';
import { AvatarContextValues, UseAvatarContextValuesOptions } from '../../contexts/useAvatarContextValues';

export type PrimaryContextValues = AvatarContextValues;

export type PrimarySlots = {
  root: NonNullable<Slot<'button'>>;

  /**
   * Slot for an icon or other visual element
   */
  media?: Slot<'span'>;

  icon?: Slot<'span'>;

  /**
   * Main text for the Primary button. Children of the root slot are automatically rendered here
   */
  primaryText: Slot<'span'>;

  /**
   * Secondary text that describes or complements the main text
   */
  secondaryText?: Slot<'span'>;
};

/**
 * Primary Props
 */
export type PrimaryProps = ComponentProps<Partial<PrimarySlots>>;

/**
 * State used in rendering Primary
 */
export type PrimaryState = ComponentState<PrimarySlots> &
  Required<Pick<InteractionTagContextValue, 'appearance' | 'disabled' | 'hasSecondary' | 'shape' | 'size'>> &
  UseAvatarContextValuesOptions;
