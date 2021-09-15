import { Enter, Space } from '@fluentui/keyboard-keys';
import { ObjectShorthandProps, resolveShorthand, useEventCallback } from '@fluentui/react-utilities';
import type { IntrinsicShorthandProps, ResolveShorthandOptions, ShorthandProps } from '@fluentui/react-utilities';
import { mergeARIADisabled } from '../utils/index';

export type ARIAButtonShorthandProps = IntrinsicShorthandProps<'button', 'div' | 'span' | 'a'>;

/**
 * button keyboard handling, role, disabled and tabIndex implementation that ensures ARIA spec
 * for multiple scenarios of shorthand properties. Ensuring 1st rule of ARIA for cases
 * where no attribute addition is required
 */
export function useARIAButton<Required extends boolean = false>(
  value: ShorthandProps<ARIAButtonShorthandProps>,
  options?: ResolveShorthandOptions<ARIAButtonShorthandProps, Required>,
): Required extends false ? ARIAButtonShorthandProps | undefined : ARIAButtonShorthandProps {
  const shorthand = resolveShorthand(value, options);

  const { onClick, onKeyDown, onKeyUp } = (shorthand || {}) as ARIAButtonShorthandProps;

  const disabled = mergeARIADisabled(shorthand as ObjectShorthandProps<ARIAButtonShorthandProps>);

  const onClickHandler: ARIAButtonShorthandProps['onClick'] = useEventCallback(ev => {
    if (disabled) {
      ev.preventDefault();
      ev.stopPropagation();
    } else {
      if (typeof onClick === 'function') {
        onClick(ev);
      }
    }
  });

  const onKeyDownHandler: ARIAButtonShorthandProps['onKeyDown'] = useEventCallback(ev => {
    if (typeof onKeyDown === 'function') {
      onKeyDown(ev);
    }
    if (ev.isDefaultPrevented()) {
      return;
    }
    if (disabled && (ev.key === Enter || ev.key === Space)) {
      ev.preventDefault();
      ev.stopPropagation();
      return;
    }
    if (ev.key === Space) {
      ev.preventDefault();
      return;
    }
    // If enter is pressed, activate the button
    else if (ev.key === Enter) {
      ev.preventDefault();
      ev.currentTarget.click();
    }
  });

  const onKeyupHandler: ARIAButtonShorthandProps['onKeyUp'] = useEventCallback(ev => {
    if (typeof onKeyUp === 'function') {
      onKeyUp(ev);
    }
    if (ev.isDefaultPrevented()) {
      return;
    }
    if (disabled && (ev.key === Enter || ev.key === Space)) {
      ev.preventDefault();
      ev.stopPropagation();
      return;
    }
    if (ev.key === Space) {
      ev.preventDefault();
      ev.currentTarget.click();
    }
  });

  if (shorthand) {
    if (shorthand.as === 'button' || shorthand.as === undefined) {
      return shorthand; // there's nothing to be done if as prop === 'button' or undefined
    }

    if (!shorthand.hasOwnProperty('role')) {
      shorthand.role = 'button';
    }
    if (!shorthand.hasOwnProperty('aria-disabled')) {
      shorthand['aria-disabled'] = disabled;
    }

    shorthand.onClick = onClickHandler;
    shorthand.onKeyDown = onKeyDownHandler;
    shorthand.onKeyUp = onKeyupHandler;

    // Add keydown event handler for all other non-anchor elements.
    if (shorthand.as !== 'a') {
      // Removes disabled attribute for all other non-anchor elements
      if ('disabled' in shorthand) {
        delete shorthand.disabled;
      }
      if (!shorthand.hasOwnProperty('tabIndex')) {
        shorthand.tabIndex = disabled ? undefined : 0;
      }
    }
  }

  return shorthand;
}
