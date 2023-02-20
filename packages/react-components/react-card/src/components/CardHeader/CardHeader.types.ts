import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';

/**
 * Slots available in the CardHeader component.
 */
export type CardHeaderSlots = {
  /**
   * Root element of the component.
   */
  root: Slot<'div'>;

  /**
   * Element used to render an image or avatar related to the card.
   */
  image: Slot<'div', 'img'>;

  /**
   * Element used to render the main header title.
   */
  header: Slot<'div'>;

  /**
   * Element used to render short descriptions related to the title.
   */
  description: Slot<'div'>;

  /**
   * Container that renders on the far end of the footer, used for action buttons.
   */
  action?: Slot<'div'>;
};

/**
 * CardHeader component props.
 */
export type CardHeaderProps = ComponentProps<Partial<CardHeaderSlots>>;

/**
 * State used in rendering CardHeader.
 */
export type CardHeaderState = ComponentState<CardHeaderSlots>;
