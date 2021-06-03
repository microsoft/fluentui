import * as React from 'react';
import { makeMergePropsCompat, resolveShorthandProps, useMergedRefs } from '@fluentui/react-utilities';
import { SplitButtonProps, SplitButtonState } from './SplitButton.types';

export const splitButtonShorthandProps = ['button', 'menuButton'] as const;

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
  const {
    as = 'span',
    // block,
    button,
    // circular,
    className,
    // defaultExpanded,
    disabled,
    // disabledFocusable,
    // expanded,
    subtle,
    // loading,
    // menu,
    menuButton,
    menuButtonRef,
    // onMenuDismiss,
    primary,
    size,
    style,
    transparent,
    ...userProps
  } = resolvedShorthandProps;

  const buttonRef = React.useRef<HTMLElement | undefined>(null);
  // const [
  //   menuOpenedFromPrimaryButton,
  //   { setTrue: setMenuOpenedFromPrimaryButtonToTrue, setFalse: setMenuOpenedFromPrimaryButtonToFalse },
  // ] = useBoolean(false);

  /* Override the onDismiss event so that the primary action button is refocused after dismissing the menu if it was
   * opened while focusing it in the first place instead of refocusing the menu button. */
  // const onDismiss = (ev?: Event | React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>) => {
  //   if (onMenuDismiss) {
  //     onMenuDismiss(ev);
  //   }

  //   if (menuOpenedFromPrimaryButton) {
  //     buttonRef.current?.focus();
  //   }

  //   setMenuOpenedFromPrimaryButtonToFalse();
  // };

  const state = mergeProps(
    {
      as: 'div',
      'aria-disabled': disabled,
      // block,
      className,
      disabled,
      primary,
      size,
      style,
      transparent,

      button: {
        as: 'button',
        ref: useMergedRefs(ref, buttonRef),
        // circular,
        disabled,
        // disabledFocusable,
        subtle,
        // loading,
        primary,
        size,
        transparent,
        ...userProps,
        ...button,
      },

      menuButton: {
        as: 'button',
        // children: null,
        ref: useMergedRefs(menuButtonRef, React.useRef<HTMLElement>(null)),
        // circular,
        // defaultExpanded,
        disabled,
        // disabledFocusable,
        // expanded,
        subtle,
        // loading,
        // menu,
        // onMenuDismiss: onDismiss,
        primary,
        size,
        transparent,
        ...menuButton,
      },
    },
    defaultProps,
    resolvedShorthandProps,
  ) as SplitButtonState;

  // /* Adding the ability to open the menu while focusing on the primary action button by pressing the Alt+Down key
  //  * combination. */
  // const { onKeyDown } = state;
  // // eslint-disable-next-line @typescript-eslint/no-explicit-any
  // (state.button as any).onKeyDown = (ev: React.KeyboardEvent<HTMLElement>) => {
  //   if (onKeyDown) {
  //     onKeyDown(ev);

  //     if (ev.defaultPrevented) {
  //       return;
  //     }
  //   }

  //   if ((ev.altKey || ev.metaKey) && getCode(ev) === ArrowDownKey) {
  //     ev.preventDefault();
  //     ev.stopPropagation();

  //     setMenuOpenedFromPrimaryButtonToTrue();
  //     // eslint-disable-next-line @typescript-eslint/no-explicit-any
  //     (state.menuButton as any).ref?.current?.click?.(ev);
  //   }
  // };

  return state;
};
