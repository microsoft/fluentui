import * as React from 'react';
import { getNativeElementProps } from '@fluentui/react-utilities';
import type { ToolbarButtonProps, ToolbarButtonState } from './ToolbarButton.types';

/**
 * Create the state required to render ToolbarButton.
 *
 * The returned state can be modified with hooks such as useToolbarButtonStyles_unstable,
 * before being passed to renderToolbarButton_unstable.
 *
 * @param props - props from this instance of ToolbarButton
 * @param ref - reference to root HTMLElement of ToolbarButton
 */
export const useToolbarButton_unstable = (
  props: ToolbarButtonProps,
  ref: React.Ref<HTMLElement>,
): ToolbarButtonState => {
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
