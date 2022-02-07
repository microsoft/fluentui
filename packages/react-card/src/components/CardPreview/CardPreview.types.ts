import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';

export type CardPreviewSlots = {
  root: Slot<'div'>;
  logo?: Slot<'div'>;
};

/**
 * CardPreview props
 */
export type CardPreviewProps = ComponentProps<CardPreviewSlots>;

/**
 * State used in rendering CardPreview
 */
export type CardPreviewState = ComponentState<CardPreviewSlots>;
