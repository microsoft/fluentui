import { IStyle } from 'office-ui-fabric-react/lib/Styling';

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
  headerText?: string;

  /**
   * The content of the banner body
   */
  onRenderBody?: (() => JSX.Element) | JSX.Element;

  /**
   * The content of the visualization
   */
  onRenderVisualization?: (() => JSX.Element) | JSX.Element;

  /**
   * CSS class name for the outermost div
   */
  className?: string;
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
   * Style for the visualization partition
   */
  visualizationPartition: IStyle;

  /**
   * Style for the visualization shimmer div
   */
  visualizationShimmer: IStyle;

  /**
   * Style for the text partition (header, body, and actions)
   */
  textPartition: IStyle;

  /**
   * Style for the header section
   */
  headerSection: IStyle;

  /**
   * Style for the header shimmer div
   */
  headerShimmer: IStyle;

  /**
   * Style for the body section
   */
  bodySection: IStyle;

  /**
   * Style for the body shimmer div
   */
  bodyShimmer: IStyle;

  /**
   * Style for the action section
   */
  actionSection: IStyle;
}
