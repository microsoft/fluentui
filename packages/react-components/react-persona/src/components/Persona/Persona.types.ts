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
   * The first line of text in the Persona, larger than the rest of the lines.
   *
   * This defaults to the `name` prop, and it is recomended that you only set its value if it should be different from
   * from the `name` prop.
   */
  primaryText?: Slot<'span'>;

  /**
   * The second line of text in the Persona.
   */
  secondaryText?: Slot<'span'>;

  /**
   * The third line of text in the Persona.
   */
  tertiaryText?: Slot<'span'>;

  /**
   * The fourth line of text in the Persona.
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
     * Whether the sizing type is fixed or not.
     */
    fixed: boolean;
    /**
     * The number of text lines used.
     */
    numTextLines: number;
  };
