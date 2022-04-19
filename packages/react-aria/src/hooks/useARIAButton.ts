import { Enter, Space } from '@fluentui/keyboard-keys';
import { resolveShorthand, useEventCallback } from '@fluentui/react-utilities';
import type { ExtractSlotProps, ResolveShorthandFunction, Slot } from '@fluentui/react-utilities';

export type ARIAButtonSlotProps = ExtractSlotProps<Slot<'button', 'a'>> & {
  disabled?: boolean;
  disabledFocusable?: boolean;
};

/**
 * Button keyboard handling, role, disabled and tabIndex implementation that ensures ARIA spec
 * for multiple scenarios of shorthand properties. Ensuring 1st rule of ARIA for cases
 * where no attribute addition is required.
 */
export const useARIAButton: ResolveShorthandFunction<ARIAButtonSlotProps> = (shorthand, options) => {
  const shorthandProps = resolveShorthand(shorthand, options);

  const { disabled, disabledFocusable, onClick, onKeyDown, onKeyUp, tabIndex } = (shorthandProps ||
    {}) as ARIAButtonSlotProps;

  const onClickHandler: ARIAButtonSlotProps['onClick'] = useEventCallback(ev => {
    if (disabled || disabledFocusable) {
      ev.preventDefault();
      ev.stopPropagation();
    } else {
      onClick?.(ev);
    }
  });

  const onKeyDownHandler: ARIAButtonSlotProps['onKeyDown'] = useEventCallback(ev => {
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

  const onKeyupHandler: ARIAButtonSlotProps['onKeyUp'] = useEventCallback(ev => {
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

  if (shorthandProps) {
    // If a <button> tag is to be rendered we just need to set disabled and aria-disabled correctly
    if (shorthandProps.as === 'button' || shorthandProps.as === undefined) {
      shorthandProps.disabled = disabled && !disabledFocusable;
      shorthandProps['aria-disabled'] = disabledFocusable ? true : undefined;

      // Undefine events if disabledFocusable is passed in
      if (disabledFocusable) {
        shorthandProps.onClick = undefined;
        shorthandProps.onKeyDown = undefined;
        shorthandProps.onKeyUp = undefined;
      }
    }

    // If an <a> tag is to be rendered we have to remove disabled and type, and set aria-disabled, role and tabIndex.
    else {
      delete shorthandProps.disabled;
      shorthandProps['aria-disabled'] = disabled || disabledFocusable;
      (shorthandProps as JSX.IntrinsicElements['a']).href = disabled
        ? undefined
        : (shorthandProps as JSX.IntrinsicElements['a']).href;
      shorthandProps.onClick = onClickHandler;
      shorthandProps.onKeyDown = onKeyDownHandler;
      shorthandProps.onKeyUp = onKeyupHandler;
      shorthandProps.role = shorthandProps.role ?? 'button';
      shorthandProps.tabIndex = disabled && !disabledFocusable ? undefined : tabIndex ?? 0;
    }

    // Remove non-DOM disabledFocusable prop
    delete shorthandProps.disabledFocusable;
  }

  return shorthandProps;
};
