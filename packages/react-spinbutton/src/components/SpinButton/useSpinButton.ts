import * as React from 'react';
import { getNativeElementProps } from '@fluentui/react-utilities';
import type { SpinButtonProps, SpinButtonState } from './SpinButton.types';

/**
 * Create the state required to render SpinButton.
 *
 * The returned state can be modified with hooks such as useSpinButtonStyles_unstable,
 * before being passed to renderSpinButton_unstable.
 *
 * @param props - props from this instance of SpinButton
 * @param ref - reference to root HTMLElement of SpinButton
 */
export const useSpinButton_unstable = (props: SpinButtonProps, ref: React.Ref<HTMLElement>): SpinButtonState => {
  return {
    // TODO add appropriate props/defaults
    components: {
      // TODO add slot types here if needed (div is the default)
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
