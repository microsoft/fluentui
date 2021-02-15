import * as React from 'react';
import { makeMergeProps, getSlots, resolveShorthandProps } from '@fluentui/react-utils';
import { ImageProps, ImageState } from './Image.types';
import { useImageState } from './useImageState';
import { useMergedRefs } from '@fluentui/react-hooks';

/**
 * Consts listing which props are shorthand props.
 */
export const iconShorthandProps = [];

const mergeProps = makeMergeProps<ImageState>({ deepMerge: iconShorthandProps });

/**
 * Define the render function. Given the state of a button, renders it.
 */
export const renderImage = (state: ImageState) => {
  const { slots, slotProps } = getSlots(state, iconShorthandProps);
  const { ref, ...rest } = slotProps.root;

  return <slots.root ref={ref} {...rest} />;
};

/**
 * Given user props, returns state and render function for a Button.
 */
export const useImage = (props: ImageProps, ref: React.Ref<HTMLElement>, defaultProps?: ImageProps) => {
  const state = mergeProps(
    {
      as: 'img',
      ref: useMergedRefs(ref, React.useRef<HTMLImageElement>()),
    },
    defaultProps,
    resolveShorthandProps(props, iconShorthandProps),
  );

  useImageState(state);

  return { state, render: renderImage };
};
