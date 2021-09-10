import * as React from 'react';
import { makeMergePropsCompat, resolveShorthandProps, useMergedRefs } from '@fluentui/react-utilities';
import type { SplitButtonProps, SplitButtonShorthandPropsCompat, SplitButtonState } from './SplitButton.types';

export const splitButtonShorthandProps: SplitButtonShorthandPropsCompat[] = ['button', 'menuButton'];

// eslint-disable-next-line deprecation/deprecation
const mergeProps = makeMergePropsCompat({ deepMerge: splitButtonShorthandProps });

/**
 * Redefine the component factory, reusing button factory.
 */
export const useSplitButton = (
  props: SplitButtonProps,
  ref: React.Ref<HTMLElement>,
  defaultProps?: SplitButtonProps,
): SplitButtonState => {
  const resolvedShorthandProps = resolveShorthandProps(props, splitButtonShorthandProps);
  const { className } = props;
  const {
    as = 'span',
    block,
    button,
    circular,
    disabled,
    disabledFocusable,
    subtle,
    menuButton,
    menuButtonRef,
    primary,
    size = 'medium',
    style,
    transparent,
    ...userProps
  } = resolvedShorthandProps;

  const buttonRef = React.useRef<HTMLElement | undefined>(null);
  const menuButtonInternalRef = React.useRef<HTMLElement | undefined>(null);

  const state = mergeProps(
    {
      as: 'div',
      'aria-disabled': disabled,
      block,
      className,
      disabled,
      primary,
      size,
      style,
      transparent,

      button: {
        as: 'button',
        ref: useMergedRefs(ref, buttonRef),
        circular,
        disabled,
        disabledFocusable,
        subtle,
        primary,
        size,
        transparent,
        ...userProps,
        ...button,
      },

      menuButton: {
        as: 'button',
        ref: useMergedRefs(menuButtonRef, menuButtonInternalRef),
        circular,
        disabled,
        disabledFocusable,
        subtle,
        primary,
        size,
        transparent,
        ...menuButton,
      },
    },
    defaultProps,
    resolvedShorthandProps,
  ) as SplitButtonState;

  return state;
};
