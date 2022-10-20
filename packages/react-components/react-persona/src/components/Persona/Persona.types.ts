import { Avatar } from '@fluentui/react-avatar';
import { PresenceBadge } from '@fluentui/react-badge';
import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';

export type PersonaSlots = {
  root: NonNullable<Slot<'div'>>;

  /**
   * Avatar to display.
   *
   * If a PresenceBadge and an Avatar are provided, the Avatar will display the PresenceBadge as its presence.
   */
  avatar?: Slot<typeof Avatar>;

  /**
   * PresenceBadge to display.
   *
   * If `presenceOnly` is true, the PresenceBadge will be displayed instead of the Avatar.
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
export type PersonaProps = ComponentProps<PersonaSlots> & {
  /**
   * The name of the person or entity represented by the Persona.
   *
   * When `primaryText` is not provided, this will be used as the default value for `primaryText`.
   */
  name?: string;

  /**
   * Whether to display only the presence.
   *
   * @default false
   */
  presenceOnly?: boolean;

  /**
   * The position of the text relative to the avatar/presence.
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
