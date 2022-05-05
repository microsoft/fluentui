import * as React from 'react';
import { getNativeElementProps } from '@fluentui/react-utilities';
import type { ToolbarRadioProps, ToolbarRadioState } from './ToolbarRadio.types';

/**
 * Create the state required to render ToolbarRadio.
 *
 * The returned state can be modified with hooks such as useToolbarRadioStyles_unstable,
 * before being passed to renderToolbarRadio_unstable.
 *
 * @param props - props from this instance of ToolbarRadio
 * @param ref - reference to root HTMLElement of ToolbarRadio
 */
export const useToolbarRadio_unstable = (props: ToolbarRadioProps, ref: React.Ref<HTMLElement>): ToolbarRadioState => {
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
