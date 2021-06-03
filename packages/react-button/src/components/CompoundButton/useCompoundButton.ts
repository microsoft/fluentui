import * as React from 'react';
import { makeMergePropsCompat, resolveShorthandProps } from '@fluentui/react-utilities';
import { CompoundButtonProps, CompoundButtonState } from './CompoundButton.types';
import { useButtonState } from '../Button/useButtonState';

/**
 * Consts listing which props are shorthand props.
 */
export const compoundButtonShorthandProps = ['children', 'contentContainer', 'icon', 'secondaryContent'] as const;

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
  const state = mergeProps(
    {
      ref,
      as: 'button',
      // Slots inherited from Button
      icon: { as: 'span' },
      loader: { as: 'span' },
      // Slots exclusive to CompoundButton
      contentContainer: { as: 'span', children: null },
      secondaryContent: { as: 'span' },
    },
    defaultProps && resolveShorthandProps(defaultProps, compoundButtonShorthandProps),
    resolveShorthandProps(props, compoundButtonShorthandProps),
  );

  useButtonState(state);

  return state;
};
