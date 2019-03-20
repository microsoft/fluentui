import { IStyle } from 'office-ui-fabric-react/lib/Styling';

export enum ButtonSize {
  /**
   *Sets button height to small and does not allow
   *description in each button(Allows title but not description text in each button)
   */
  small,

  /**
   * Sets the normal height and does allow description in each button
   */
  normal
}

export interface ICompoundButtonStackStyles {
  /**
   * Style set for the compound button component root
   */
  root: IStyle;
}

export interface ICompoundAction {
  /**
   * Compound Action optional ID Props
   */
  id?: string;

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
   * The aria label of the button for the benefit of screen readers.
   */
  ariaLabel?: string;

  /**
   * Detailed description of the button for the benefit of screen readers.
   *
   * Besides the compound button, other button types will need more information provided to screen reader.
   */
  ariaDescription?: string;

  /**
   * If provided and is true it adds an 'aria-hidden' attribute instructing screen readers to ignore the element.
   */
  ariaHidden?: boolean;

  /**
   * Description to help explain what the action would do
   */
  description?: string;
}

export interface ICompoundButtonStackProps {
  /**
   * List of actions this stack is going to support
   */
  actions: ICompoundAction[];

  /**
   * The  compound button height
   */
  buttonSize?: ButtonSize;
}
