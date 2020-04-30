import * as React from 'react';
import { ImageProps } from './Image.types';
import { compose } from '@fluentui/react-compose';
import { useImage } from './useImage';

export const ImageBase = compose<'img', ImageProps, ImageProps, {}, {}>(
  (props, ref, composeOptions) => {
    const { slots, slotProps } = useImage(props, composeOptions);

    return <slots.root ref={ref} {...slotProps.root} />;
  },
  {
    displayName: 'ImageBase',
  },
);

ImageBase.defaultProps = {
  as: 'img',
  alt: '',
};

// @ts-ignore
ImageBase.shorthandConfig = {
  mappedProp: 'src',
};
