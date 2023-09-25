import { Enter, Space } from '@fluentui/keyboard-keys';
import { useEventCallback } from '@fluentui/react-utilities';
import * as React from 'react';
import type { ARIAButtonElementIntersection, ARIAButtonProps, ARIAButtonResultProps, ARIAButtonType } from './types';

/**
 * @internal
 *
 * Button keyboard handling, role, disabled and tabIndex implementation that ensures ARIA spec
 * for multiple scenarios of non native button elements. Ensuring 1st rule of ARIA for cases
 * where no attribute addition is required.
 *
 * @param type - the proper scenario to be interpreted by the hook.
 *  1. `button` - Minimal interference from the hook, as semantic button already supports most of the states
 *  2. `a` or `div` - Proper keyboard/mouse handling plus other support to ensure ARIA behavior
 * @param props - the props to be passed down the line to the desired element.
 * This hook will encapsulate proper properties, such as `onClick`, `onKeyDown`, `onKeyUp`, etc,.
 *
 * @example
 * ```tsx
 * const buttonProps = useARIAButtonProps('a', {
 *   href: './some-route'
 *   onClick: () => console.log('this should run both on click and Space and Enter')
 * })
 *
 * // ...
 *
 * return (
 *  <a {...buttonProps}>This anchor will behave as a proper button</a>
 * )
 * ```
 */
export function useARIAButtonProps<Type extends ARIAButtonType, Props extends ARIAButtonProps<Type>>(
  type?: Type,
  props?: Props,
): ARIAButtonResultProps<Type, Props> {
  const {
    disabled,
    disabledFocusable = false,
    ['aria-disabled']: ariaDisabled,
    onClick,
    onKeyDown,
    onKeyUp,
    ...rest
  } = props ?? {};

  const normalizedARIADisabled = typeof ariaDisabled === 'string' ? ariaDisabled === 'true' : ariaDisabled;

  const isDisabled = disabled || disabledFocusable || normalizedARIADisabled;

  const handleClick = useEventCallback((ev: React.MouseEvent<ARIAButtonElementIntersection>) => {
    if (isDisabled) {
      ev.preventDefault();
      ev.stopPropagation();
    } else {
      onClick?.(ev);
    }
  });

  const handleKeyDown = useEventCallback((ev: React.KeyboardEvent<ARIAButtonElementIntersection>) => {
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

  const handleKeyUp = useEventCallback((ev: React.KeyboardEvent<ARIAButtonElementIntersection>) => {
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
      disabled: disabled && !disabledFocusable,
      'aria-disabled': disabledFocusable ? true : normalizedARIADisabled,
      // onclick should still use internal handler to ensure prevention if disabled
      // if disabledFocusable then there's no requirement for handlers as those events should not be propagated
      onClick: disabledFocusable ? undefined : handleClick,
      onKeyUp: disabledFocusable ? undefined : onKeyUp,
      onKeyDown: disabledFocusable ? undefined : onKeyDown,
    } as ARIAButtonResultProps<Type, Props>;
  }

  // If an <a> or <div> tag is to be rendered we have to remove disabled and type,
  // and set aria-disabled, role and tabIndex.
  else {
    const resultProps = {
      role: 'button',
      tabIndex: disabled && !disabledFocusable ? undefined : 0,
      ...rest,
      // If it's not a <button> than listeners are required even with disabledFocusable
      // Since you cannot assure the default behavior of the element
      // E.g: <a> will redirect on click
      onClick: handleClick,
      onKeyUp: handleKeyUp,
      onKeyDown: handleKeyDown,
      'aria-disabled': disabled || disabledFocusable || normalizedARIADisabled,
    } as ARIAButtonResultProps<Type, Props>;

    if (type === 'a' && isDisabled) {
      (resultProps as ARIAButtonResultProps<'a', Props>).href = undefined;
    }

    return resultProps;
  }
}
