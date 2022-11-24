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
   * `primaryText` defaults to the `name` prop. We recomend to only use `name`, use `primaryText` when the text is
   *  different than the `name` prop.
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
   * The size of a Persona and its text.
   *
   * @default medium
   */
  size?: 'extra-small' | 'small' | 'medium' | 'large' | 'extra-large' | 'huge';

  /**
   * The position of the text relative to the avatar/presence.
   *
   * @default after
   */
  textPosition?: 'after' | 'before' | 'below';

  /**
   * The vertical alignment of the text relative to the avatar/presence.
   *
   * @default start
   */
  textAlignment?: 'center' | 'start';
};

/**
 * State used in rendering Persona
 */
export type PersonaState = ComponentState<PersonaSlots> &
  Required<Pick<PersonaProps, 'presenceOnly' | 'size' | 'textAlignment' | 'textPosition'>> & {
    /**
     * The number of text lines used.
     */
    numTextLines: number;
  };
