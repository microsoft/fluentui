import * as React from 'react';
import { useButton } from './useButton';
import { ButtonProps } from './Button.types';
import { renderButton } from './renderButton';
import { useButtonClasses } from './useButtonClasses'

/**
 * Note, this file is written as a monolith for now to ease development.
 * It will be split to separate files later.
 */

// =================================================
// Types
// =================================================


// type Slot = {
//   className?: string;
//   children?: React.ReactChildren | Array<React.ReactChildren>;
// };
//
// type ButtonState = {
//   icon?: Slot;
//   content?: Slot;
//   className?: string;
// };

// =================================================
// Theme Values
// =================================================

/**
 * Define a styled Button, using the `useButton` hook.
 * {@docCategory Button}
 */
export const Button = React.forwardRef<HTMLElement, ButtonProps>((props, ref) => {
  const state = useButton(props, ref);

  // TODO: fix children check for "empty" slots once useButton() updated
  const hasContent = !!state.content.children;
  const hasIcon = !!state.icon.children;

  const iconOnly = hasIcon && !hasContent;
  const styleSelectors = {
    primary: props.primary,
    iconOnly: iconOnly,
    textOnly: hasContent && !hasIcon,
    textWithIcon: hasIcon && hasContent,
    size: props.size,
  };

  useButtonClasses(state, styleSelectors);

  return renderButton(state);
});

Button.displayName = 'Button';
