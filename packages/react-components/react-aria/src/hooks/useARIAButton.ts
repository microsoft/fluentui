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

export type ARIAButtonProps<Type extends 'a' | 'div' | 'button' = 'a' | 'div' | 'button'> = React.PropsWithRef<
  JSX.IntrinsicElements[Type]
> &
  Pick<ARIAButtonSlotProps, 'disabled' | 'disabledFocusable'>;

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
  const {
    disabled,
    tabIndex,
    disabledFocusable = false,
    onClick,
    onKeyDown,
    onKeyUp,
    ['aria-disabled']: ariaDisabled,
    ...rest
  } = props ?? {};

  const normalizedARIADisabled = typeof ariaDisabled === 'string' ? ariaDisabled === 'true' : ariaDisabled;

  const isDisabled = disabled || disabledFocusable || normalizedARIADisabled;

  const handleClick: ARIAButtonProps['onClick'] = useEventCallback(ev => {
    if (isDisabled) {
      ev.preventDefault();
      ev.stopPropagation();
    } else {
      onClick?.(ev);
    }
  });

  const handleKeyDown: ARIAButtonProps['onKeyDown'] = useEventCallback(ev => {
    onKeyDown?.(ev);

    if (ev.isDefaultPrevented()) {
      return;
    }

    const key = ev.key;

    if (isDisabled && (key === Enter || key === Space)) {
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

  const handleKeyUp: ARIAButtonProps['onKeyUp'] = useEventCallback(ev => {
    onKeyUp?.(ev);

    if (ev.isDefaultPrevented()) {
      return;
    }

    const key = ev.key;

    if (isDisabled && (key === Enter || key === Space)) {
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
      'aria-disabled': disabledFocusable ? true : normalizedARIADisabled,
      // onclick should still use internal handler to ensure prevention if disabled
      // if disabledFocusable then there's no requirement for handlers as those events should not be propagated
      onClick: disabledFocusable ? undefined : handleClick,
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
      // If it's not a <button> than listeners are required even with disabledFocusable
      // Since you cannot assure the default behavior of the element
      // E.g: <a> will redirect on click
      onClick: handleClick,
      onKeyUp: handleKeyUp,
      onKeyDown: handleKeyDown,
      'aria-disabled': disabled || disabledFocusable || normalizedARIADisabled,
      tabIndex: disabled && !disabledFocusable ? undefined : tabIndex ?? 0,
    } as React.PropsWithRef<JSX.IntrinsicElements[Type]>;

    if (type === 'a' && isDisabled) {
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
