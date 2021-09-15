import type { ComponentProps, ComponentState, IntrinsicShorthandProps } from '@fluentui/react-utilities';

export type CardPreviewSlots = {
  root: IntrinsicShorthandProps<'div'>;
  logo?: IntrinsicShorthandProps<'div'>;
};

/**
 * CardPreview props
 */
export interface CardPreviewProps extends ComponentProps<CardPreviewSlots> {}

/**
 * State used in rendering CardPreview
 */
export interface CardPreviewState extends ComponentState<CardPreviewSlots> {}
