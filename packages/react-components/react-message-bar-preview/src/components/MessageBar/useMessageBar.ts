import * as React from 'react';
import { getNativeElementProps, slot } from '@fluentui/react-utilities';
import type { MessageBarProps, MessageBarState } from './MessageBar.types';
import { getIntentIcon } from './getIntentIcon';

/**
 * Create the state required to render MessageBar.
 *
 * The returned state can be modified with hooks such as useMessageBarStyles_unstable,
 * before being passed to renderMessageBar_unstable.
 *
 * @param props - props from this instance of MessageBar
 * @param ref - reference to root HTMLElement of MessageBar
 */
export const useMessageBar_unstable = (props: MessageBarProps, ref: React.Ref<HTMLElement>): MessageBarState => {
  const { multiline = false, intent = 'info' } = props;

  return {
    components: {
      root: 'div',
      icon: 'div',
      actions: 'div',
      secondaryActions: 'div',
      body: 'div',
    },
    root: slot.always(
      getNativeElementProps('div', {
        ref,
        ...props,
      }),
      { elementType: 'div' },
    ),

    body: slot.always(props.body ?? {}, { elementType: 'div', defaultProps: { children: props.children } }),
    icon: slot.optional(props.icon, {
      renderByDefault: true,
      elementType: 'div',
      defaultProps: { children: getIntentIcon(intent) },
    }),
    actions: slot.optional(props.actions, { renderByDefault: false, elementType: 'div' }),
    secondaryActions: slot.optional(props.secondaryActions, { renderByDefault: false, elementType: 'div' }),
    multiline,
    intent,
  };
};
