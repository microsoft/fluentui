import * as React from 'react';
import { ImageProps, ImageState } from './Image.types';
import { getSlots, mergeProps } from '@fluentui/react-compose/lib/next/index';

export const renderImage = (state: ImageState) => {
  const { slots, slotProps } = getSlots(state);

  return <slots.root {...slotProps.root} />;
};

export const useImage = (props: ImageProps, ref: React.Ref<HTMLElement>, defaultProps?: ImageProps) => {
  const state = mergeProps(
    {
      as: 'img',
      ref,
    },
    defaultProps,
    props,
    {
      children: undefined,
      src: props.src || props.children,
    },
  );

  return { state, render: renderImage };
};
