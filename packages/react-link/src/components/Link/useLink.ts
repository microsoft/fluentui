import * as React from 'react';
import { makeMergeProps, resolveShorthandProps } from '@fluentui/react-utils';
import { LinkProps, LinkState } from './Link.types';
import { useLinkState } from './useLinkState';

/**
 * Consts listing which props are shorthand props.
 */
export const linkShorthandProps = [];

const mergeProps = makeMergeProps({ deepMerge: linkShorthandProps });

/**
 * Given user props, returns state and render function for a Link.
 */
export const useLink = (props: LinkProps, ref: React.Ref<HTMLElement>, defaultProps?: LinkProps) => {
  // Ensure that the `ref` prop can be used by other things (like useFocusRects) to refer to the root.
  // NOTE: We are assuming refs should not mutate to undefined. Either they are passed or not.
  const defaultRef = React.useRef<HTMLElement>(null);
  const resolvedRef = ref || defaultRef;

  const state = mergeProps(
    {
      ref: resolvedRef,
      as: props.href ? 'a' : 'button',
    },
    defaultProps,
    resolveShorthandProps(props, linkShorthandProps),
  );

  useLinkState(state);

  return state as LinkState;
};
