import { Enter, Space } from '@fluentui/keyboard-keys';
import { resolveShorthand, useEventCallback } from '@fluentui/react-utilities';
import type { ExtractSlotProps, ResolveShorthandFunction, Slot } from '@fluentui/react-utilities';
import * as React from 'react';

export type ARIAButtonSlotProps<AlternateAs extends 'a' | 'div' = 'a' | 'div'> = ExtractSlotProps<
  Slot<'button', AlternateAs>
> & {
  disabled?: boolean;
  /**
   * When set, allows the button to be focusable even when it has been disabled.
   * This is used in scenarios where it is important to keep a consistent tab order
   * for screen reader and keyboard users. The primary example of this
   * pattern is when the disabled button is in a menu or a commandbar and is seldom used for standalone buttons.
   *
   * @default false
   */
  disabledFocusable?: boolean;
};

export type ARIAButtonProps<AlternateAs extends 'a' | 'div' = 'a' | 'div'> = React.PropsWithRef<
  JSX.IntrinsicElements[NonNullable<ARIAButtonSlotProps<AlternateAs>['as']>]
> &
  Pick<ARIAButtonSlotProps<AlternateAs>, 'disabled' | 'disabledFocusable'>;

/**
 * @internal
 *
 * Button keyboard handling, role, disabled and tabIndex implementation that ensures ARIA spec
 * for multiple scenarios of shorthand properties. Ensuring 1st rule of ARIA for cases
 * where no attribute addition is required.
 */
export function useARIAButtonProps<Type extends NonNullable<ARIAButtonSlotProps['as']>>(
  type?: Type,
  props?: ARIAButtonProps,
): React.PropsWithRef<JSX.IntrinsicElements[Type]> {
  const { disabled, tabIndex, disabledFocusable = false, onClick, onKeyDown, onKeyUp, ...rest } = props ?? {};

  const onClickHandler: ARIAButtonProps['onClick'] = useEventCallback(ev => {
    if (disabled || disabledFocusable) {
      ev.preventDefault();
      ev.stopPropagation();
    } else {
      onClick?.(ev);
    }
  });

  const onKeyDownHandler: ARIAButtonProps['onKeyDown'] = useEventCallback(ev => {
    onKeyDown?.(ev);

    if (ev.isDefaultPrevented()) {
      return;
    }

    const key = ev.key;

    if ((disabled || disabledFocusable) && (key === Enter || key === Space)) {
      ev.preventDefault();
      ev.stopPropagation();
      return;
    }

    if (key === Space) {
      ev.preventDefault();
      return;
    }

    // If enter is pressed, activate the button
    else if (key === Enter) {
      ev.preventDefault();
      ev.currentTarget.click();
    }
  });

  const onKeyupHandler: ARIAButtonProps['onKeyUp'] = useEventCallback(ev => {
    onKeyUp?.(ev);

    if (ev.isDefaultPrevented()) {
      return;
    }

    const key = ev.key;

    if ((disabled || disabledFocusable) && (key === Enter || key === Space)) {
      ev.preventDefault();
      ev.stopPropagation();
      return;
    }

    if (key === Space) {
      ev.preventDefault();
      ev.currentTarget.click();
    }
  });

  // If a <button> tag is to be rendered we just need to set disabled and aria-disabled correctly
  if (type === 'button' || type === undefined) {
    return {
      ...rest,
      tabIndex,
      disabled: disabled && !disabledFocusable,
      'aria-disabled': disabledFocusable ? true : undefined,
      // Undefine event handlers if disabledFocusable is passed in
      onClick: disabledFocusable ? undefined : onClick,
      onKeyUp: disabledFocusable ? undefined : onKeyUp,
      onKeyDown: disabledFocusable ? undefined : onKeyDown,
    } as React.PropsWithRef<JSX.IntrinsicElements[Type]>;
  }

  // If an <a> or <div> tag is to be rendered we have to remove disabled and type,
  // and set aria-disabled, role and tabIndex.
  else {
    const nextProps = {
      role: 'button',
      ...rest,
      onClick: onClickHandler,
      onKeyUp: onKeyupHandler,
      onKeyDown: onKeyDownHandler,
      'aria-disabled': disabled || disabledFocusable,
      tabIndex: disabled && !disabledFocusable ? undefined : tabIndex ?? 0,
    } as React.PropsWithRef<JSX.IntrinsicElements[Type]>;

    if (type === 'a' && disabled) {
      (nextProps as JSX.IntrinsicElements['a']).href = undefined;
    }

    return nextProps;
  }
}

/**
 * @internal
 *
 * This function expects to receive a slot, if `as` property is not desired use `useARIAButtonProps` instead
 *
 * Button keyboard handling, role, disabled and tabIndex implementation that ensures ARIA spec
 * for multiple scenarios of shorthand properties. Ensuring 1st rule of ARIA for cases
 * where no attribute addition is required.
 */
export const useARIAButtonShorthand: ResolveShorthandFunction<ARIAButtonSlotProps> = (slot, options) => {
  const shorthand = resolveShorthand(slot, options);
  const shorthandARIAButton = useARIAButtonProps(shorthand?.as ?? 'button', shorthand);
  return shorthand && shorthandARIAButton;
};
