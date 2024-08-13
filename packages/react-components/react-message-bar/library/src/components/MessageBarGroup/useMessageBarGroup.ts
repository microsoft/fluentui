import * as React from 'react';
import type { MessageBarGroupProps, MessageBarGroupState } from './MessageBarGroup.types';
import { getIntrinsicElementProps, slot } from '@fluentui/react-utilities';

/**
 * Create the state required to render MessageBarGroup.
 *
 * The returned state can be modified with hooks such as useMessageBarGroupStyles_unstable,
 * before being passed to renderMessageBarGroup_unstable.
 *
 * @param props - props from this instance of MessageBarGroup
 * @param ref - reference to root HTMLElement of MessageBarGroup
 */
export const useMessageBarGroup_unstable = (
  props: MessageBarGroupProps,
  ref: React.Ref<HTMLDivElement>,
): MessageBarGroupState => {
  if (process.env.NODE_ENV !== 'production') {
    React.Children.forEach(props.children, c => {
      if (!React.isValidElement(c) || c.type === React.Fragment) {
        throw new Error(
          "MessageBarGroup: children must be valid MessageBar components. Please ensure you're not using fragments. ",
        );
      }
    });
  }

  const children = React.Children.map(props.children ?? [], c =>
    React.isValidElement(c) && c.type !== React.Fragment ? c : null,
  ).filter(Boolean);

  return {
    components: {
      root: 'div',
    },

    root: slot.always(
      getIntrinsicElementProps('div', {
        ref,
        ...props,
      }),
      { elementType: 'div' },
    ),
    children,
    animate: props.animate ?? 'exit-only',
    enterStyles: '',
    exitStyles: '',
  };
};
