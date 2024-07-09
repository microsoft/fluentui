import * as React from 'react';
import { getIntrinsicElementProps, slot } from '@fluentui/react-utilities';
import type { AppNodeProps, AppNodeState } from './AppNode.types';
import { useNavContext_unstable } from '../NavContext';

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
  const { size = 'medium' } = useNavContext_unstable();

  const iconShorthand = slot.optional(props.icon, { elementType: 'span' });

  return {
    components: { root: 'div', icon: 'span' },
    root: slot.always(
      getIntrinsicElementProps('div', {
        ref,
        ...props,
      }),
      { elementType: 'div' },
    ),
    icon: iconShorthand,
    size,
  };
};
