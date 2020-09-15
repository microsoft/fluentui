import * as React from 'react';
import { makeMergeProps, resolveShorthandProps } from '@fluentui/react-compose/lib/next/index';
import { CompoundButtonProps } from './CompoundButton.types';
import { useButtonState } from '../Button/useButtonState';
import { renderCompoundButton } from './renderCompoundButton';

/**
 * Consts listing which props are shorthand props.
 */
export const compoundButtonShorthandProps = ['icon', 'loader', 'content', 'contentContainer', 'secondaryContent'];

const mergeProps = makeMergeProps({
  deepMerge: compoundButtonShorthandProps,
});

/**
 * Given user props, returns state and render function for a Button.
 */
export const useCompoundButton = (
  props: CompoundButtonProps,
  ref: React.Ref<HTMLElement>,
  defaultProps?: CompoundButtonProps,
) => {
  // Ensure that the `ref` prop can be used by other things (like useFocusRects) to refer to the root.
  // NOTE: We are assuming refs should not mutate to undefined. Either they are passed or not.
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const resolvedRef = ref || React.useRef();
  const state = mergeProps(
    {
      ref: resolvedRef,
      as: 'button',
      icon: { as: 'span' },
      content: { as: 'span', children: props.children },
      contentContainer: { as: 'span', children: null },
      secondaryContent: { as: 'span' },
      loader: { as: 'span' },
    },
    defaultProps,
    resolveShorthandProps(props, compoundButtonShorthandProps),
  );

  useButtonState(state);

  return { state, render: renderCompoundButton };
};
