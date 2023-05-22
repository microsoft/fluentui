import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';

/**
 * Slots available in the Card component.
 */
export type CardPreviewSlots = {
  /**
   * Root element of the component.
   */
  root: NonNullable<Slot<'div'>>;

  /**
   * Container that holds a logo related to the image preview provided.
   */
  logo?: Slot<'div', 'img'>;
};

/**
 * CardPreview component props.
 */
export type CardPreviewProps = ComponentProps<Partial<CardPreviewSlots>>;

/**
 * State used in rendering CardPreview.
 */
export type CardPreviewState = ComponentState<CardPreviewSlots>;
