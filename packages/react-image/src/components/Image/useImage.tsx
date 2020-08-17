import * as React from 'react';
import { mergeProps, getSlots, resolveShorthandProps } from '@fluentui/react-compose/lib/next/index';
import { ImageProps, ImageState } from './Image.types';
import { useImageState } from './useImageState';
import { useMergedRefs } from '@uifabric/react-hooks';

/**
 * Consts listing which props are shorthand props.
 */
export const iconShorthandProps = [];

/**
 * Define the render function. Given the state of a button, renders it.
 */
export const renderImage = (state: ImageState) => {
  const { slots, slotProps } = getSlots(state, iconShorthandProps);
  const { imageRef } = state;
  const { ref, ...rest } = slotProps.root;

  // eslint-disable-next-line react-hooks/rules-of-hooks
  return <slots.root ref={useMergedRefs(ref, ...(imageRef ? [imageRef] : []))} {...rest} />;
};

/**
 * Given user props, returns state and render function for a Button.
 */
export const useImage = (props: ImageProps, ref: React.Ref<HTMLElement>, defaultProps?: ImageProps) => {
  const state = mergeProps(
    {
      ref,
      as: 'img',
    },
    defaultProps,
    resolveShorthandProps(props, iconShorthandProps),
  );

  useImageState(state);

  return { state, render: renderImage };
};
