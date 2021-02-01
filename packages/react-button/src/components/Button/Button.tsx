import * as React from 'react';
import { useButton } from './useButton';
import { ButtonProps } from './Button.types';
import { useInlineTokens } from '@fluentui/react-theme-provider';
import { useButtonClasses } from './useButtonClasses';
import { renderButton } from './renderButton';

// import on tokens (global, button)

// makestyles

/**
 * A button enables the user to trigger an action or event with a single input.
 * Buttons are best used to enable a user to commit a change or complete steps in a task.
 * They are typically found inside forms, dialogs, panels or pages.
 * An example of their usage is confirming the deletion of a file in a confirmation dialog.
 *
 * While buttons can technically be used to navigate a user to another part of the experience, this is not recommended
 * unless that navigation is part of an action or their flow.
 */
export const Button = React.forwardRef<HTMLElement, ButtonProps>((props, ref) => {
  const state = useButton(props, ref);

  useButtonClasses(state);
  useInlineTokens(state, '--button');

  return renderButton(state);
});

Button.displayName = 'Button';
