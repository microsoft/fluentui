import { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';
import { InteractionTagContextValue } from '../../contexts/interactionTagContext';
import { TagAvatarContextValues, UseTagAvatarContextValuesOptions } from '../../utils/useTagAvatarContextValues';

export type PrimaryContextValues = TagAvatarContextValues;

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
export type PrimaryProps = ComponentProps<Partial<PrimarySlots>> & {
  /**
   * Whether the `InteractionTag` component has a `Secondary` component that provides an secondary action.
   * If `true`, the `Primary` component will adjust its styles to accommodate the `Secondary` component.
   */
  hasSecondaryAction?: boolean;
};

/**
 * State used in rendering Primary
 */
export type PrimaryState = ComponentState<PrimarySlots> &
  Required<
    Pick<InteractionTagContextValue, 'appearance' | 'disabled' | 'shape' | 'size'> &
      Pick<PrimaryProps, 'hasSecondaryAction'>
  > &
  UseTagAvatarContextValuesOptions;
