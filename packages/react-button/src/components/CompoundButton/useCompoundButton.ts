import * as React from 'react';
import { makeMergeProps, resolveShorthandProps } from '@fluentui/react-utilities';
import { useButtonState } from '../Button/useButtonState';
import type {
  CompoundButtonProps,
  CompoundButtonShorthandPropsCompat,
  CompoundButtonState,
} from './CompoundButton.types';

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
 * Given user props, defines default props for the CompoundButton, calls useButtonState, and returns processed state.
 * @param props - User provided props to the CompoundButton component.
 * @param ref - User provided ref to be passed to the CompoundButton component.
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
      type: 'button', // This is added because the default for type is 'submit'
    },
    defaultProps && resolveShorthandProps(defaultProps, compoundButtonShorthandPropsCompat),
    resolveShorthandProps(props, compoundButtonShorthandPropsCompat),
  );

  useButtonState(state);

  return state;
};
