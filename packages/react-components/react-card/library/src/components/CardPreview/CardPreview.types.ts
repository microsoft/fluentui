import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';

/**
 * Slots available in the Card component.
 */
export type CardPreviewSlots = {
  /**
   * Root element of the component.
   */
  root: Slot<'div'>;

  /**
   * Container that holds a logo related to the image preview provided.
   */
  logo?: Slot<'div', 'img'>;
};

/**
 * CardPreview component props.
 */
export type CardPreviewProps = ComponentProps<CardPreviewSlots>;

/**
 * CardPreview base props (same as CardPreviewProps since CardPreview has no design props)
 */
export type CardPreviewBaseProps = CardPreviewProps;

/**
 * State used in rendering CardPreview.
 */
export type CardPreviewState = ComponentState<CardPreviewSlots>;

/**
 * CardPreview base state (same as CardPreviewState since CardPreview has no design props)
 */
export type CardPreviewBaseState = CardPreviewState;
