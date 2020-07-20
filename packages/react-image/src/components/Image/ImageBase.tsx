import { compose, mergeProps } from '@fluentui/react-compose';
import { useMergedRefs } from '@uifabric/react-hooks';
import * as React from 'react';

import { ImageProps, ImageSlots, ImageSlotProps, ImageState } from './Image.types';
import { useImage } from './useImage';

export const ImageBase = compose<'img', ImageProps, ImageProps, {}, {}>(
  (props, ref, options) => {
    const { state } = options;
    const { slots, slotProps } = mergeProps<ImageProps, ImageState, ImageSlots, ImageSlotProps>(state, options);

    const { imageRef } = state;

    return <slots.root ref={useMergedRefs(ref, imageRef)} {...slotProps.root} />;
  },
  {
    displayName: 'ImageBase',
    handledProps: [
      'bordered',
      'circular',
      // TODO: https://github.com/microsoft/fluentui/issues/13679
      'imageRef',
      'rounded',
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ] as any,
    state: useImage,
  },
);

ImageBase.defaultProps = {
  as: 'img',
};
