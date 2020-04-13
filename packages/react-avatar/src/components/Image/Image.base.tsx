import * as React from 'react';
import { ImageProps, ImageOptions } from './Image.types';
import { compose, ComposeStandardStatics } from '../utils/compose';
import { useImage } from './useImage';

export const ImageBase = compose<ImageProps, {}, {}, ComposeStandardStatics>(
  (props: ImageProps & ImageOptions, ref: React.RefObject<HTMLElement>, options: ImageOptions) => {
    const { slots, slotProps } = useImage(props, options);

    return <slots.root ref={ref} {...slotProps.root} />;
  },
  {
    defaultProps: {
      as: 'img',
    },
    statics: {
      handledProp: 'src',
      displayName: 'ImageBase',
    },
  },
);
