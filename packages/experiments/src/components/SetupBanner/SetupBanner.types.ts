import { IStyle } from '../../Styling';

/**
 * The action type (used to determine how the action is displayed)
 */
export enum SetupBannerActionType {
  /**
   * Display the action as a DefaultButton
   */
  DefaultButton,

  /**
   * Display the action as a PrimaryButton
   */
  PrimaryButton,

  /**
   * Display the action as a link
   */
  Link
}

/**
 * The setup banner action that can be performed
 */
export interface ISetupBannerAction {
  /**
   * The action text
   */
  text: string;

  /**
   * The action type
   */
  actionType: SetupBannerActionType;

  /**
   * The action to perform on click
   */
  action: VoidFunction;
}

/**
 * Props for the setup banner
 */
export interface ISetupBannerProps {
  /**
   * The setup banner actions
   */
  actions: ISetupBannerAction[];

  /**
   * The setup banner header
   */
  headerText: string;

  /**
   * The content of the banner body
   */
  onRenderBody: () => JSX.Element;

  /**
   * An array of setup banner step information
   * The step order corresponds to the order in the array (the first step is the first element in the array)
   */
  stepInformation: ISetupBannerStep[];

  /**
   * CSS class name for the outermost div
   */
  className?: string;
}

/**
 * A setup banner step
 */
export interface ISetupBannerStep {
  /**
   * The name of the step
   */
  stepName: string;

  /**
   * Boolean indicating if the step is complete
   */
  completed: boolean;
}

/**
 * The setup banner styles
 */
export interface ISetupBannerStyles {
  /**
   * Style for the root element
   */
  root: IStyle;

  /**
   * Style for the visualization partition (the steps)
   */
  visualizationPartition: IStyle;

  /**
   * Style for the text partition (header, body, and actions)
   */
  textPartition: IStyle;

  /**
   * Style for the header section
   */
  headerSection: IStyle;

  /**
   * Style for the body section
   */
  bodySection: IStyle;

  /**
   * Style for the action buttons
   */
  actionButton: IStyle;

  /**
   * Style for the action links
   */
  actionLink: IStyle;
}
