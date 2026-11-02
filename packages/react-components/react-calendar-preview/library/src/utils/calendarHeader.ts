import type * as React from 'react';
import { Enter } from '@fluentui/keyboard-keys';

type ButtonEvent = React.MouseEvent<HTMLButtonElement> | React.KeyboardEvent<HTMLButtonElement>;

/**
 * The `type` reported in event data for a mouse or keyboard activation.
 */
export const getCalendarEventType = (event: React.SyntheticEvent | Event): 'click' | 'keydown' =>
  event.type === 'keydown' ? 'keydown' : 'click';

/**
 * Activates a header button on Enter and reports the activation as a `keydown`.
 */
export const onCalendarEnterKeyDown =
  <E extends HTMLElement>(callback: (event: React.KeyboardEvent<E>) => void) =>
  (event: React.KeyboardEvent<E>): void => {
    if (event.key === Enter) {
      event.preventDefault();
      callback(event);
    }
  };

/**
 * Default props of a previous/next navigation button. Unavailable buttons use `aria-disabled` rather than `disabled`,
 * so focus is not lost when a button becomes unavailable right after being activated.
 */
export const getCalendarNavigationButtonProps = (
  inBounds: boolean,
  allFocusable: boolean,
  title: string,
  onActivate: (event: ButtonEvent) => void,
): React.ButtonHTMLAttributes<HTMLButtonElement> => ({
  'aria-disabled': !inBounds,
  onClick: inBounds ? onActivate : undefined,
  onKeyDown: inBounds ? onCalendarEnterKeyDown(onActivate) : undefined,
  tabIndex: inBounds ? undefined : allFocusable ? 0 : -1,
  title,
  type: 'button',
});
