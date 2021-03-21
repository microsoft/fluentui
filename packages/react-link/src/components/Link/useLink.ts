import * as React from 'react';
import { makeMergeProps, resolveShorthandProps, useMergedRefs } from '@fluentui/react-utilities';
import { LinkProps, LinkState } from './Link.types';
import { useLinkState } from './useLinkState';

/**
 * Consts listing which props are shorthand props.
 */
export const linkShorthandProps = [];

const mergeProps = makeMergeProps<LinkState>({ deepMerge: linkShorthandProps });

/**
 * Given user props, returns state and render function for a Link.
 */
export const useLink = (props: LinkProps, ref: React.Ref<HTMLElement>, defaultProps?: LinkProps): LinkState => {
  const state = mergeProps(
    {
      ref: useMergedRefs(ref, React.useRef<HTMLElement>(null)),
      as: props.href ? 'a' : 'button',
    },
    defaultProps,
    resolveShorthandProps(props, linkShorthandProps),
  );

  useLinkState(state);

  return state;
};
