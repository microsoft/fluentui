import * as React from 'react';
import { getNativeElementProps } from '@fluentui/react-utilities';
import type { ComboButtonProps, ComboButtonState } from './ComboButton.types';

/**
 * Create the state required to render ComboButton.
 *
 * The returned state can be modified with hooks such as useComboButtonStyles_unstable,
 * before being passed to renderComboButton_unstable.
 *
 * @param props - props from this instance of ComboButton
 * @param ref - reference to root HTMLElement of ComboButton
 */
export const useComboButton_unstable = (props: ComboButtonProps, ref: React.Ref<HTMLElement>): ComboButtonState => {
  return {
    // TODO add appropriate props/defaults
    components: {
      // TODO add each slot's element type or component
      root: 'div',
    },
    // TODO add appropriate slots, for example:
    // mySlot: resolveShorthand(props.mySlot),
    root: getNativeElementProps('div', {
      ref,
      ...props,
    }),
  };
};
