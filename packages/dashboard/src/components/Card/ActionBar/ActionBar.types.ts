import { IStyle } from 'office-ui-fabric-react/lib/Styling';
import { IFocusZoneProps } from 'office-ui-fabric-react/lib/components/FocusZone/FocusZone.types';

export interface IActionOverflowData {
  /**
   * Primary actions to display
   */
  primary: IAction[];

  /**
   * Overflow actions to display in split button
   */
  overflow?: IAction[];
}

export interface IActionBarStyles {
  /**
   * Style set for the action bar component root
   */
  root: IStyle;
}
export interface IAction {
  /**
   * Defines the title of the button
   */
  title: string;

  /**
   * Defines the function that is executed on clicking this action
   */
  action: VoidFunction;

  /**
   * Defines whether or not this button is primary
   */
  primary?: boolean;

  /**
   * Defines the id of the button
   */
  id?: string;
}

// This is an internal interface used for rendering the action button with unique key
export interface IActionItem {
  name?: string;
  title: string;
  action: VoidFunction;
  primary?: boolean;
  key: number;
}

export interface IActionBarProps {
  /**
   * List of actions this action bar is going to support
   */
  actions: IAction[];

  /**
   * Defines the title for the benefit of tooltip
   */
  actionBarOverflowButtonTitle?: string;

  /**
   * The aria label of the button for the benefit of screen readers.
   */
  actionBarOverflowButtonAriaLabel?: string;

  /**
   * Detailed description of the button for the benefit of screen readers.
   *
   * Besides the compound button, other button types will need more information provided to screen reader.
   */
  actionBarOverflowButtonAriaDescription?: string;

  /**
   * Custom properties for OverflowSet's FocusZone.
   * If doNotContainWithinFocusZone is set to true focusZoneProps will be ignored.
   * Use one or the other.
   */
  focusZoneProps?: IFocusZoneProps;
}
