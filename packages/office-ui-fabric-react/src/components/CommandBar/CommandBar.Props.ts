import * as React from 'react';
import { IContextualMenuItem } from '../ContextualMenu/index';

export interface ICommandBar {
  /**
   * Sets focus to the active command in the list.
   */
  focus(): void;
}

export interface ICommandBarProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Optional callback to access the ICommandBar interface. Use this instead of ref for accessing
   * the public methods and properties of the component.
   */
  componentRef?: (component: ICommandBar) => void;

  /**
   * Whether or not the search box is visible
   * @defaultvalue false
   */
  isSearchBoxVisible?: boolean;

  /**
   * Placeholder text to display in the search box
   */
  searchPlaceholderText?: string;

  /**
   * Items to render
   */
  items: IContextualMenuItem[];

  /**
   * Default items to have in the overflow menu
   */
  overflowItems?: IContextualMenuItem[];

  /**
   * Text to be read by screen readers if there are overflow items and focus is on elipsis button
   */
  elipisisAriaLabel?: string;

  /**
   * Items to render on the right side (or left, in RTL).
   */
  farItems?: IContextualMenuItem[];

  /**
   * Additional css class to apply to the command bar
   * @defaultvalue undefined
   */
  className?: string;

  /**
   * Additional css class to apply to the command bar primary command container
   * @defaultvalue undefined
   */
  primaryCommandsClassName?: string;
  /**
   * Additional css class to apply to the command bar side command container
   * @defaultvalue undefined
   */
  sideCommandsClassName?: string;
}