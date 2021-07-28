import * as React from 'react';
import { makeMergeProps, resolveShorthandProps } from '@fluentui/react-utilities';
import { useButtonState } from '../Button/useButtonState';
import { CompoundButtonProps, CompoundButtonShorthandPropsCompat, CompoundButtonState } from './CompoundButton.types';

/**
 * Consts listing which props are shorthand props.
 */
export const compoundButtonShorthandPropsCompat: CompoundButtonShorthandPropsCompat[] = [
  'contentContainer',
  'icon',
  'secondaryContent',
];

const mergeProps = makeMergeProps<CompoundButtonState>({
  deepMerge: compoundButtonShorthandPropsCompat,
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
      // Slots exclusive to CompoundButton
      contentContainer: { as: 'span', children: null },
      secondaryContent: { as: 'span' },
      // Non-slot props
      size: 'medium',
    },
    defaultProps && resolveShorthandProps(defaultProps, compoundButtonShorthandPropsCompat),
    resolveShorthandProps(props, compoundButtonShorthandPropsCompat),
  );

  useButtonState(state);

  return state;
};
