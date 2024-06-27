import * as React from 'react';
import { getIntrinsicElementProps, slot } from '@fluentui/react-utilities';
import type { AppNodeProps, AppNodeState } from './AppNode.types';

/**
 * Create the state required to render AppNode.
 *
 * The returned state can be modified with hooks such as useAppNodeStyles_unstable,
 * before being passed to renderAppNode_unstable.
 *
 * @param props - props from this instance of AppNode
 * @param ref - reference to root HTMLDivElement of AppNode
 */
export const useAppNode_unstable = (props: AppNodeProps, ref: React.Ref<HTMLDivElement>): AppNodeState => {
  return {
    // TODO add appropriate props/defaults
    components: {
      // TODO add each slot's element type or component
      root: 'div',
    },
    // TODO add appropriate slots, for example:
    // mySlot: resolveShorthand(props.mySlot),
    root: slot.always(
      getIntrinsicElementProps('div', {
        ref,
        ...props,
      }),
      { elementType: 'div' },
    ),
  };
};
