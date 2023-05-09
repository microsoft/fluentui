import * as React from 'react';
import { getNativeElementProps } from '@fluentui/react-utilities';
import { DismissRegular, bundleIcon, DismissFilled } from '@fluentui/react-icons';
import type { TagProps, TagState } from './Tag.types';
import { useARIAButtonShorthand } from '@fluentui/react-aria';

const DismissIcon = bundleIcon(DismissFilled, DismissRegular);

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
    dismissible = false,
    shape = 'rounded',
    size = 'medium',
    appearance = 'filled-lighter',
    interactive = false,
  } = props;

  return {
    components: {
      root: 'div',
      dismissButton: 'button',
    },

    checked,
    disabled,
    dismissible,
    shape,
    size,
    appearance,
    interactive,

    root: getNativeElementProps('div', {
      ref,
      ...props,
    }),

    dismissButton: useARIAButtonShorthand(props.dismissButton, {
      required: props.dismissible,
      defaultProps: {
        disabled,
        type: 'button',
        children: <DismissIcon />,
      },
    }),
  };
};
