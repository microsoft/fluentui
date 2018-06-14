import { IStyle } from 'office-ui-fabric-react/lib/Styling';

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
}

export interface IActionBarProps {
  /**
   * List of actions this action bar is going to support
   */
  actions: IAction[];
}