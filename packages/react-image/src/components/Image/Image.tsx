import * as React from 'react';
import { renderImage } from './renderImage';
import { useImage } from './useImage';
import { useImageStyles } from './useImageStyles';
import type { ImageProps } from './Image.types';

export const Image: React.FunctionComponent<ImageProps & React.RefAttributes<HTMLElement>> = React.forwardRef(
  (props: ImageProps, ref: React.Ref<HTMLElement>) => {
    const state = useImage(props, ref);
    useImageStyles(state);

    return renderImage(state);
  },
);

Image.displayName = 'Image';
