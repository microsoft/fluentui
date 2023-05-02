import * as React from 'react';
import { getNativeElementProps, resolveShorthand } from '@fluentui/react-utilities';
import type { TagButtonProps, TagButtonState } from './TagButton.types';
import { Dismiss16Filled } from '@fluentui/react-icons';
import { Avatar } from '@fluentui/react-avatar';

/**
 * Create the state required to render TagButton.
 *
 * The returned state can be modified with hooks such as useTagButtonStyles_unstable,
 * before being passed to renderTagButton_unstable.
 *
 * @param props - props from this instance of TagButton
 * @param ref - reference to root HTMLElement of TagButton
 */
export const useTagButton_unstable = (props: TagButtonProps, ref: React.Ref<HTMLElement>): TagButtonState => {
  const {
    checked = false,
    disabled = false,
    dismissable = false,
    shape = 'rounded',
    size = 'medium',
    appearance = 'filled-lighter',
  } = props;

  return {
    components: {
      root: 'div',
      contentButton: 'button',
      avatar: Avatar,
      icon: 'span',
      primaryText: 'span',
      secondaryText: 'span',
      dismissButton: 'button',
    },
    checked,
    disabled,
    dismissable,
    shape,
    size,
    appearance,
    root: getNativeElementProps('div', {
      ref,
      ...props,
    }),
    contentButton: resolveShorthand(props.contentButton, { required: true }),
    avatar: resolveShorthand(props.avatar),
    icon: resolveShorthand(props.icon),
    primaryText: resolveShorthand(props.primaryText),
    secondaryText: resolveShorthand(props.secondaryText),
    dismissButton: resolveShorthand(props.dismissButton, {
      required: true,
      defaultProps: {
        disabled,
        type: 'button',
        children: <Dismiss16Filled />,
      },
    }),
  };
};
