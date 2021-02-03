import * as React from 'react';
import { resolveShorthandProps, makeMergeProps } from '@fluentui/react-utils';
import { SplitButtonProps, SplitButtonState } from './SplitButton.types';
import { useMergedRefs } from '@fluentui/react-hooks';

export const splitButtonShorthandProps = ['icon', 'button', 'divider', 'menuButton'];

const mergeProps = makeMergeProps({ deepMerge: splitButtonShorthandProps });

/**
 * Redefine the component factory, reusing button factory.
 */
export const useSplitButton = (
  props: SplitButtonProps,
  ref: React.Ref<HTMLElement>,
  defaultProps?: SplitButtonProps,
) => {
  const {
    as = 'span',
    className,
    style,
    primary,
    ghost,
    disabled,
    disabledFocusable,
    loading,
    circular,
    block,
    menu,
    menuButtonRef,
    size,
    transparent,
    ...userProps
  } = resolveShorthandProps(props, splitButtonShorthandProps);

  ref = useMergedRefs(ref, React.useRef<HTMLElement>(null));

  const state = mergeProps(
    {
      as: 'span',
      className,
      style,
      disabled,
      block,
      primary,
      size,
      transparent,
      'aria-disabled': disabled,

      button: {
        as: 'span',
        ref,
        primary,
        ghost,
        circular,
        disabled,
        disabledFocusable,
        loading,
        size,
        transparent,
        ...userProps,
      },

      divider: { as: 'span', children: null },

      menuButton: {
        as: 'span',
        ref: menuButtonRef,
        primary,
        ghost,
        circular,
        size,
        disabled,
        disabledFocusable,
        loading,
        transparent,
        menu,
        children: null,
      },
    },
    defaultProps,
  ) as SplitButtonState;

  return state as SplitButtonState;
};
