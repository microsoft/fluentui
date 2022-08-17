import { Enter, Space } from '@fluentui/keyboard-keys';
import { resolveShorthand, useEventCallback } from '@fluentui/react-utilities';
import type { ExtractSlotProps, ResolveShorthandFunction, Slot } from '@fluentui/react-utilities';
import * as React from 'react';

export type ARIAButtonType = 'button' | 'a' | 'div';

/**
 * Props expected by `useARIAButtonProps` hooks
 */
export type ARIAButtonProps<Type extends ARIAButtonType = ARIAButtonType> = React.PropsWithRef<
  JSX.IntrinsicElements[Type]
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

export type ARIAButtonSlotProps<AlternateAs extends 'a' | 'div' = 'a' | 'div'> = ExtractSlotProps<
  Slot<'button', AlternateAs>
> &
  Pick<ARIAButtonProps<ARIAButtonType>, 'disabled' | 'disabledFocusable'>;

/**
 * @internal
 * Props that will be modified internally by `useARIAButtonProps` by each case.
 * This typing is to ensure a well specified return value for `useARIAbButtonProps`
 */
type ARIAButtonAlteredProps<Type extends ARIAButtonType> =
  | (Type extends 'button'
      ? Pick<
          JSX.IntrinsicElements['button'],
          'onClick' | 'onKeyDown' | 'onKeyUp' | 'disabled' | 'aria-disabled' | 'tabIndex'
        >
      : never)
  | (Type extends 'a'
      ? Pick<
          JSX.IntrinsicElements['a'],
          'onClick' | 'onKeyDown' | 'onKeyUp' | 'aria-disabled' | 'tabIndex' | 'role' | 'href'
        >
      : never)
  | (Type extends 'div'
      ? Pick<JSX.IntrinsicElements['div'], 'onClick' | 'onKeyDown' | 'onKeyUp' | 'aria-disabled' | 'tabIndex' | 'role'>
      : never);

type UnionToIntersection<U> = (U extends unknown ? (x: U) => U : never) extends (x: infer I) => U ? I : never;

/**
 * Merge of props provided by the user and props provided internally.
 */
export type ARIAButtonResultProps<Type extends ARIAButtonType, Props> = Props &
  UnionToIntersection<ARIAButtonAlteredProps<Type>>;

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

  const handleClick: Props['onClick'] = useEventCallback(ev => {
    if (isDisabled) {
      ev.preventDefault();
      ev.stopPropagation();
    } else {
      onClick?.(ev);
    }
  });

  const handleKeyDown: Props['onKeyDown'] = useEventCallback(ev => {
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

  const handleKeyUp: Props['onKeyUp'] = useEventCallback(ev => {
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
    } as ARIAButtonResultProps<Type, Props>;
  }

  // If an <a> or <div> tag is to be rendered we have to remove disabled and type,
  // and set aria-disabled, role and tabIndex.
  else {
    const resultProps = {
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
    } as ARIAButtonResultProps<Type, Props>;

    if (type === 'a' && isDisabled) {
      (resultProps as ARIAButtonResultProps<'a', Props>).href = undefined;
    }

    return resultProps;
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
  const shorthandARIAButton = useARIAButtonProps<ARIAButtonType, ARIAButtonProps>(shorthand?.as ?? 'button', shorthand);
  return shorthand && shorthandARIAButton;
};
