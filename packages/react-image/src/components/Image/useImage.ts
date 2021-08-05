import * as React from 'react';
import { makeMergeProps, resolveShorthandProps, useMergedRefs } from '@fluentui/react-utilities';
import { ImageProps, ImageState } from './Image.types';

const mergeProps = makeMergeProps<ImageState>();

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

  state['aria-hidden'] = state.alt || state['aria-label'] ? undefined : 'true';

  return state;
};
