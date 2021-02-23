import * as React from 'react';
/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-ignore Typings require esModuleInterop
import { objectFitImages } from 'object-fit-images';
import { makeMergeProps, resolveShorthandProps, useMergedRefs } from '@fluentui/react-utilities';
import { ImageProps, ImageState } from './Image.types';

const mergeProps = makeMergeProps<ImageState>();

const isFitSupported = (function() {
  const testImg = new Image();

  return 'object-fit' in testImg.style && 'object-position' in testImg.style;
})();

/**
 * Given user props, returns state and render function for an Image.
 */
export const useImage = (props: ImageProps, ref: React.Ref<HTMLElement>, defaultProps?: ImageProps): ImageState => {
  const resolvedRef = useMergedRefs(ref, React.useRef(null));
  const state = mergeProps(
    {
      ref: resolvedRef,
      as: 'img',
    },
    defaultProps,
    resolveShorthandProps(props, []),
  );

  React.useEffect(
    () => {
      if (!isFitSupported) {
        objectFitImages(state.ref.current);
      }
    },
    // objectFitImages() should be executed once per element
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  state['aria-hidden'] = state.alt || state['aria-label'] ? undefined : 'true';

  return state;
};
