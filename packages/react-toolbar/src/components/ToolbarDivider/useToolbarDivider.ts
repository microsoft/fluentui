import * as React from 'react';
import { getNativeElementProps } from '@fluentui/react-utilities';
import type { ToolbarDividerProps, ToolbarDividerState } from './ToolbarDivider.types';

/**
 * Create the state required to render ToolbarDivider.
 *
 * The returned state can be modified with hooks such as useToolbarDividerStyles_unstable,
 * before being passed to renderToolbarDivider_unstable.
 *
 * @param props - props from this instance of ToolbarDivider
 * @param ref - reference to root HTMLElement of ToolbarDivider
 */
export const useToolbarDivider_unstable = (
  props: ToolbarDividerProps,
  ref: React.Ref<HTMLElement>,
): ToolbarDividerState => {
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
