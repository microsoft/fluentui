import { IStyle } from 'office-ui-fabric-react/lib/Styling';

/**
 * Possible states of a given step
 */
export enum SubwayMapStepState {
  NotStarted = 0,
  Current = 1,
  Completed = 2,
  ViewedNotCompleted = 3,
  StepWithSubSteps = 4,
  Unsaved = 5,
  Skipped = 6,
  Error = 7,
  CompletedWizard = 8,

  NotStartedSubStep = 9,
  CurrentSubStep = 10,
  CompletedSubStep = 11,
  UnsavedSubStep = 12,
  SkippedSubStep = 13,
  ErrorSubstep = 14
}

export interface ISubwayMapStepContent {
  /**
   * Content associated with the step
   */
  content: JSX.Element;

  /**
   * Flag to indicate if the form status is complete so that "Next" button is enabled
   */
  formComplete?: boolean;

  /**
   * Flag to indicate if the form has errors
   */
  formError?: boolean;
}

export interface ISubwayMap {
  /**
   * Force the component to update.
   */
  forceUpdate: () => void;
}

export interface ISubwayMapStep {
  /**
   * Unique ID for the given step
   */
  key?: string;

  /**
   * Label for the step.
   */
  label?: string;

  /**
   * Content area to be shown in the content area of the wizard
   */
  contentArea: ISubwayMapStepContent;

  /**
   * link to go to the step
   */
  link?: string;

  /**
   * Sub steps in the step
   */
  subSteps?: ISubwayMapStep[];

  /**
   * Handler to be executed on click of a step
   */
  // handleSubwayMapStepClick: () => void;
}

export interface ISubwayMapProps {
  /** Steps to render. */
  steps?: ISubwayMapStep[];

  /** Allow skip step. */
  allowSkipStep?: boolean;

  /**
   * Optional: Theme (provided through customization)
   */
  // theme?: ITheme;

  /**
   * Optional classname to append to root list.
   */
  className?: string;
}

/**
 * Styles for the Subway map component
 */
export interface ISubwayMapStyles {
  /**
   * Styles for the Subway map container
   */
  subwayMapContainer: IStyle;

  /**
   * Styles for map content container
   */
  subwayMapContentContainer: IStyle;

  /**
   * Styles for map content
   */
  subwayMapContent: IStyle;

  /**
   * Styles for subway map step div
   */
  subwayMapStepDiv: IStyle;

  /**
   * Styles for subway step label
   */
  subwayMapStepLabel: IStyle;

  /**
   * Styles for subway step connector
   */
  subwayMapStepConnector: IStyle;

  /**
   * Styles for subway substep connector
   */
  subwayMapSubStepConnector: IStyle;

  /**
   * Styles for subway map step
   */
  subwayMapStep: IStyle;

  /**
   * Styles for subway map sub step
   */
  subwayMapSubStep: IStyle;

  /**
   * Styles for subway map step
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
export interface ISubwayMapStyleProps {
  /**
   * Theme (provided through customization.)
   */
  // theme: ITheme;

  /**
   * Additional CSS class(es) to apply to the StackedBarChart.
   */
  className?: string;
}
