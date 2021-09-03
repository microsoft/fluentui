import * as React from 'react';
import { makeMergeProps, resolveShorthandProps } from '@fluentui/react-utilities';
import { CardPreviewProps, CardPreviewShorthandProps, CardPreviewState } from './CardPreview.types';

/**
 * Array of all shorthand properties listed in CardPreviewShorthandProps
 */
export const cardPreviewShorthandPropsCompat: CardPreviewShorthandProps[] = ['logo'];

const mergeProps = makeMergeProps<CardPreviewState>({ deepMerge: cardPreviewShorthandPropsCompat });

/**
 * Create the state required to render CardPreview.
 *
 * The returned state can be modified with hooks such as useCardPreviewStyles,
 * before being passed to renderCardPreview.
 *
 * @param props - props from this instance of CardPreview
 * @param ref - reference to root HTMLElement of CardPreview
 * @param defaultProps - (optional) default prop values provided by the implementing type
 */
export const useCardPreview = (
  props: CardPreviewProps,
  ref: React.Ref<HTMLElement>,
  defaultProps?: CardPreviewProps,
): CardPreviewState => {
  const state = mergeProps(
    {
      ref,
      logo: { as: 'div' },
    },
    defaultProps && resolveShorthandProps(defaultProps, cardPreviewShorthandPropsCompat),
    resolveShorthandProps(props, cardPreviewShorthandPropsCompat),
  );

  return state;
};
