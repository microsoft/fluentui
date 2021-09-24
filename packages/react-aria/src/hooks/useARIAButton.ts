import { Enter, Space } from '@fluentui/keyboard-keys';
import { resolveShorthand, useEventCallback } from '@fluentui/react-utilities';
import type { IntrinsicShorthandProps, ResolveShorthandOptions, ShorthandProps } from '@fluentui/react-utilities';

export type ARIAButtonShorthandProps = IntrinsicShorthandProps<'button', 'a'> & {
  disabled?: boolean;
  disabledFocusable?: boolean;
};

/**
 * Button keyboard handling, role, disabled and tabIndex implementation that ensures ARIA spec
 * for multiple scenarios of shorthand properties. Ensuring 1st rule of ARIA for cases
 * where no attribute addition is required.
 */
export function useARIAButton<Required extends boolean = false>(
  shorthandProps: ShorthandProps<ARIAButtonShorthandProps>,
  options?: ResolveShorthandOptions<ARIAButtonShorthandProps, Required>,
): Required extends false ? ARIAButtonShorthandProps | undefined : ARIAButtonShorthandProps {
  const shorthand = resolveShorthand(shorthandProps, options);

  const { disabled, disabledFocusable, onClick, onKeyDown, onKeyUp, tabIndex } = (shorthand ||
    {}) as ARIAButtonShorthandProps;

  const onClickHandler: ARIAButtonShorthandProps['onClick'] = useEventCallback(ev => {
    if (disabled || disabledFocusable) {
      ev.preventDefault();
      ev.stopPropagation();
    } else {
      onClick?.(ev);
    }
  });

  const onKeyDownHandler: ARIAButtonShorthandProps['onKeyDown'] = useEventCallback(ev => {
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

  const onKeyupHandler: ARIAButtonShorthandProps['onKeyUp'] = useEventCallback(ev => {
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

  if (shorthand) {
    // If a <button> tag is to be rendered we just need to set disabled and aria-disabled correctly
    if (shorthand.as === 'button' || shorthand.as === undefined) {
      shorthand.disabled = disabled && !disabledFocusable;
      shorthand['aria-disabled'] = disabledFocusable;
    }

    // If an <a> tag is to be rendered we have to remove disabled and set aria-disabled, role and tabIndex as well as
    // some event handlers.
    else {
      delete shorthand.disabled;
      shorthand['aria-disabled'] = disabled || disabledFocusable;
      shorthand.onClick = onClickHandler;
      shorthand.onKeyDown = onKeyDownHandler;
      shorthand.onKeyUp = onKeyupHandler;
      shorthand.role = shorthand.role ?? 'button';
      shorthand.tabIndex = disabled && !disabledFocusable ? undefined : tabIndex ?? 0;
    }

    // Remove non-DOM props
    delete shorthand.disabledFocusable;
  }

  return shorthand;
}
