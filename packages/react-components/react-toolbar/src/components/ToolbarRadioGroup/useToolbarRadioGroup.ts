import * as React from 'react';
import { getNativeElementProps } from '@fluentui/react-utilities';
import type { ToolbarRadioGroupProps, ToolbarRadioGroupState } from './ToolbarRadioGroup.types';

/**
 * Create the state required to render ToolbarRadioGroup.
 *
 * The returned state can be modified with hooks such as useToolbarRadioGroupStyles_unstable,
 * before being passed to renderToolbarRadioGroup_unstable.
 *
 * @param props - props from this instance of ToolbarRadioGroup
 * @param ref - reference to root HTMLElement of ToolbarRadioGroup
 */
export const useToolbarRadioGroup_unstable = (
  props: ToolbarRadioGroupProps,
  ref: React.Ref<HTMLElement>,
): ToolbarRadioGroupState => {
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
