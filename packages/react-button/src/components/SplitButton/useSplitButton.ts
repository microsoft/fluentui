import * as React from 'react';
import { makeMergeProps, resolveShorthandProps } from '@fluentui/react-utilities';
import type { SplitButtonProps, SplitButtonShorthandPropsCompat, SplitButtonState } from './SplitButton.types';

export const splitButtonShorthandProps: SplitButtonShorthandPropsCompat[] = ['button', 'menuButton'];

const mergeProps = makeMergeProps<SplitButtonState>({ deepMerge: splitButtonShorthandProps });

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

  // TODO: To be resolved when moving to simplified prop merging
  // const buttonInternalRef = React.useRef<HTMLElement | null>(null);
  // const menuButtonInternalRef = React.useRef<HTMLElement | null>(null);

  const state = mergeProps(
    {
      'aria-disabled': disabled,
      as: 'div',
      className,
      ref,
      size,

      button: {
        as: 'button',
        // TODO: To be resolved when moving to simplified prop merging
        // ref: useMergedRefs(buttonRef, buttonInternalRef),
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
        // TODO: To be resolved when moving to simplified prop merging
        // ref: useMergedRefs(menuButtonRef, menuButtonInternalRef),
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
    // TODO: To be resolved when moving to simplified prop merging
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    defaultProps as any,
    resolvedShorthandProps,
  );

  return state;
};
