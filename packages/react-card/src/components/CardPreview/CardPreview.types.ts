import type { ComponentProps, ComponentState, IntrinsicSlotProps } from '@fluentui/react-utilities';

export type CardPreviewSlots = {
  root: IntrinsicSlotProps<'div'>;
  logo?: IntrinsicSlotProps<'div'>;
};

/**
 * CardPreview props
 */
export type CardPreviewProps = ComponentProps<CardPreviewSlots>;

/**
 * State used in rendering CardPreview
 */
export type CardPreviewState = ComponentState<CardPreviewSlots>;
