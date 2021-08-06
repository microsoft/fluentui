import * as React from 'react';
import { useButton } from './useButton';
import { ButtonProps } from './Button.types';
import { renderButton } from './renderButton';
import { useButtonStyles } from './useButtonStyles';

/**
 * Buttons give people a way to trigger an action.
 *
 * They’re typically found in forms, dialog panels, and dialogs. Some buttons are specialized for particular tasks,
 * such as navigation, repeated actions, or presenting menus.
 *
 * See also:
 * [MenuButton](/?path=/docs/components-menubutton--menu-button-playground),
 * [ToggleButton](/?path=/docs/components-togglebutton--toggle-button-playground),
 * [CompoundButton](/?path=/docs/components-compoundbutton--compound-button-playground)
 *
 * ## Best practices
 * ### Layout
 * - For dialog boxes and panels, where people are moving through a sequence of screens, right-align buttons with the
 * container.
 * - For single-page forms and focused tasks, left-align buttons with the container.
 * - Always place the primary button on the left, the secondary button just to the right of it.
 * - Show only one primary button that inherits theme color at rest state. If there are more than two buttons with
 * equal priority, all buttons should have neutral backgrounds.
 * - Don't use a button to navigate to another place; use a link instead. The exception is in a wizard where "Back" and
 * "Next" buttons may be used.
 * - Don't place the default focus on a button that destroys data. Instead, place the default focus on the button that
 * performs the "safe act" and retains the content (such as "Save") or cancels the action (such as "Cancel").
 *
 * ### Content
 * - Use sentence-style capitalization—only capitalize the first word. For more info, see
 * [Capitalization](https://docs.microsoft.com/en-us/style-guide/capitalization) in the Microsoft Writing Style Guide.
 * - Make sure it's clear what will happen when people interact with the button. Be concise; usually a single verb
 * is best. Include a noun if there is any room for interpretation about what the verb means.
 * For example, "Delete folder" or "Create account".
 */
export const Button: React.FunctionComponent<ButtonProps & React.RefAttributes<HTMLElement>> = React.forwardRef<
  HTMLElement,
  ButtonProps
>((props, ref) => {
  const state = useButton(props, ref);

  useButtonStyles(state);

  return renderButton(state);
});
