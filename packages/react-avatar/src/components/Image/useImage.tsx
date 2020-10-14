import * as React from 'react';
import { ImageProps, ImageState } from './Image.types';
import { makeMergeProps } from '@fluentui/react-compose/lib/next/index';
import { renderImage } from './renderImage';

const mergeProps = makeMergeProps<ImageState>();

export const useImage = (props: ImageProps, ref: React.Ref<HTMLElement>, defaultProps?: ImageProps) => {
  const state = mergeProps(
    {
      as: 'img',
      ref,
    },
    defaultProps,
    props,
    {
      src: props.src || props.children,
      children: null,
    },
  );

  return { state, render: renderImage };
};
