import type { ComponentProps, ComponentState, IntrinsicShorthandProps } from '@fluentui/react-utilities';

export type CardPreviewSlots = {
  root: IntrinsicShorthandProps<'div'>;
  logo?: IntrinsicShorthandProps<'div'>;
};

/**
 * CardPreview props
 */
export type CardPreviewProps = ComponentProps<CardPreviewSlots>;

/**
 * State used in rendering CardPreview
 */
export type CardPreviewState = ComponentState<CardPreviewSlots>;
