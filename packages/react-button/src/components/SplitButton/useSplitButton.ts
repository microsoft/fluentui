import * as React from 'react';
import { getCode, ArrowDownKey } from '@fluentui/keyboard-key';
import { useBoolean, useMergedRefs } from '@fluentui/react-hooks';
import { resolveShorthandProps, makeMergeProps } from '@fluentui/react-utils';
import { SplitButtonProps, SplitButtonState } from './SplitButton.types';

export const splitButtonShorthandProps = ['icon', 'button', 'divider', 'menuButton'];

const mergeProps = makeMergeProps({ deepMerge: splitButtonShorthandProps });

/**
 * Redefine the component factory, reusing button factory.
 */
export const useSplitButton = (
  props: SplitButtonProps,
  ref: React.Ref<HTMLElement>,
  defaultProps?: SplitButtonProps,
): SplitButtonState => {
  const {
    as = 'span',
    block,
    circular,
    className,
    defaultExpanded,
    disabled,
    disabledFocusable,
    expanded,
    ghost,
    loading,
    menu,
    menuButtonRef,
    onMenuDismiss,
    primary,
    size,
    style,
    transparent,
    ...userProps
  } = resolveShorthandProps(props, splitButtonShorthandProps);

  const buttonRef = React.useRef<HTMLElement | undefined>(null);
  const [
    menuOpenedFromPrimaryButton,
    { setTrue: setMenuOpenedFromPrimaryButtonToTrue, setFalse: setMenuOpenedFromPrimaryButtonToFalse },
  ] = useBoolean(false);

  /* Override the onDismiss event so that the primary action button is refocused after dismissing the menu if it was
   * opened while focusing it in the first place instead of refocusing the menu button. */
  const onDismiss = (ev?: Event | React.MouseEvent | React.KeyboardEvent) => {
    if (onMenuDismiss) {
      onMenuDismiss(ev);
    }

    if (menuOpenedFromPrimaryButton) {
      buttonRef.current?.focus();
    }

    setMenuOpenedFromPrimaryButtonToFalse();
  };

  const state = mergeProps(
    {
      as: 'span',
      'aria-disabled': disabled,
      block,
      className,
      disabled,
      primary,
      size,
      style,
      transparent,

      button: {
        as: 'span',
        ref: useMergedRefs(ref, buttonRef),
        circular,
        disabled,
        disabledFocusable,
        ghost,
        loading,
        primary,
        size,
        transparent,
        ...userProps,
      },

      divider: { as: 'span', children: null },

      menuButton: {
        as: 'span',
        children: null,
        ref: useMergedRefs(menuButtonRef, React.useRef<HTMLElement>(null)),
        circular,
        defaultExpanded,
        disabled,
        disabledFocusable,
        expanded,
        ghost,
        loading,
        menu,
        onMenuDismiss: onDismiss,
        primary,
        size,
        transparent,
      },
    },
    defaultProps,
  ) as SplitButtonState;

  /* Adding the ability to open the menu while focusing on the primary action button by pressing the Alt+Down key
   * combination. */
  const { onKeyDown } = state;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (state.button as any).onKeyDown = (ev: React.KeyboardEvent<HTMLElement>) => {
    if (onKeyDown) {
      onKeyDown(ev);

      if (ev.defaultPrevented) {
        return;
      }
    }

    if ((ev.altKey || ev.metaKey) && getCode(ev) === ArrowDownKey) {
      ev.preventDefault();
      ev.stopPropagation();

      setMenuOpenedFromPrimaryButtonToTrue();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (state.menuButton as any).ref?.current?.click?.(ev);
    }
  };

  return state;
};
