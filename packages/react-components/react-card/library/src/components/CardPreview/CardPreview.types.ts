import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';
import type { CardContextValue } from '../Card/Card.types';

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
export type CardPreviewProps = ComponentProps<CardPreviewSlots> & {
  /**
   * Layout of the content.
   *
   * - `full` (default): Pushes out to align with the edges of the Card.
   * - `contained`: Content stays within the Card's spacing.
   *
   * @default 'full'
   */
  layout?: 'full' | 'contained';
};

/**
 * CardPreview base props (same as CardPreviewProps since CardPreview has no design props)
 */
export type CardPreviewBaseProps = CardPreviewProps;

/**
 * State used in rendering CardPreview.
 *
 * `orientation` and `size` are inherited from the parent Card via context so descendant
 * slots (and external theme libraries) can react to them without re-reading context.
 */
export type CardPreviewState = ComponentState<CardPreviewSlots> &
  Required<Pick<CardPreviewProps, 'layout'> & Pick<CardContextValue, 'orientation' | 'size'>>;

/**
 * CardPreview base state (same as CardPreviewState since CardPreview has no design props)
 */
export type CardPreviewBaseState = CardPreviewState;
