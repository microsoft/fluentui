import * as React from 'react';
import { makeMergePropsCompat, resolveShorthandProps } from '@fluentui/react-utilities';
import { CompoundButtonProps, CompoundButtonState } from './CompoundButton.types';
import { useButtonState } from '../Button/useButtonState';

/**
 * Consts listing which props are shorthand props.
 */
export const compoundButtonShorthandProps = ['icon', 'children', 'contentContainer', 'secondaryContent'] as const;

// eslint-disable-next-line deprecation/deprecation
const mergeProps = makeMergePropsCompat<CompoundButtonState>({
  deepMerge: compoundButtonShorthandProps,
});

/**
 * Given user props, returns state and render function for a Button.
 */
export const useCompoundButton = (
  props: CompoundButtonProps,
  ref: React.Ref<HTMLElement>,
  defaultProps?: CompoundButtonProps,
): CompoundButtonState => {
  // Ensure that the `ref` prop can be used by other things (like useFocusRects) to refer to the root.
  // NOTE: We are assuming refs should not mutate to undefined. Either they are passed or not.
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const resolvedRef = ref || React.useRef();
  const state = mergeProps(
    {
      ref: resolvedRef,
      as: 'button',
      // Slots inherited from Button
      icon: { as: 'span' },
      loader: { as: 'span' },
      // Slots exclusive to CompoundButton
      contentContainer: { as: 'span', children: null },
      secondaryContent: { as: 'span' },
    },
    defaultProps,
    resolveShorthandProps(props, compoundButtonShorthandProps),
  );

  useButtonState(state);

  return state;
};
