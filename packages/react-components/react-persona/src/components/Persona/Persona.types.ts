import { Avatar } from '@fluentui/react-avatar';
import { PresenceBadge } from '@fluentui/react-badge';
import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';

export type PersonaSlots = {
  root: Slot<'div'>;

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
export type PersonaProps = ComponentProps<PersonaSlots> & {
  /**
   * Sizing type to use.
   *
   * `fixed`: Text lines adjust to content's size.
   * `scaled`: Content adjusts its size based on the number of text lines used.
   */
  sizing?: 'fixed' | 'scaled';

  /**
   * Position the Avatar/PresenceBadge will be rendered in.
   */
  position?: 'start' | 'center' | 'end';
};

/**
 * State used in rendering Persona
 */
export type PersonaState = ComponentState<PersonaSlots> &
  Required<Pick<PersonaProps, 'position' | 'sizing'>> & {
    numTextLines: number;
  };
