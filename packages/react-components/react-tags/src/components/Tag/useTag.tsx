import * as React from 'react';
import { getNativeElementProps, resolveShorthand } from '@fluentui/react-utilities';
import { Dismiss16Filled } from '@fluentui/react-icons';
import { Avatar } from '@fluentui/react-avatar';
import type { TagProps, TagState } from './Tag.types';

/**
 * Create the state required to render Tag.
 *
 * The returned state can be modified with hooks such as useTagStyles_unstable,
 * before being passed to renderTag_unstable.
 *
 * @param props - props from this instance of Tag
 * @param ref - reference to root HTMLElement of Tag
 */
export const useTag_unstable = (props: TagProps, ref: React.Ref<HTMLElement>): TagState => {
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
      content: 'span',
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
    content: resolveShorthand(props.content, { required: true }),
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
