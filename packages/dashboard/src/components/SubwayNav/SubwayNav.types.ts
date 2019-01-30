import { IStyle } from 'office-ui-fabric-react/lib/Styling';
import { ISubwayNavStep } from './SubwayNavStep.types';

export interface ISubwayNavProps {
  /** Steps to render. */
  steps: ISubwayNavStep[];

  /** Wizard complete flag */
  wizardComplete?: boolean;

  /** Optional classname to append to root list. */
  className?: string;
}

/**
 * Styles for the Subway Nav component
 */
export interface ISubwayNavStyles {
  /** Styles for the Subway Nav container */
  subwayNavContainer: IStyle;

  /** Styles for Nav content container */
  subwayNavContentContainer: IStyle;

  /** Styles for Nav content */
  subwayNavContent: IStyle;

  /** Styles for Nav step connector */
  subwayNavStepConnector: IStyle;

  /** Styles for Nav sub step connector */
  subwayNavSubStepConnector: IStyle;

  /** Styles for Nav step connector not started */
  stepConnectorNotStarted: IStyle;

  /** Styles for Nav step connector completed */
  stepConnectorCompleted: IStyle;

  /** Styles for Nav step connector - wizard complete */
  stepConnectorWizardComplete: IStyle;
}

/**
 * Props for style customizations
 */
export interface ISubwayNavStyleProps {
  /** Additional CSS class to apply to the SubwayNav. */
  className?: string;
}
