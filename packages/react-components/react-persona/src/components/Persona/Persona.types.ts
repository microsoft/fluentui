import { Avatar, AvatarProps } from '@fluentui/react-avatar';
import { PresenceBadge } from '@fluentui/react-badge';
import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';

export type PersonaSlots = {
  root: NonNullable<Slot<'div'>>;

  /**
   * Avatar to display.
   */
  avatar?: Slot<typeof Avatar>;

  /**
   * PresenceBadge to display.
   */
  presence?: Slot<typeof PresenceBadge>;

  /**
   * Primary text to display.
   */
  primaryText?: Slot<'span'>;

  /**
   * Secondary text to display.
   */
  secondaryText?: Slot<'span'>;

  /**
   * Tertiary text to display.
   */
  tertiaryText?: Slot<'span'>;

  /**
   * Quaternary text to display.
   */
  quaternaryText?: Slot<'span'>;
};

/**
 * Persona Props
 */
export type PersonaProps = Omit<ComponentProps<PersonaSlots>, 'badge'> &
  Pick<AvatarProps, 'name'> & {
    /**
     * Whether to display only the presence.
     *
     * @default false
     */
    presenceOnly?: boolean;

    /**
     * Position the text will be rendered in.
     *
     * @default after
     */
    textPosition?: 'before' | 'after' | 'below';
  };

/**
 * State used in rendering Persona
 */
export type PersonaState = ComponentState<PersonaSlots> &
  Required<Pick<PersonaProps, 'textPosition' | 'presenceOnly'>> & {
    /**
     * The number of text lines used.
     */
    numTextLines: number;
    /**
     * Whether the sizing type is fixed or not.
     */
    fixed: boolean;
  };
