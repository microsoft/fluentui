import { IStyle } from 'office-ui-fabric-react/lib/Styling';

export interface ISubwayNavProps {
  /** Steps to render. */
  steps: ISubwayNavStep[];

  /** Wizard complete flag */
  wizardComplete?: boolean;

  /** Optional classname to append to root list. */
  className?: string;
}

export interface ISubwayNavStep {
  /**
   * Unique ID for the given step
   */
  key: string;

  /**
   * Label for the step.
   */
  label: string;

  /* State of the step */
  state?: SubwayNavStepState;

  /** Flag to indicate if step is disabled */
  disabled?: boolean;

  /**
   * Handler to be executed on click of a step
   */
  onClickStep: (step: ISubwayNavStep, subStep: ISubwayNavStep | undefined) => void;

  /**
   * Sub steps in the step
   */
  subSteps?: ISubwayNavStep[];
}

/**
 * Possible states of a given step
 */
export enum SubwayNavStepState {
  NotStarted = 0,
  Current = 1,
  Completed = 2,
  ViewedNotCompleted = 3,
  StepWithSubSteps = 4,
  Unsaved = 5,
  Skipped = 6,
  Error = 7
}

/**
 * Styles for the Subway Nav component
 */
export interface ISubwayNavStyles {
  /**
   * Styles for the Subway Nav container
   */
  subwayNavContainer: IStyle;

  /**
   * Styles for Nav content container
   */
  subwayNavContentContainer: IStyle;

  /**
   * Styles for Nav content
   */
  subwayNavContent: IStyle;

  /**
   * Styles for subway Nav step div
   */
  subwayNavStepDiv: IStyle;

  /**
   * Styles for subway step connector
   */
  subwayNavStepConnector: IStyle;

  /**
   * Styles for subway substep connector
   */
  subwayNavSubStepConnector: IStyle;

  /**
   * Styles for subway substep connector not started
   */
  stepConnectorNotStarted: IStyle;

  /**
   * Styles for subway substep connector completed
   */
  stepConnectorCompleted: IStyle;

  /**
   * Styles for subway substep connector wizard complete
   */
  stepConnectorWizardComplete: IStyle;

  /**
   * Styles for subway Nav step
   */
  subwayNavStepIcon: IStyle;

  /**
   * Styles for subway Nav sub step
   */
  subwayNavSubStepIcon: IStyle;

  /**
   * Styles for subway step label
   */
  stepLabel: IStyle;

  /**
   * Styles for subway substep label
   */
  subStepLabel: IStyle;

  /**
   * Styles for subway Nav step
   */
  boldStep: IStyle;

  /**
   * Styles for not started step icon
   */
  disableStep: IStyle;

  /**
   * Styles for not started step icon
   */
  stepNotStarted: IStyle;

  /**
   * Styles for current step icon
   */
  stepCurrent: IStyle;

  /**
   * Styles for completed step icon
   */
  stepCompleted: IStyle;

  /**
   * Styles for Viewed, Not completed step icon
   */
  stepViewedNotCompleted: IStyle;

  /**
   * Styles for Step with substeps icon
   */
  stepWithSubSteps: IStyle;

  /**
   * Styles for Unsaved step icon
   */
  stepUnsaved: IStyle;

  /**
   * Styles for Skipped step icon
   */
  stepSkipped: IStyle;

  /**
   * Styles for Error step icon
   */
  stepError: IStyle;

  /**
   * Styles for Completed wizard step icon
   */
  stepWizardComplete: IStyle;

  /**
   * Styles for substep not started icon
   */
  subStepNotStarted: IStyle;

  /**
   * Styles for substep current icon
   */
  subStepCurrent: IStyle;

  /**
   * Styles for substep completed icon
   */
  subStepCompleted: IStyle;

  /**
   * Styles for substep unsaved icon
   */
  subStepUnsaved: IStyle;

  /**
   * Styles for substep skipped icon
   */
  subStepSkipped: IStyle;

  /**
   * Styles for error in substep icon
   */
  subStepError: IStyle;
}

/**
 * Props for style customizations
 */
export interface ISubwayNavStyleProps {
  /**
   * Additional CSS class to apply to the SubwayNav.
   */
  className?: string;
}
