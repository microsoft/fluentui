import * as React from 'react';
import { makeMergePropsCompat, resolveShorthandProps, useMergedRefs } from '@fluentui/react-utilities';
import type { SplitButtonProps, SplitButtonShorthandPropsCompat, SplitButtonState } from './SplitButton.types';

export const splitButtonShorthandProps: SplitButtonShorthandPropsCompat[] = ['button', 'menuButton'];

// eslint-disable-next-line deprecation/deprecation
const mergeProps = makeMergePropsCompat({ deepMerge: splitButtonShorthandProps });

/**
 * Given user props, defines default props for the SplitButton and returns processed state.
 * @param props - User provided props to the SplitButton component.
 * @param ref - User provided ref to be passed to the SplitButton component.
 */
export const useSplitButton = (
  props: SplitButtonProps,
  ref: React.Ref<HTMLElement>,
  defaultProps?: SplitButtonProps,
): SplitButtonState => {
  const resolvedShorthandProps = resolveShorthandProps(props, splitButtonShorthandProps);
  const { className } = props;
  const {
    button,
    buttonRef,
    circular,
    disabled,
    disabledFocusable,
    menuButton,
    menuButtonRef,
    outline,
    primary,
    size = 'medium',
    subtle,
    transparent,
    ...userProps
  } = resolvedShorthandProps;

  const buttonInternalRef = React.useRef<HTMLElement | undefined>(null);
  const menuButtonInternalRef = React.useRef<HTMLElement | undefined>(null);

  const state = mergeProps(
    {
      as: 'div',
      'aria-disabled': disabled,
      className,
      ref,

      button: {
        as: 'button',
        ref: useMergedRefs(buttonRef, buttonInternalRef),
        circular,
        disabled,
        disabledFocusable,
        outline,
        primary,
        size,
        subtle,
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
        outline,
        primary,
        size,
        subtle,
        transparent,
        ...menuButton,
      },
    },
    defaultProps,
    resolvedShorthandProps,
  ) as SplitButtonState;

  return state;
};
